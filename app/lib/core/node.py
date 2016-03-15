"""
This module contains the basic data structures for optimizing 
a sequence according to a bin-packing optimizsation approach.

Author: Yuan Wang
Copyright Jellifish 2015
"""

class TaskNode:
    """
    A TaskNode contains information about itself and its wait time.
    """
    def __init__(self, name = "", descr = "", time = 1.0, min_wait = 0, max_wait = 0):
        self.name = name
        self.descr= descr
        self.time = time
        self.min_wait = min_wait
        self.max_wait = max_wait

    def dump_data(self):
        """
        Returns a representation of the node.
        """
        return {"name": self.name, "descr": self.descr, 
        "time": self.time, "min_wait": self.min_wait, 
        "max_wait": self.max_wait}

    def print_dump(self):
        """
        Prints the representation of the node.
        """
        print("%16s %10s %10d" % (self.name, self.descr, self.time))

def wait_data(start, end):
    """
    Creates wait time data
    """
    return {"name": "Wait", "descr": "Nothing to do now, just hold on!", 
        "start": start, "end": end, "time": start - end, "data": None}

class TaskSequence:
    """
    A TaskSequence is a list of tasks.
    """
    def __init__(self, name, descr = "", tasks = []):
        self.name = name
        self.descr = descr
        self.tasks = tasks
        # negative time indicates that it has yet to be computed
        self.min_t = -1.0
        self.wait_t = -1.0
        self.act_t= -1.0

    def load(self, tasks):
        """
        Load a set of tasks into TaskSequence
        """
        self.tasks = tasks
        self.min_t = -1.0
        self.wait_t = -1.0
        self.act_t = -1.0

    def act_time(self):
        """
        Returns active time for task sequence
        """
        if self.act_t >= 0.0: return self.act_t
        self.update_times()
        return self.act_t

    def min_time(self):
        """
        Returns minimum execution time for task sequence
        """
        if self.min_t >= 0.0: return self.min_t
        self.update_times()
        return self.min_t

    def wait_time(self):
        """
        Returns cumulative min wait time for task sequence
        """
        if self.wait_t >= 0.0: return self.wait_t
        self.update_times()
        return self.wait_t

    def update_times(self):
        """
        Updates computed act_time, min_time, wait_time after
        loading a new task sequence.
        """
        self.wait_t = 0.0
        self.min_t = 0.0
        for task in self.tasks:
            # increment minimum amount of time to move on to next task
            self.min_t += task.time + task.min_wait
            self.wait_t += task.min_wait
        self.act_time = self.min_t - self.wait_t

    def print_dump(self):
        """
        Prints out a representation of the sequence.
        """
        print("TaskSequence: " + self.name)
        print("Printing tasks")
        print("%16s %10s %10s" % ("name", "descr", "time"))
        for task in self.tasks:
            task.print_dump()
