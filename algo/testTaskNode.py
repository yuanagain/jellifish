"""
A battery of tests to test and demonstrate TaskNode usage

Author: Yuan Wang
Copyright Jellifish 2015
"""

import TaskNode as TN

def main():
    print("Step 1: Testing constructor")
    tnode_1 = TN.TaskNode("test1")
    tnode_2 = TN.TaskNode("test2", "short description test",
                     "long description test", 4.0)
    tnode_1.display()
    print("Done \n")
    
    print("Step 2: Testing methods")

    print("Adding one dependency")
    tnode_1.add_dependency(tnode_2)
    tnode_1.display()
    print("")
    
    print("Re-adding dependency")
    tnode_1.add_dependency(tnode_2)
    tnode_1.display()
    print("")
    
    print("Creating flag")
    tnode_1.set_flag("ingredient")
    print(tnode_1.get_flag("ingredient"))
    print("")
    
    print("Changing flag")
    tnode_1.set_flag("ingredient", "FALSE")
    print(tnode_1.get_flag("ingredient"))
    tnode_1.display()
    print("")
    
    print("Done\n")
    print("Tests completed")

    
if __name__ == "__main__":
    main()
