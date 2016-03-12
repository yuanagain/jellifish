"""
Implements a client for DatabaseManager and TaskSequence, 
used to maintain library of recipes.

Author: Yuan Wang
Copyright Jellifish 2015
"""
from . import database
from . import node
from . import patch

class DatabaseClient:
    def __init__(self, db_fname = None):
        if db_fname == None:
            self.dbm = database.DatabaseManager()
        else:
            self.dbm = database.DatabaseManager(db_fname)

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
            if names[i] in this_recipes:
                tseqs.append(self.fetch_recipe(names[i]))
        
        pkb = patch.PatchKitBlind(tseqs)
        ct, cs = pkb.fit()
        return cs

    def fetch_recipes_greedy(self, names):
        # clean list
        tseqs = []
        this_recipes = self.list_recipes()
        for i in range(len(names)):
            if names[i] in this_recipes:
                tseqs.append(self.fetch_recipe(names[i]))
        
        pkg = patch.PatchKitGreedy(tseqs)
        ct, cs = pkg.fit()
        return cs

    def add_recipe(self, recipe):
        """
        Adds a TaskSequence recipe to the database.
        """
        self.dbm.add_sequence(recipe)
        #TODO error handling
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
