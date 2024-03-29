"""
Implements a client for DatabaseManager and TaskSequence, 
used to maintain library of recipes.

Author: Yuan Wang
Copyright Jellifish 2015
"""

from . import database
from . import node
from . import patch

import os

class DatabaseClient(object):
    def __init__(self, conn):
        # The file is automatically created if it does not exist by sqlite3
        # and so, we should check, prior to creating the connection,
        # if the file exists or not. Then it can be initialized if it does
        # not exist.
        should_init = not os.path.exists(conn)
        self.dbm = database.DatabaseManager(conn)
        if should_init:
            self.dbm.initialize()

    def close(self):
        """
        Closes the database connection
        """
        self.dbm.close()

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
        return self.dbm.load_seq_by_name(name)

    def fetch_recipe_by_name(self, name):
        """
        Returns task sequence formatted w/ start/stop times
        infused
        """
        ts = self.dbm.load_seq_by_name(name)
        pkb = patch.PatchKitBlind([ts])
        ct, cs = pkb.fit()
        return cs

    def fetch_recipes_blind(self, names):
        # clean list
        tseqs = []
        this_recipes = self.list_recipes()
        for i in range(len(names)):
            try:
                tseqs.append(self.fetch_recipe(names[i]))
            except KeyError:
                pass
        
        pkb = patch.PatchKitBlind(tseqs)
        ct, cs = pkb.fit()
        return cs

    def fetch_recipes_greedy(self, names):
        # clean list
        tseqs = []
        this_recipes = self.list_recipes()
        for i in range(len(names)):
            try:
                tseqs.append(self.fetch_recipe(names[i]))
            except KeyError:
                pass
        
        pkg = patch.PatchKitGreedy(tseqs)
        ct, cs = pkg.fit()
        return cs

    def add_recipe(self, recipe):
        """
        Adds a TaskSequence recipe to the database.
        """
        self.dbm.add_sequence(recipe)
        # TODO error handling
        return

    def import_recipes(self, dbmc, overwrite = False):
        """
        Import recipes from another DatabaseClient object. Does 
        not overwrite by default.
        """
        this_recipes = self.list_recipes()
        that_recipes = dbmc.list_recipes()

        for r_name in that_recipes: 
            if r_name in this_recipes:
                    if overwrite == False:
                        continue
            else:
                self.add_recipe(dbmc.fetch_recipe(r_name))
