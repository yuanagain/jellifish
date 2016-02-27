import os, sys
from old import TaskNode
from old import TnodeUtils
from old import graphDBMgr
import DBMClient
import TaskSequence

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
    list_of_bin_pack_nodes = []
    gDBMgr = graphDBMgr.graphDBMgr("old/newData.db")
    client = DBMClient.DBMClient("tigerlaunch.db")
    tasknode_name = input('Please enter a TaskNode query name : ')
    pulledNode = gDBMgr.fetch_taskNode_byName(tasknode_name)
    if (pulledNode is not None):
        list_of_task_nodes.append(pulledNode)
        retrieve_task_nodes(pulledNode, list_of_task_nodes)
    print('\n')
    for i in list_of_task_nodes:
        i.display()
        if (i.flags['active'] == True):
            min_wait_time = 0
        else:
            min_wait_time = i.time
        max_wait_time = min_wait_time + i.time
        bin_pack_Tnode = TaskSequence.TaskNode(name = i.name,\
            descr = i.long_descr, time = i.time,\
            min_wait = min_wait_time, max_wait = max_wait_time)
        list_of_bin_pack_nodes.append(bin_pack_Tnode)
        print('\n')
    print("------------------------------------------")

    recipe = TaskSequence.TaskSequence(name = tasknode_name, tasks = list_of_bin_pack_nodes)
    client.add_recipe(recipe)
    client.fetch_recipe(tasknode_name).print_dump()
    
if __name__ == '__main__':
    main()