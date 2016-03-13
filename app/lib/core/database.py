"""
Supports methods for storing and accessing recipes
from an SQLite database

The database created has two tables:
1. data : this table stores all task names

2. seqs : this table stores all complete recipes, with references 
to individual tasks in the data table.

Author: Yuan Wang
Copyright Jellifish 2015
"""

import marshal
import sqlite3

# USE THESE IMPORTS WHEN PACKAGING
#from . import node

import node

# Global Defaults
default_db_fname = "RECIPEDATA_V1.db"
default_fields = "(name, descr, time, min_wait, max_wait)"

all_fields = ["name", "descr", "time", "min_wait", "max_wait"]
data_default = {"time": 0.0, "min_wait": 0.0, "max_wait": 0.0}

# Methods
class DatabaseManager:
    def __init__(self, db_fname = default_db_fname):
        self.db_fname = db_fname
        self.connect = sqlite3.connect(db_fname)
        try: self.initialize()
        except:
            return 

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

    def add_sequence(self, task_seq):
        """
        Adds a task sequence task_seq to database
        """
        # serialize list of other id's
        task_id_list = []
        with self.connect:
            cur = self.connect.cursor() 

            for task in task_seq.tasks:
                task_data = task.dump_data_v2()
                self.add_task(task_data)

                # recover last inserted key id, 
                cur.execute('SELECT max(id) FROM data')
                last_id = cur.fetchone()[0]
                task_id_list.append(last_id)

            # serialize list
            ids = marshal.dumps(task_id_list)
            self.store_seq(task_seq.name, task_seq.descr, ids)

    def fetch_seq_names(self):
        """     
        returns a list of names of task sequences in database
        """
        with self.connect:
            cur = self.connect.cursor()
            cur.execute('SELECT name FROM seqs')
            names = cur.fetchall()
            names = [el[0] for el in names]
            return names

    def load_seq_by_name(self, name):
        """
        Loads the first task sequence with a given name
        """
        with self.connect:
            cur = self.connect.cursor() 
            cur.execute('SELECT name, descr, tasks FROM seqs WHERE name=:name', {"name": name})
            seq_data = cur.fetchone()

            if seq_data == None:
                print("Sequence does not exist")
                return None

            task_ids = marshal.loads(seq_data[2])

            # load tasks by task id
            tasks = []
            for task_id in task_ids:
                cur.execute("SELECT name, descr, time, min_wait, max_wait "
                    + "FROM data WHERE id=:id", {"id": task_id})
                task_data = cur.fetchone()

                if task_data == None:
                    print("Sequence task list refers to nonexistent entry, db corrupted")

                tnode = node.TaskNode(name = task_data[0], descr = task_data[1], 
                    time = task_data[2], min_wait = task_data[3], 
                    max_wait = task_data[4])
                tasks.append(tnode)

            
            task_seq = node.TaskSequence(seq_data[0], seq_data[1], tasks)

            return task_seq

    def add_task(self, task_data):
        """
        Adds data from dictionary, task_data, with the key-value pairs: name (String), 
        descr (String), time, min_wait (float), and max_wait (float)
        """
        entry = (None, task_data["name"], task_data["descr"], task_data["time"],
                 task_data["min_wait"], task_data["max_wait"])
        self.store_task_from_tuple(entry)
  
    def store_task_from_tuple(self, entry):
        """
        Adds entry (a tuple) into data table. Entry should be of the form:
        (name (String), descr (String), time, min_wait (float), and max_wait (float))

        """
        with self.connect:
            self.connect.execute("INSERT INTO data VALUES(?, ?, ?, ?, ?, ?)", entry)

    def store_seq(self, name, descr = "", tasks = None):
        """
        Adds entry into sequences table with the given name, description (descr), 
        and binarized list of tasks (tasks).
        """
        with self.connect:
            self.connect.execute("INSERT INTO seqs VALUES(?, ?, ?, ?)", (None, name, descr, tasks)) 
            
    def initialize(self):
        """
        Description
        ------
        First time setup, creates data tables.
        """
        create_1 = "CREATE TABLE data(id integer primary key, name TEXT, descr TEXT, time REAL, min_wait REAL, max_wait REAL)"
        create_2 = "CREATE TABLE seqs(id integer primary key, name TEXT, descr TEXT, tasks BLOB)"
        print(create_1)
        print(create_2)
        self.connect.execute(create_1)
        self.connect.execute(create_2)
