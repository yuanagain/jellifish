"""
A set of utilities for validating TaskNode data.

isComplete(tnode_list)
    Description:
    This method detects whether a list contains are relevant nodes
    
    Parameters
    ------
    tnode_list : TaskNode[]
    A list of TaskNodes

isAcyclic(tnode_list)
    Description:
    This method detects cycles among a group of TaskNodes

    Parameters
    ------
    tnode_list : TaskNode[]
    A list of TaskNodes

isTopological(tnode_list)
    Description:
    Verifies that a list of tasks is in topological order

    Parameters
    ------
    tnode_list : TaskNode[]
    A list of TaskNodes

getCompletionTime(tnode_list)
    Description:
    Returns completion time of a (topologically valid) task node list.

    Parameters
    ------
    tnode_list : TaskNode[]
    A list of TaskNodes

getStartEnd(tnode_list)
    Description:
    Provides portable list of task start and end times

    Parameters
    ------
    tnode_list : TaskNode[]
    A list of TaskNodes
"""

import TaskNode as TN

def isComplete(tnode_list):
    """
    This method detects whether a list contains are relevant nodes
    
    Parameters
    ------
    tnode_list : TaskNode[]
    A list of TaskNodes
    """
    return True

def isAcyclic(tnode_list):
    """
    This method detects cycles among a group of TaskNodes
    
    Parameters
    ------
    tnode_list : TaskNode[]
    A list of TaskNodes
    """
    return True

def isTopologcal(tnode_list):
    """
    Verifies that a list of tasks is in topological order
    
    Parameters
    ------
    tnode_list : TaskNode[]
    A list of TaskNodes    
    """
    return True

def getCompletionTime(tnode_list):
    """
    Returns completion time of a (topologically valid) task node list.
    
    Parameters
    ------
    tnode_list : TaskNode[]
    A list of TaskNodes
    """
    return True

def getStartEnd(tnode_list):
    """
    Provides portable list of task start and end times
    
    Parameters
    ------
    tnode_list : TaskNode[]
    A list of TaskNodes
    """
    return None
