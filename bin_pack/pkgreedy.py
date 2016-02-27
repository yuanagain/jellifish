# Future: regex approach?

from PatchKit import PatchKit
from TaskSequence import TaskSequence
from TaskSequence import TaskNode
import DataUtils as dutils
import TaskSequence as TS
import sys
import numpy as np

class PKGreedy(PatchKit):
    def __init__(self, seq_list = None):
        self.seq_list = seq_list
        self.executed = False
        self.timing = -1.0
        self.sequence = None


    def fit(self):
        """
        Pastes a sequence of tasks together, attempts to fill
        idle time w/ a greedy heuristic.

        Returns the sequence of tasks.
        """
        if (self.executed == True):
            return self.timing, self.sequence

        # keep track of elapsed time
        current_timing = 0.0
        current_sequence = []

        # tasks remaining for each
        remaining = [(len(ts.tasks) - 1) for ts in self.seq_list]
        # load up buffer
        buf = [ts.tasks[0] for ts in self.seq_list]
        # while action items available

        # TODO: NEED TO ASSIGN PROGRAMATICALLY
        max_start = 90000000
        # when we need to act on the next tasks in the sequence
        earliest_start = [0] * len(self.seq_list)
        latest_start = [max_start] * len(self.seq_list)

        while (isNonEmpty(buf)):
            executed_task = False
            # sort tasks by urgency
            sorted_indices = indexSort(latest_start)
            for index in sorted_indices:
                # if task not yet ready to start.
                if earliest_start[index] > current_timing:
                    continue
                # if that sequence is done executing
                if buf[index] == None:
                    continue

                # add to execution list
                task = buf[index]
                data = task.dump_data()
                data["start"] = current_timing
                current_timing += task.time
                data["end"] = current_timing
                current_sequence.append(data)

                # update earliest and latest start times
                earliest_start[index] = current_timing + task.min_wait
                latest_start[index] = current_timing + task.max_wait

                # load up next task:
                if remaining[index] == 0:
                    earliest_start[index] = max_start
                    latest_start[index] = max_start
                    buf[index] = None
                else:
                    tasks = self.seq_list[index].tasks
                    task_ct = len(tasks)
                    buf[index] = tasks[task_ct - remaining[index]]
                    remaining[index] -= 1

                executed_task = True
                break
                # update buffer


            # wait if no possible tasks.
            if (executed_task == False):
                # print("WAITNG")

                min_wait = min(earliest_start) - current_timing
                # print(min_wait)
                wait_data = TS.wait_data(current_timing, current_timing + min_wait)
                # add wait data 
                current_sequence.append(wait_data)
                current_timing += min_wait


        self.sequence = current_sequence
        self.timing = current_timing
        self.executed = True;
        return current_timing, current_sequence

def indexSort(arr):
    """
    Return new indexing for sorted array.
    """
    return [i[0] for i in sorted(enumerate(arr), key=lambda x:x[1])]

def isNonEmpty(arr):
    for el in arr:
        if el != None:
            return True
    return False

def main(argv):
    print("TESTING PKGREEDY")
    print("PKGREEDY")
    tn_1 = TaskNode(name = "tn1", time = 10.0, min_wait = 10.0, max_wait = 30.0)
    tn_2 = TaskNode(name = "tn2", time = 20.0, min_wait = 0.0, max_wait = 20.0)
    tn_3 = TaskNode(name = "tn3", time = 30.0, min_wait = 40.0, max_wait = 20.0)

    tn_4 = TaskNode(name = "tn4", time = 10.0, min_wait = 10.0, max_wait = 20.0)
    tn_5 = TaskNode(name = "tn5", time = 10.0, min_wait = 0.0, max_wait = 20.0)
    tn_6 = TaskNode(name = "tn6", time = 10.0, min_wait = 20.0, max_wait = 20.0)

    ts_1 = TaskSequence("ts1", tasks = [tn_1, tn_2, tn_3])
    ts_2 = TaskSequence("ts2", tasks = [tn_4, tn_5, tn_6])

    ov1 = PKGreedy([ts_1, ts_2])
    ct, cs = ov1.fit()
    print(ct)
    dutils.print_instr(cs)

if __name__ == "__main__":
    main(sys.argv)