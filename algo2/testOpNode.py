"""
A battery of tests to test and demonstrate TaskNode usage
Author: Yuan Wang
Copyright Jellifish 2015
"""

import opNode as ON

def main():
    print("Step 1: Testing constructor")
    children1 = [] #add 2 and 3 later
    children2 = []
    children3 = []

    ##change involvement to enums later for clarity 
    ## True = Passive False = active
    onode_1 = ON.opNode(1, children1, 15, True) 
    onode_2 = ON.opNode(2, children2, 10, False)
    onode_3 = ON.opNode(3, children3, 10, True)

    onode_1.display()
    onode_2.display()
    onode_3.display()
    print("Done \n")
    
    print("Step 2: Testing methods")
    print("Adding one dependency")
    onode_1.add_child(onode_3)
    onode_1.display()
    print("")
    
    print("adding another dependency")
    onode_1.add_child(onode_2)
    onode_1.display()
    print("")

    print("readding a dependency")
    onode_1.add_child(onode_2)
    onode_1.display()
    print("")
    
    print("Creating flag")
    onode_1.set_flag("ingredient")
    print(onode_1.get_flag("ingredient"))
    print("")
    
    print("Changing flag")
    onode_1.set_flag("ingredient", "FALSE")
    print(onode_1.get_flag("ingredient"))
    onode_1.display()
    print("")
    
    print("Done\n")
    print("Tests completed")

    
if __name__ == "__main__":
    main()