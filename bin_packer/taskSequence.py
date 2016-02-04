"""
This module contains the basic data structures for optimizing 
a sequence.

"""

class taskNode:
    """
    A taskNode contains information about itself and its wait time.
    """
    def __init__(self, name = "", descr = "", data = dict(), time = 1.0,
        wait_low = 0, wait_high = 0, successor = None):
        self.name = name
        self.description = descr
        self.data = data
        # self.next = successor
        self.time = time
        # the number of fragments the task can be reduced into
        self.fragmentation = 1
        # cost to restart task
        self.frag_cost = 0.0
        self.wait_low = wait_low
        self.wait_high = wait_high
        # used in optimization
        self.completed = 0.0

    def dump_data(self):
        """
        Releases information on self.
        """
        return {"name": self.name, "descr": self.description, 
        "time": self.time, "data": self.data}

def wait_data(start, end):
    """
    Cretes wait time data
    """
    return {"name": "Wait", "descr": "Nothing to do now, just hold on!", 
        "start": start, "end": end, "time": start - end, "data": None}

class taskSequence:
    """
    A taskSequence is a list of tasks.
    """
    def __init__(self, tasks = []):
        self.tasks = tasks
        # negative time indicates that it has yet to be computed
        self.min_t = -1.0
        self.wait_t = -1.0
        self.act_t= -1.0

    def __iter__(self):
        self.i = -1
        return self

    def __next__(self):
        if self.i < len(self.tasks) - 1:    
            i += 1
            return self.tasks[i]
        return StopIteration

    def load(self, tasks):
        """
        Load a set of tasks into taskSequence
        """
        self.tasks = tasks
        self.min_t = -1.0
        self.wait_t = -1.0
        self.act_t = -1.0

    def act_time(self):
        if self.act_t >= 0.0: return self.act_t
        self.update_times()
        return self.act_t

    def min_time(self):
        if self.min_t >= 0.0: return self.min_t
        self.update_times()
        return self.min_t

    def wait_time(self):
        if self.wait_t >= 0.0: return self.wait_t
        self.update_times()
        return self.wait_t

    def update_times(self):
        self.wait_t = 0.0
        self.min_t = 0.0
        for task in self.tasks:
            # increment minimum amount of time to move on to next task
            self.min_t += task.time + task.wait_low
            self.wait_t += task.wait_low
        self.act_time = self.min_t - self.wait_t

def main():
    print("Testing Methods")

if __name__ == "__main__":
    main()
