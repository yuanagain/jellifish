from Graph import Graph
from opNode import opNode
from toposort import toposort, toposort_flatten
from graphGen import genGraph
from cpl import calcCPLs

def getKey(opNode):
    return opNode.cpl

def opOrder(recipeNode):
	## build graph
	graph = genGraph(recipeNode)

	## calculate critical path lengths
	nodes = calcCPLs(graph)
	print("nodes = ")
	for n in nodes:
		print n.idx
	print("end nodes")


	## sort nodes in order of decreasing cpls
	sortedNodes = sorted(nodes, key = getKey, reverse = True)
	print("sortedNodes = ")
	for n in sortedNodes:
		print n.idx
	print("end sortedNodes")
	sequence = []

	## while(recipe node is not complete)
	while(recipeNode.completed == False):
		## check which nodes are accesible (children have all been completed)
		## and "complete" these
		for n in sortedNodes:
			print("n = " + str(n.idx))
			if n.completed == False:

				n.completed = True

				for c in n.children:
					print("c: " + str(c.idx))
					if c.completed == False:
						n.completed = False

				print("n.status = " + str(n.completed))
				if n.get_flag("completed") == "True":
					sequence.append(n)

				if n.children == []:
					sequence.append(n)
					n.set_flag("completed", "True")

		return sequence




if __name__ == "__main__":
	children1 = [] 
	children2 = []
	children3 = []
	children4 = []
	children5 = []


	recipeNode = opNode(5, children5, 15, False) 
	onode_1 = opNode(1, children1, 10, False)
	onode_2 = opNode(2, children2, 10, True)
	onode_3 = opNode(3, children3, 5, False)
	onode_4 = opNode(4, children4, 20, False)
	

	recipeNode.add_child(onode_2)
	recipeNode.add_child(onode_4)
	onode_4.add_child(onode_3)
	onode_4.add_child(onode_1)

	oporder = opOrder(recipeNode)

	for s in oporder:
		print s.idx


