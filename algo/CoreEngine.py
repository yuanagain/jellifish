"""
This module provides the core optimization engine.
"""

import TaskNode as TN

class CoreEngine:
    def __init__(self):
        self.heuristic = None


    def reverse_traversal_sort(tasklist):
        """
        Bottom-up search
        """
        # Paths that take least time are added in reverse order
        
        # Update shortest known paths

        # CPL will be the max of its children's CPL + completion time of a given task.
        
        return None
        
    def optimize(tasklist):
        """
        Sort the tasklist to minimize completion time of tasks
        """
        unexecuted = tasklist
        while True:
            updateGraph(tasklist)

            for tn in unscheduled:
                if canSchedule(tn, tasklist):
                    execute(tn, tasklist)
            
        return None

    def execute(tn, tasklist):

        
    def updateGraph(tasklist):

    
    def prelim_sort(tasklist):
        """
        Preliminarily sorts tasklist
        """
        depths = dict()
        
        # topological sort by dependency depth
        return None    
