'''
class DatabaseCaller: Can be used to store information and also query the database

*** IMPORTANT ***

1) You must have the parsepy download setup
pip install git+https://github.com/dgrtwo/ParsePy.git


2) Also search for the file datatypes.py in parse_rest
example path /home/hxs123/.pyenv/versions/3.5.0/lib/python3.5/site-packages/parse_rest/datatypes.py
Change line 76 from -

for key, value in python_object.iteritems():

to 

for key, value in six.iteritems(python_object):

This allows for the usage of dictionaries which is crucial for flags and recipes
Source: https://github.com/dgrtwo/ParsePy/pull/99/files

***-----------***

Methods:
__init__()

    Description:
    ------------
    Creates a DatabaseCaller Object by using the APPLICATION_ID and 
        REST_API_KEY to connect to the database
 
add_tasknodes(list_of_tasknodes)

    Description:
    ------
    Adds the list_of_tasknodes to the database if possible

    Parameters:
    ------
    list_of_tasknodes: List of Tasknodes

get_recipe(recipe_name)

    Description:
    ------
    Currently a helper method - gets the database recipe object

    Parameters:
    ------
    recipe_name: String

get_tasknode(tasknode_name)

    Description:
    ------
    Currently a helper method - gets the database tasknode object

    Parameters:
    ------
    tasknode_name: String


Author: Hector Solis
Copyright Jellifish 2015
'''

# can't add dictionaries to parse using python 3.5 easily - resolved

import os, sys
from parse_rest.connection import register, ParseBatcher
from parse_rest.datatypes import Object as ParseObject
from TaskNode import TaskNode as TN

class DatabaseCaller:

    #ToDo move the api keys to a config file and then read them from there
    def __init__(self):
        APPLICATION_ID = "qfJEdKLsk6oGWYL6CotKWZGSGxpWtGECdUT8IGhX"
        REST_API_KEY = "TmXWGk0CxoPIBeSzqlxf7u2C9V7mlB6sNgRs5eEZ"
        register(APPLICATION_ID, REST_API_KEY)

    # Adds a list of tasknodes to the database
    def add_tasknodes(self, list_of_tasknodes):
        db_tasks = TaskNode.Query.all()
        for i in list_of_tasknodes:
                if not db_tasks.filter(name = i.name).exists():
                    current_task = TaskNode()
                    current_task.name = i.name
                    current_task.short_descr = i.short_descr
                    current_task.long_descr = i.long_descr
                    #time is a specific value which shouldn't be stored in the db tasknode. It should be stored in recipe
                    current_task.time = i.time

                    #list_of_depend_names = []
                    #for depend in i.dependencies:
                    #    list_of_depend_names.append(depend.name)
                    #current_task.dependencies = list_of_depend_names

                    list_of_IDs = []
                    for depend in i.dependencies:
                        list_of_IDs.append(self.add_tasknode(depend))
                    current_task.dependencies = list_of_IDs

                    # ToDo fix dictionary issues  Fixed?
                    current_task.flags = i.flags
                    #COMMENTED THESE THREE LINES
                    #current_task.type = i.type
                    #if not current_task.type:
                    #   current_task.operator = i.operator
                    current_task.save()
                    #ID = current_task.objectId
                else:
                    print("Warning, TaskNode is already in database")

    # Adds a single tasknode to the database
    def add_tasknode(self, tasknode):
        db_tasks = TaskNode.Query.all()
        copy = db_tasks.filter(name = tasknode.name)
        if not copy.exists():
            current_task = TaskNode()
            current_task.name = tasknode.name
            current_task.short_descr = tasknode.short_descr
            current_task.long_descr = tasknode.long_descr
            #time is a specific value which shouldn't be stored in the db tasknode. It should be stored in recipe
            current_task.time = tasknode.time

            #list_of_depend_names = []
            #for depend in i.dependencies:
            #    list_of_depend_names.append(depend.name)
            #current_task.dependencies = list_of_depend_names

            list_of_IDs = []
            for depend in tasknode.dependencies:
                list_of_IDs.append(self.add_tasknode(depend))
            current_task.dependencies = list_of_IDs

            # ToDo fix dictionary issues  Fixed?
            current_task.flags = tasknode.flags
            #COMMENTED THESE THREE LINES
            #current_task.type = i.type
            #if not current_task.type:
            #   current_task.operator = i.operator
            current_task.save()
            ID = current_task.objectId
        else:
            print("Warning, TaskNode is already in database")
            ID = copy[0].objectId
        return ID


    # Returns a database tasknode object
    def get_tasknode(self, tasknode_name):
        queryset = TaskNode.Query.filter(name = tasknode_name)
        if not queryset.exists():
            print("Could not find the specified tasknode")
            return None
        return queryset[0]

    # Recipes.tasknode_dictionary should be in the format [{"tasknode1"}, {"tasknode2"}]
    # Where tasknodes are dictionaries with values corresponding to the specifics of a tasknode such as time, quantity, units ect. 
    # Otherwise the database will store the other more general tasknode information
    def add_recipe(self, recipe_name, list_of_tasknodes):
        #If recipe is already in database
        if Recipe.Query.all().exists() and Recipe.Query.filter(name = recipe_name).exists():
            return
        my_recipe = Recipe()
        my_recipe.name = recipe_name
        tasknode_dictionary = []
        for t in list_of_tasknodes:
            tasknode_dictionary.append(t.status()) 
        my_recipe.tasknode_dictionary = tasknode_dictionary
        my_recipe.save()

    # Returns a recipe database object
    def get_recipe(self, recipe_name):
        queryset = Recipe.Query.filter(name = recipe_name)
        if not queryset.exists():
            print("Could not find the specified recipe")
            return None
        return queryset[0]

    #Returns a list of tasknodes generated from a given recipe
    def get_recipe_tasknodes(self, recipe_name):
        list_of_tasknodes = []
        db_recipe = self.get_recipe(recipe_name)
        for tasknode_dictionary in db_recipe.tasknode_dictionary:
            physical_tasknode = self.create_tasknode(tasknode_dictionary) 
            list_of_tasknodes.append(physical_tasknode)
        return list_of_tasknodes

    # Return a TaskNode object given a name of it from the database
    def create_tasknode(self, tasknode_name):
        db_tasknode = self.get_tasknode(tasknode_name)
        if (db_tasknode is None):
            return
        #db_tasknode = self.get_tasknode(tasknode_dictionary['name'])
        physical_tasknode = TN(db_tasknode.name, db_tasknode.short_descr, db_tasknode.long_descr, db_tasknode.time)
        #physical_tasknode.dependencies = db_tasknode.dependencies
        list_of_dependencies = []
        for depend in db_tasknode.dependencies:
            list_of_dependencies.append(self.create_tasknode(TaskNode.Query.get(objectId = depend).name))
        #physical_tasknode.dependencies = tasknode_dictionary['dependencies']
        physical_tasknode.dependencies = list_of_dependencies
        physical_tasknode.flags = db_tasknode.flags
        #ToDo for quantities and units do something like physical_tasknode.units = tasknode_dictionarytasknode_dictionary.units
        #This is specifically for stuff we don't store in the tasknode itself
        return physical_tasknode

    # Returns a list of Operators - by name
    #MODIFIED TO BE ABLE TO GET INVIDUAL OPERATORS
    def get_operators(self, operator_names = None):
        list_of_operators = []
        if(operator_names is None):
            for i in Operator.Query.all():
                list_of_operators.append(i) #CHANGED i.name to i HERE
        else:
            for i in Operator.Query.filter(name = operator_names):
                list_of_operators.append(i)
        return list_of_operators

class Operator(ParseObject):
    #Given an operator (object) and operand_names (list of strings),
    #attempts to construct a meaningful string description of the
    #associated task automatically, and returns it as parseName
    def parseStyle(self, operator, operand_names):
        if (operator.numOperands == 1):
            parseName = operator.style + ' (' + operand_names[0] + ')'
        if (operator.numOperands == 2):
            parseName = '(' + operand_names[0] + ') ' + operator.style +  ' (' + \
                        operand_names[1] + ')'
        return parseName

class Recipe(ParseObject):
    pass

class TaskNode(ParseObject):
    pass;