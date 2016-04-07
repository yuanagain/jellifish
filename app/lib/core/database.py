"""
Supports methods for storing and accessing recipes
from a PostGresSQL database

The database created has two tables:
1. data : this table stores all task names

2. seqs : this table stores all complete recipes, with references 
to individual tasks in the data table.

Author: Yuan Wang, Ilya Krasnovsky
Copyright Jellifish 2015-2016
"""

import marshal
import psycopg2

import node #from . import node

class DatabaseManager(object):
    """
    Represents a database with the following fields:
        name - name of task
        descr - description of task
        time - time taken by task
        min_wait - minimum waiting time of a task
        max_wait - maximum waiting time of a task
    """
    def __init__(self, database, user, password, host):
        '''
        Default:
        Connects to database "postgres" with user "postgres"
        on "localhost" with password "jellifishrulez". Note
        that you have to create this database, user, and password
        locally yourself using psql prior in order for this to work.
        '''
        self.connect = psycopg2.connect(database=database,
                                        user=user,
                                        password=password,
                                        host=host)

    def close(self):
        """
        Closes the database connection
        """
        self.connect.close()

    def print_dump(self):
        """
        Prints contents of database
        """
        with self.connect:
            cur = self.connect.cursor() 

            print("DATA")   
            cur.execute('SELECT * FROM data')
            col_names = [cn[0] for cn in cur.description]
            rows = cur.fetchall()
            print(col_names)
            for row in rows:    
                print(row)

            print("SEQS")
            cur.execute('SELECT id, name, descr FROM seqs')
            col_names = [cn[0] for cn in cur.description]
            rows = cur.fetchall()
            print(col_names)
            for row in rows:    
                print(row)

            cur.close()

    def add_sequence(self, task_seq):
        """
        Adds a task sequence task_seq to database
        """
        # serialize list of other id's
        task_id_list = []
        with self.connect:
            cur = self.connect.cursor() 

            for task in task_seq.tasks:
                task_data = task.dump_data()
                self.add_task(task_data)

                # recover last inserted key id, 
                cur.execute('SELECT max(id) FROM data')
                last_id = cur.fetchone()[0]
                task_id_list.append(last_id)

            # serialize list
            ids = marshal.dumps(task_id_list)
            self.store_seq(task_seq.name, task_seq.descr, ids)

            cur.close()

    def delete_sequence(self, name):
        """
        Deletes the recipe, by name, from the database.
        """
        with self.connect:
            cur = self.connect.cursor()
            cur.execute('DELETE FROM seqs WHERE name=:name', {"name": name})

            cur.close()

    def fetch_seq_names(self):
        """     
        returns a list of names of task sequences in database
        """
        with self.connect:
            cur = self.connect.cursor()

            cur.execute('SELECT name FROM seqs')
            names = cur.fetchall()
            names = [el[0] for el in names]

            cur.close()
            return names

    def fetch_sequences(self):
        """
        returns an array of dictionaries in the form of 
            {name: name, description: description}
        """
        with self.connect:
            cur = self.connect.cursor()

            cur.execute('SELECT name, descr FROM seqs')
            rows = cur.fetchall()
            data = [{"name": r[0], "descr": r[1]} for r in rows]

            cur.close()
            return data

    def load_seq_by_name(self, name):
        """
        Loads the first task sequence with a given name
        """
        with self.connect:
            cur = self.connect.cursor() 

            queryname = "{" + name + "}"
            cur.execute('''SELECT name, descr, tasks FROM seqs WHERE name=ANY(%s);''', (queryname,))
            seq_data = cur.fetchone()

            if seq_data == None:
                raise KeyError("Sequence does not exist")

            task_ids = marshal.loads(seq_data[2])

            # load tasks by task id
            tasks = []
            for task_id in task_ids:
                querytask_id = "{" + str(task_id) + "}"
                cur.execute("SELECT name, descr, time, min_wait, max_wait "
                    + "FROM data WHERE id=ANY(%s)", (querytask_id,))
                task_data = cur.fetchone()

                if task_data == None:
                    raise ValueError("Sequence task list refers to nonexistent entry, db corrupted")

                tnode = node.TaskNode(name = task_data[0], descr = task_data[1], 
                    time = task_data[2], min_wait = task_data[3], 
                    max_wait = task_data[4])
                tasks.append(tnode)

            
            task_seq = node.TaskSequence(seq_data[0], seq_data[1], tasks)

            cur.close()
            return task_seq

    def add_task(self, task_data):
        """
        Adds data from dictionary, task_data, with the key-value pairs: name (String), 
        descr (String), time, min_wait (float), and max_wait (float)
        """
        entry = (task_data["name"], task_data["descr"], task_data["time"],
                 task_data["min_wait"], task_data["max_wait"])
        self.store_task_from_tuple(entry)
  
    def store_task_from_tuple(self, entry):
        """
        Adds entry (a tuple) into data table. Entry should be of the form:
        (name (String), descr (String), time, min_wait (float), and max_wait (float))

        """
        with self.connect:
            cur = self.connect.cursor()
            cur.execute('''INSERT INTO data (name, descr, time, min_wait, max_wait) VALUES (%s, %s, %s, %s, %s);''', entry)
            cur.close()

    def store_seq(self, name, descr = "", tasks = None):
        """
        Adds entry into sequences table with the given name, description (descr), 
        and binarized list of tasks (tasks).
        """
        with self.connect:
            cur = self.connect.cursor()
            cur.execute('''INSERT INTO seqs (name, descr, tasks) VALUES (%s, %s, %s);''', (name, descr, tasks))
            cur.close()

    def initialize(self):
        """
        First time setup, creates data tables. Simply prints
        to standard out if they were already created.
        """
        create_data = '''CREATE TABLE IF NOT EXISTS data
                    (id SERIAL primary key,
                     name TEXT,
                     descr TEXT,
                     time REAL,
                     min_wait REAL,
                     max_wait REAL);'''
        create_seqs = '''CREATE TABLE IF NOT EXISTS seqs
                    (id SERIAL primary key,
                     name TEXT,
                     descr TEXT,
                     tasks BYTEA);'''
        with self.connect:
            cur = self.connect.cursor()
            cur.execute(create_data)
            cur.execute(create_seqs)
            cur.close()
