"""
The TaskNode class provides the base implementation for DAG Nodes.

Methods:
__init__(name, short_descr, long_descr, time)

    Description:
    Creates a TaskNode with no dependencies

    Parameters: 
    ------
    name : String
    Name of node, not necessarily human comprehensible

    short_descr : String (default = '')
    Optional short description of task : i.e Mix flour, eggs, butter

    long_descr: String (default = '')
    Optional detailed description of task : i.e. Combine flour, eggs
    and butter in a large mixing bowl, using a whisk.

    time: float (default = 0.0)
    ------
    Time to complete    
 
add_dependency(dependency)

    Description:
    ------
    If dependency does not already exist, adds dependency to 
    TaskNode's dependency table.

    Parameters:
    ------
    dependency : TaskNode
    The dependency to be added

Author: Yuan Wang
Copyright Jellifish 2015
"""
import sys

class TaskNode:
    def __init__(self, name, short_descr = '', long_descr = '',
                 time = 0.0):
        self.name = name
        self.short_descr = short_descr
        self.long_descr = long_descr
        self.time = time
        self.dependencies = []
        self.flags = {'active': False} 

    def status(self):
        """
        Dumps data to dictionary, returns dicionary
        """
        status = dict()
        status['name'] = self.name
        status['short_descr'] = self.short_descr
        status['long_descr'] = self.long_descr
        status['time'] = self.time
        # returns string of names of dependencies instead
        status['dependencies'] = [d.name for d in self.dependencies]
        status['flags'] = self.flags
        return status
        
    def display(self):
        """ 
        Prints status of node to stdout.
        """
        print(self.status())
        
    def add_dependency(self, dependency):
        """
        Description:
        ------
        If dependency does not already exist, adds dependency 
        to TaskNode's dependency table.

        Parameters:
        ------
        dependency : TaskNode
        
        The dependency to be added
        """
        if dependency not in self.dependencies:
            self.dependencies.append(dependency)
            return True
        return False

    def set_flag(self, flag, value = True):
        """
        Description:
        ------
        Sets status of flag to value for the node,
        default to True

        Parameters:
        ------
        flag : String
        Flag being queried

        value : Object/Float/String (default = True)
        Sets flag to value.
        """
        self.flags[flag] = value

    def get_flag(self, flag):
        """
        Description:
        ------ 
        Returns status of flag for the node, and None
        if no flag exists.

        Parameters:
        ------
        flag : String
        Flag being queried
        """
        if flag in self.flags:
            return self.flags[flag]
        else:
            return None

    

    
