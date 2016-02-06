from TaskNode import TaskNode
import CoreEngine as CE
import TnodeUtils
from graphDBMgr import graphDBMgr
import os, sys

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
TaskNodes pulled from the SQLlite Database after
a TaskNode query. Simply run generateTaskList.py
and let it guide you.
'''

def main():
    #os.system("rm -rf RECIPEDATA_GRAPH.db")
    list_of_task_nodes = []
    gDBMgr = graphDBMgr("newData.db")
    tasknode_name = input('Please enter a TaskNode query name : ')
    pulledNode = gDBMgr.fetch_taskNode_byName(tasknode_name)
    if (pulledNode is not None):
        list_of_task_nodes.append(pulledNode)
        retrieve_task_nodes(pulledNode, list_of_task_nodes)
    print('\n')
    for i in list_of_task_nodes:
        i.display()
        print('\n')
    print("------------------------------------------")
    core_engine = CE.CoreEngine(list_of_task_nodes)
    core_engine.printTasks()
        
if __name__ == '__main__':
    main()