'''
Test Querying from the Parse Database

Instructions: Put the name of the TaskNode
you are looking for on line 33, 
pulled_node = db_caller.create_tasknode('NAME HERE')

if that tasknode exists in the database, you will
get a recursive list of it and its dependencies
and their dependencies, and so on.

if that tasknode does not exist in the database,
you will get a message:

"Could not find the specified tasknode"

'''

from databasecaller import DatabaseCaller
from databasecaller import Recipe as rp
from TaskNode import TaskNode

from algo.TnodeUtils import printTasks
from algo.CoreEngine import CoreEngine as CE


#print the status (and the status of its dependencies,
#and their dependencies recursively)
#for a given tasknode
def printStatus(tasknode, list_of_tasks):
	tasknode.display()
	for i in tasknode.dependencies:
		printStatus(i, list_of_tasks)
		#tnode = TaskNode(i.name, i.short_descr, i.long_descr, i.time)
		list_of_tasks.append(i)

def main():
	list_of_tasks = []
	db_caller = DatabaseCaller()
	pulled_node = db_caller.create_tasknode('ramen')
	if (pulled_node is None):
		pass
	else:
		printStatus(pulled_node, list_of_tasks)
		#list_of_tasks.append(pulled_node)
	# list_of_tasks = db_caller.my_set
	# print(db_caller.my_set)
	# for i in list_of_tasks:
	# 	print(i)
	core_engine = CE(list_of_tasks)
	core_engine.printTasks()

if __name__ == '__main__':
    main()