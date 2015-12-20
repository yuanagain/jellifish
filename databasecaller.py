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
					#current_task.time = i.time

					current_task.dependencies = i.dependencies
					# ToDo fix dictionary issues  Fixed?
					current_task.flags = i.flags
					current_task.type = i.type
					if not current_task.type:
						current_task.operator = i.operator

					current_task.save()
				else:
					print("Warning, TaskNode is already in database")

	# Returns a database tasknode object
	def get_tasknode(self, tasknode_name):
		queryset = TaskNode.Query.filter(name = tasknode_name)
		if not queryset.exists():
			print("Could not find the specified recipe")
			return None
		return queryset[0]

	# Recipes.tasknode_dictionary should be in the format [{"tasknode1"}, {"tasknode2"}]
	# Where tasknodes are dictionaries with values corresponding to the specifics of a tasknode such as time, quantity, units ect. 
	# Otherwise the database will store the other more general tasknode information
	def add_recipe(self, recipe):
		#If recipe is already in database
		if Recipe.Query.all().exists() and Recipe.Query.filter(name = recipe.name).exists():
			return
		my_recipe = Recipe()
		my_recipe.name = recipe.name
		my_recipe.tasknode_dictionary = recipe.tasknode_dictionary
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

	# param tasknode_dictionary is something like {"name" : "Water", "time" : 300}
	def create_tasknode(self, tasknode_dictionary):
		db_tasknode = self.get_tasknode(tasknode_dictionary['name'])
		physical_tasknode = TN(db_tasknode.name, db_tasknode.short_descr, db_tasknode.long_descr, tasknode_dictionary['time'])
		# flags don't work or shouldn't be stored
		physical_tasknode.dependencies = db_tasknode.dependencies
		physical_tasknode.flags = db_tasknode.flags
		#ToDo for quantities and units do something like physical_tasknode.units = tasknode_dictionarytasknode_dictionary.units
		#This is specifically for stuff we don't store in the tasknode itself
		return physical_tasknode

	# Returns a list of Operators - by name
	def get_operators(self):
		list_of_operators = []
		for i in Operator.Query.all():
			list_of_operators.append(i.name)
		return list_of_operators

class Operator(ParseObject):
    pass

class Recipe(ParseObject):
    pass

class TaskNode(ParseObject):
	pass;