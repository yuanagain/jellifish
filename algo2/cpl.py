from Graph import Graph
from opNode import opNode
from toposort import toposort, toposort_flatten
from graphGen import genGraph

def calcCPLs(graph):
	print("graph_dict = " + str(graph.graph_dict))
	sortedNodes = toposort_flatten(graph.graph_dict)

	print("sortedNodes = ")
	for n in sortedNodes:
		print n.idx
	print("end sortedNodes")

	for n in sortedNodes:
		maxcpl = 0
		for c in n.children:
			if(c.cpl > maxcpl):
				maxcpl = c.cpl
		if(n.involvement == True):
			n.cpl = n.duration + maxcpl
		else:
			n.cpl = maxcpl
	return sortedNodes

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


 graph = genGraph(recipeNode)

 result =(calcCPLs(graph))

 for s in result:
 	print("node: " + str(s.idx) + " cpl: " + str(s.cpl))
