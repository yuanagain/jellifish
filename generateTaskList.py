#import CoreEngine as CE
import TaskNode as TN
from databasecaller import DatabaseCaller
from TaskNode import TaskNode

'''
tnode_end = TN.TaskNode("end_node")
tnode_i1 = TN.TaskNode("ingr_1")

tnode_a1 = TN.TaskNode("act_1", time = 10.0)
tnode_a1.set_flag("active")

tnode_end.add_dependency(tnode_a1)
tnode_a1.add_dependency(tnode_i1)

solution = CE.CoreEngine([tnode_end, tnode_i1, tnode_a1])
print(solution.ultrasort())
print(solution.ultrasort(10000))
'''

'''
Generate a list of TaskNode objects
to complete a given TaskNode query,
in no particular order. This is the
input to our optimization algorithm.

inputs: the name of the TaskNode
		query, an instance of
		the DatabaseCaller class,
		and a list (typically empty)
		which will get populated with
		the TaskNode objects.
'''
def retrieve_task_nodes(tasknode_name, db_caller, list_of_task_nodes):
	pulled_node = db_caller.create_tasknode(tasknode_name)
	if (pulled_node is None):
		return
	list_of_task_nodes.append(pulled_node)
	for i in pulled_node.dependencies:
		retrieve_task_nodes(i, db_caller, list_of_task_nodes)
	return list_of_task_nodes

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
	list_of_task_nodes = retrieve_task_nodes(tasknode_name, \
							db_caller, list_of_task_nodes)
	if (list_of_task_nodes is not None):
		for i in list_of_task_nodes:
			i.display()
			print('\n')

if __name__ == '__main__':
    main()
