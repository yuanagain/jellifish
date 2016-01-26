"""
Supports methods for storing and accessing recipes
from an SQLite database
"""

import marshal
import sqlite3 as lite
import sys
from TaskSequence import TaskSequence, TaskNode

# Global Defaults
default_db_fname = "RECIPEDATA_V1.db"
default_fields = "(name, descr, time, frag, min_wait, max_wait)"

all_fields = ["name", "descr", "time", "min_wait", "max_wait"]
data_default = {"time": 0.0, "min_wait": 0.0, "max_wait": 0.0}

# Methods
class DBMgr:
    def __init__(self, db_fname = default_db_fname):
        self.db_fname = db_fname
        self.connect = lite.connect(db_fname)
        self.initialize()

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


    def add_seq_v1(self, task_seq):
        """
        Adds a task sequence to database
        """
        # serialize list of other id's
        task_id_list = []
        with self.connect:
            cur = self.connect.cursor() 

            for task in task_seq.tasks:
                task_data = task.dump_data_v2()
                self.add_task_v3(task_data)

                # recover last inserted key id, 
                cur.execute('SELECT max(id) FROM data')
                last_id = cur.fetchone()[0]
                task_id_list.append(last_id)

            # serialize list
            ids = marshal.dumps(task_id_list)
            self.add_entry_v3(task_seq.name, task_seq.descr, ids)

    def load_seq_v1(self, name):
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
                cur.execute("SELECT name, descr, time, frag, min_wait, max_wait "
                    + "FROM data WHERE id=:id", {"id": task_id})
                task_data = cur.fetchone()

                if task_data == None:
                    print("Sequence task list refers to nonexistent entry, db corrupted")

                tnode = TaskNode(name = task_data[0], descr = task_data[1], 
                    time = task_data[2], min_wait = task_data[3], 
                    max_wait = task_data[4])
                tasks.append(tnode)

            
            task_seq = TaskSequence(seq_data[0], seq_data[1], tasks)

            return task_seq


    def add_task_v2(self, task_data):
        """
        Adds data from dictionary
        """
        fields = []
        data = []
        for field in all_fields:
            if field in task_data:
                fields.append(field)
                data.append(task_data[field])
            # if defaults are relevant.
            else:
                if field in data_default:
                    fields.append(field)
                    data.append(data_default[field])
        self.add_entry(tuple(fields), tuple(data))

    def add_task_v3(self, task_data):
        """
        Adds data from dictionary
        """
        entry = (None, task_data["name"], task_data["descr"], task_data["time"],
                 task_data["frag"], task_data["min_wait"], task_data["max_wait"])
        self.add_entry_v2(entry)


    
    def add_entry(self, fields, entry, overwrite = True):
        """
        Description
        ------
        Adds data from entry tuple to fields descriped in fields tuple.
        Parameters
        ------
        """
        with self.connect:
            self.connect.execute("INSERT INTO data " + str(fields) + " VALUES" + str(entry))

    def add_entry_v2(self, entry):
        with self.connect:
            self.connect.execute("INSERT INTO data VALUES(?, ?, ?, ?, ?, ?, ?)", entry)

    def add_entry_v3(self, name, descr = "", tasks = None):
        with self.connect:
            self.connect.execute("INSERT INTO seqs VALUES(?, ?, ?, ?)", (None, name, descr, tasks)) 
            
    def initialize(self):
        """
        Description
        ------
        First time setup
        """
        create_1 = "CREATE TABLE data(id integer primary key, name TEXT, descr TEXT, time REAL, frag REAL, min_wait REAL, max_wait REAL)"
        create_2 = "CREATE TABLE seqs(id integer primary key, name TEXT, descr TEXT, tasks BLOB)"
        print(create_1)
        print(create_2)
        self.connect.execute(create_1)
        self.connect.execute(create_2)
        