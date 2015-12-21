from databasecaller import DatabaseCaller
from TaskNode import TaskNode

from algo import CoreEngine as CE
from algo import TnodeUtils

'''
Generate a list of TaskNode objects
from a given TaskNode query,
in no particular order. This is the
input to our optimization algorithm.

inputs: the name of the TaskNode
		query (TaskNode object),
		and a list (typically empty)
		which will get populated with
		the TaskNode objects.
'''
def retrieve_task_nodes(tasknode, list_of_task_nodes):
	for i in tasknode.dependencies:
		retrieve_task_nodes(i, list_of_task_nodes)
		list_of_task_nodes.append(i)

'''
Test the CoreEngine functionality on a list of
TaskNodes pulled from the Parse Database after
a TaskNode query. Simply run generateTaskList.py
and let it guide you.
'''

def main():
	list_of_task_nodes = []
	db_caller = DatabaseCaller()
	tasknode_name = input('Please enter a TaskNode query name : ')
	pulled_node = db_caller.create_tasknode(tasknode_name)
	if (pulled_node is not None):
		list_of_task_nodes.append(pulled_node)
		retrieve_task_nodes(pulled_node, list_of_task_nodes)
		print('\n')
		for i in list_of_task_nodes:
			i.display()
			print('\n')
		print("------------------------------------------")
		core_engine = CE.CoreEngine(list_of_task_nodes)
		core_engine.printTasks()


if __name__ == '__main__':
    main()
