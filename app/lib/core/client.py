"""
Implements a client for DatabaseManager (PostgreSQL)
and TaskSequence, used to maintain library of recipes.

Author: Yuan Wang, Ilya Krasnovsky
Copyright Jellifish 2015
"""

#from database import DatabaseManager 
from . import database

import node 
#from . import node

import patch 
#from . import patch

import os

class DatabaseClient(object):
    def __init__(self, database, user, password, host):
        '''
        DatabaseManager.initialize() always called.
        This is not an issue because the table 
        creation is wrapped in a try 
        except block in database.py
        '''
        self.dbm = DatabaseManager(database=database,
                                            user=user,
                                            password=password,
                                            host=host)
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
        return self.dbm.fetch_sequences()

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

    def delete_recipe(self, name):
        """
        Deletes a recipe, by name, from the database.
        """
        return self.dbm.delete_sequence(name)

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
