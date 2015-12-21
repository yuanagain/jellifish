"""
Tests and showcases basic functionalities of the CoreEngine module

Author: Yuan Wang
Copyright Jellifish 2015
"""

import sys
import TaskNode as TN
import CoreEngine as CE

def main(argv):
    # initialize nodes, set flags
    tnode_end = TN.TaskNode("end_node")
    tnode_i1 = TN.TaskNode("ingr_1")
    tnode_i2 = TN.TaskNode("ingr_2")
    tnode_i3 = TN.TaskNode("ingr_2")
    
    tnode_a1 = TN.TaskNode("act_1", time = 10.0)
    tnode_a1.set_flag("active")

    tnode_a2 = TN.TaskNode("act_2", time = 20.0)
    tnode_a2.set_flag("active")

    tnode_p1 = TN.TaskNode("pas_1", time = 30.0)

    # add dependencies
    tnode_end.add_dependency(tnode_p1)
    tnode_end.add_dependency(tnode_a2)
    
    tnode_p1.add_dependency(tnode_a1)
    
    tnode_a1.add_dependency(tnode_i1)
    tnode_a1.add_dependency(tnode_i2)
    tnode_a2.add_dependency(tnode_i3)
    
    tn_list = [tnode_end, tnode_i1, tnode_a1, tnode_p1, tnode_a2,
               tnode_i2, tnode_i3]
    core_eng = CE.CoreEngine(tn_list)
    core_eng.printTasks()

    print(core_eng.ultrasort(int(argv[1])))

def invalid_input():
    print("Invalid Input")
    print("Expected Usage: python testCoreEngine <N>, N positive integer")
    
if __name__ == "__main__":
    if len(sys.argv) < 2:
        invalid_input()
    else:
        main(sys.argv)
