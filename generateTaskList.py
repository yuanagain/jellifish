'''
Generate a list of TaskNode objects
to complete a given TaskNode query,
in no particular order. This is the
input to our optimization algorithm.


'''

def retrieve_task_nodes(tasknode_name):
	list_of_task_nodes = []
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
