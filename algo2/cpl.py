from Graph import Graph
from opNode import opNode
from toposort import toposort, toposort_flatten
from graphGen import genGraph

def calcCPLs(graph):
	sortedNodes = toposort_flatten(graph.graph_dict)
	##toplogically sort graph
	##iterate ovver nodes 
		##CPL = MAX CPL of CHILDREN + BACKGROUND TIME?
	return sortedNodes

if __name__ == "__main__":

 children1 = [] 
 children2 = []
 children3 = []

 recipeNode = opNode(1, children1, 15, True) 
 onode_2 = opNode(2, children2, 10, False)
 onode_3 = opNode(3, children3, 10, True)

 recipeNode.add_child(onode_2)
 recipeNode.add_child(onode_3)

 graph = genGraph(recipeNode)

 result =(calcCPLs(graph))

 for s in result:
 	print(s.idx)
