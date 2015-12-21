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
from TaskNode import TaskNode

#print the status (and the status of its dependencies,
#and their dependencies recursively)
#for a given tasknode
def printStatus(tasknode):
	tasknode.display()
	for i in tasknode.dependencies:
		printStatus(i)

def main():
	db_caller = DatabaseCaller()
	pulled_node = db_caller.create_tasknode('pot of water')
	if (pulled_node is None):
		pass
	else:
		printStatus(pulled_node)

if __name__ == '__main__':
    main()