"""
This module implements an early attempt to satisfy
the core optimization engine interface.

class CoreEngine

Methods:
__init__():
    Parameters
    ------
    tasklist : TaskNode[]
    A list of TaskNodes to be ordered

ultrasort(N):
    Description
    ------
    Returns an output dictionary describing the best
    sequence of task orderings over N trials

    Parameters
    ------
    N : int
    Positive integer denoting number of pseudorandom
    trials from which to extract the best sample.

Example Usage:

import CoreEngine as CE
import TaskNode as TN

tnode_end = TN.TaskNode("end_node")
tnode_i1 = TN.TaskNode("ingr_1")

tnode_a1 = TN.TaskNode("act_1", time = 10.0)
tnode_a1.set_flag("active")

tnode_end.add_dependency(tnode_a1)
tnode_a1.add_dependency(tnode_i1)

solution = CE.CoreEngine([tnode_end, tnode_i1, tnode_a1])
print(solution.ultrasort())
print(solution.ultrasort(10000))

Author: Yuan Wang
Copyright Jellifish 2015
"""

import TaskNode as TN
import random

class CoreEngine:
    def __init__(self, tasklist):
        self.N = len(tasklist)

        # various subsets of tasks
        self.incomplete = tasklist
        self.complete = []
        self.staging = []
        self.background = []

        # initialize counter
        self.time = 0.0
        self.heuristic = None

        # TODO: data validation
        # Cycle detection
        # Completeness Check

    def ultrasort(self, N = 50):
        """Returns the best of N optimization trials"""
        self.sort()
        high_score = self.complete[-1].start_time + self.complete[-1].time
        champ = extract(self.complete)
        for i in range(N):
            self.sort()
            duration = self.complete[-1].start_time + self.complete[-1].time
            if duration < high_score:
                high_score = self.complete[-1].start_time + self.complete[-1].time
                champ = extract(self.complete)
        return champ
    
    def sort(self, selection = "uniform"):
        "Helper Method: Returns a topological sorted list w/ start and send times"
        # select a selection function
        if selection == "uniform":
            selection = self.select_random
        
        self.update()
        while len(self.complete) != self.N:
            # wait it out if nothing to execute
            if len(self.staging) == 0:
                if len(self.background) != 0:
                    self.wait_passive()
            # select an active task to execute
            else:
                tn = selection()
                self.execute(tn)
            # update graph
            self.update()

    def give_topo(self):
        """
        Provides a topologically sorted sequence of tasks
        """
            
    def select_active(self):
        """
        Helper Method: Selects task from staging to execute
        """
        return self.staging[0]
        
    def wait_passive(self):
        """
        Helper Method: Determine wait time until next passive task free
        """
        dt = min([(el.start_time + el.time) for el in self.background]) - self.time
        self.time += dt
        
    def execute(self, tn):
        """
        Helper Method: Simulate active task execution
        """
        # log start time
        tn.start_time = self.time
        # step forward time
        self.time += tn.time
        # move into completed list
        self.complete.append(tn)
        self.staging.remove(tn)
        
    def update(self):
        """"
        Helper Method: update the queues
        """
        # check if any passive tasks are finished
        for tn in self.background:
            if tn.start_time + tn.time <= self.time:
                self.complete.append(tn)
                self.background.remove(tn)
        
        # move tasks into staging
        for tn in self.incomplete:
            if self.canExec(tn):
                if tn.flags["active"]:
                    # make available for active execution
                    self.staging.append(tn)
                else:
                    # immediately start available passive tasks
                    tn.start_time = self.time
                    # immediately complete instant tasks
                    if tn.time == 0.0:
                        self.complete.append(tn)
                    else:
                        self.background.append(tn)
                # remove from incompletel queue
                self.incomplete.remove(tn)
                
    def canExec(self, tn):
        "Helper Method: Checks if a task can be executed"
        for dep in tn.dependencies:
            if dep not in self.complete:
                return False
        return True

    def extract(self, tn_list = None):
        if tn_list == None:
            self.sort()
            tn_list = self.complete
        return extract(tn_list)

    def printTasks(self, tn_list = None):
        if tn_list == None:
            self.sort()
            tn_list = self.complete
        printTasks(tn_list)


    def select_random(self):
        """
        Helper Method: Randomly elects task from staging to execute
        """
        i = random.randint(0, len(self.staging) - 1)
        return self.staging[i]

def printTasks(tn_list):
    """
    Description
    ------
    Prints start and end times of each task in tn_list

    Parameters
    ------
    tn_list : TaskNode[]
    """
    print("PRINTING TASK SEQUENCE")
    print("%16s %10s %10s" % ("Name", "Start", "End"))
    for tn in tn_list:
        print("%16s %10d %10d" % (tn.name, tn.start_time,
                                tn.start_time + tn.time))
    
def extract(tn_list):
    """
    Description
    ------
    Returns standard task list data for export from tn_list

    Parameters
    ------
    tn_list : TaskNode[]
    """
    out_dict = {"active": [], "passive": []}
    for task in tn_list:
        entry = {"start_time": task.start_time, "duration": task.time,
                 "description": task.long_descr, "name": task.name}

        if task.flags["active"]:
            out_dict["active"].append(entry)
        else:
            out_dict["passive"].append(entry)
    return out_dict
