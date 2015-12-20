from opNode import opNode
from Graph import Graph
import Queue

def genGraph(recipeNode):
    g = {recipeNode: recipeNode.children}
    graph = Graph(g)

    nodeQueue = Queue.Queue()
    curNode = recipeNode

    while (not nodeQueue.empty()) or (curNode == recipeNode):
        for d in curNode.children:
            nodeQueue.put(d); 
            graph.add_vertex(d);
        curNode = nodeQueue.get()
    return graph

if __name__ == "__main__":

    children1 = [] 
    children2 = []
    children3 = []

    recipeNode = opNode(1, children1, 15, True) 
    onode_2 = opNode(2, children2, 10, False)
    onode_3 = opNode(3, children3, 10, True)

    recipeNode.add_child(onode_2)
    recipeNode.add_child(onode_3)

    recipeNode.display()
    onode_2.display()
    onode_3.display()

    graph = genGraph(recipeNode)

    print("Vertices of graph:")
    dependencies = graph.vertices()
    for d in dependencies:
        print(d.idx)

    print("edges of graph:")
    edges = graph.edges()
    for i in edges:
        for node in i:
            print(node.idx),
        print " "