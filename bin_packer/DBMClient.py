"""
Implements a client for DBMgr and TaskSequence, 
used to maintain library of recipes
"""
import DBMgr
from TaskSequence import TaskSequence, TaskNode
import os
from pkblind import PKBlind
import DataUtils as dutils

class DBMClient:
    def __init__(self, db_fname = None):
        if db_fname == None:
            self.dbm = DBMgr.DBMgr()
        else:
            self.dbm = DBMgr.DBMgr(db_fname)

    def list_recipes(self):
        """
        Returns list of recipes by name
        """
        return self.dbm.fetch_seq_names()

    def fetch_recipe(self, name):
        """
        Returns a TaskSequence object by name. Indicates
        failure if no such sequence exists
        """
        return self.dbm.load_seq_v1(name)

    def fetch_recipe_v2(self, name):
        """
        Returns task sequence formatted w/ start/stop times
        infused
        """
        ts = self.dbm.load_seq_v1(name)
        pkb = PKBlind([ts])
        ct, cs = pkb.fit()
        return cs

    def add_recipe(self, recipe):
        """
        Adds a TaskSequence recipe to the database.
        """
        self.dbm.add_seq_v1(recipe)
        #TODO error handling
        return


def main():
    print("TESTING METHODS")
    tn_1 = TaskNode(name = "tn1", time = 10.0, min_wait = 10.0, max_wait = 20.0)
    tn_2 = TaskNode(name = "tn2", time = 10.0, min_wait = 0.0, max_wait = 20.0)
    tn_3 = TaskNode(name = "tn3", time = 10.0, min_wait = 20.0, max_wait = 20.0)

    tn_4 = TaskNode(name = "tn4", time = 10.0, min_wait = 10.0, max_wait = 20.0)
    tn_5 = TaskNode(name = "tn5", time = 10.0, min_wait = 0.0, max_wait = 20.0)
    tn_6 = TaskNode(name = "tn6", time = 10.0, min_wait = 20.0, max_wait = 20.0)

    ts_1 = TaskSequence(name = "seq_1", tasks = [tn_1, tn_2, tn_3])
    ts_2 = TaskSequence(name = "seq_2", tasks = [tn_4, tn_5, tn_6])

    os.system("rm -rf test_client.db")
    print("TESTING CONSTRUCTOR")
    client = DBMClient("test_client.db")    

    print("\nTESTING add_recipe")
    client.add_recipe(ts_1)
    client.add_recipe(ts_2)

    print("\nTESTING list_recipes")
    print(client.list_recipes())

    print("\nTESTING fetch_recipe")
    client.fetch_recipe("seq_1").print_dump()
    client.fetch_recipe("seq_2").print_dump()

    instr = client.fetch_recipe_v2("seq_1")
    dutils.print_instr(instr)

    print("\nTESTS COMPLETED")

if __name__ == "__main__":
    main()