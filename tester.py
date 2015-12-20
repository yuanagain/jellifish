## add_task_nodes tester

# from databasecaller import DatabaseCaller
# from TaskNode import TaskNode

# db_caller = DatabaseCaller()
# tasknodes = []
# tnode1 = TaskNode("Water")
# tnode1.type = True
# tnode2 = TaskNode("Pot")
# tnode2.type = True
# tnode3 = TaskNode("Pot of Water", "A pot of water", "Pour some water into the pot", 60)
# tnode3.type = False
# tnode3.add_dependency(tnode1.name)
# tnode3.add_dependency(tnode2.name)
# tnode3.operator = "put"
# tasknodes.append(tnode1)
# tasknodes.append(tnode2)
# tasknodes.append(tnode3)

# db_caller.add_tasknodes(tasknodes);

## Attempt to fix dictionary insertion into  - Resolved by changing one line of code in rest api

# import os, sys
# from parse_rest.connection import register, ParseBatcher
# from parse_rest.datatypes import Object as ParseObject

# APPLICATION_ID = "qfJEdKLsk6oGWYL6CotKWZGSGxpWtGECdUT8IGhX"
# REST_API_KEY = "TmXWGk0CxoPIBeSzqlxf7u2C9V7mlB6sNgRs5eEZ"
# register(APPLICATION_ID, REST_API_KEY)

# class Object(ParseObject):
#     pass

# obj = Object()
# my_dict = {u'active': u'False', u'type': u'True', u'yolo' : u'nolo'}
# obj.diction = my_dict.items()
# obj.save()

# db_object = Object.Query.all()
# for i in db_object:
# 	print(i.diction)

### Recipe tester
# in the form [{tasknode1},{tasknode2},{tasknode3 
# better illustrated [{"name" : "Water", "time" : 300, "units" : "seconds"}]
# - name will get generic information, recipe will provide specific 

from databasecaller import DatabaseCaller
from databasecaller import Recipe as rp
from TaskNode import TaskNode

#should be moved to a more universal spot
class Recipe:
	def __init__(self, name_in, tasknode_dictionary):
		self.name = name_in
		self.tasknode_dictionary = tasknode_dictionary

db_caller = DatabaseCaller()
# tasknodes = []
# tnode1 = TaskNode("Water")
# tnode1.type = True
# tnode2 = TaskNode("Pot")
# tnode2.type = True
# tnode3 = TaskNode("Pot of Water", "A pot of water", "Pour some water into the pot", 60)
# tnode3.type = False
# tnode3.add_dependency(tnode1.name)
# tnode3.add_dependency(tnode2.name)
# tnode3.operator = "put"
# tasknodes.append(tnode1)
# tasknodes.append(tnode2)
# tasknodes.append(tnode3)

# tasknode_dictionary = [{'name' : tnode1.name, 'time' : 100}]

# my_recipe = Recipe("The divine liquid of life", tasknode_dictionary)
# db_caller.add_recipe(my_recipe);

#-# Addding recipe works

# import os, sys
# from parse_rest.connection import register, ParseBatcher
# from parse_rest.datatypes import Object as ParseObject
# APPLICATION_ID = "qfJEdKLsk6oGWYL6CotKWZGSGxpWtGECdUT8IGhX"
# REST_API_KEY = "TmXWGk0CxoPIBeSzqlxf7u2C9V7mlB6sNgRs5eEZ"
# register(APPLICATION_ID, REST_API_KEY)
# recipe_object = rp.Query.filter(name = "The divine liquid of life")[0]
# print(recipe_object.name)
# print(recipe_object.tasknode_dictionary)


list_of_tasknodes = db_caller.get_recipe_tasknodes("The divine liquid of life")
for i in list_of_tasknodes:
	print(i.name)
	print(i.short_descr)
	print(i.long_descr)
	print(i.time)
	print(i.dependencies)
	print(i.flags)