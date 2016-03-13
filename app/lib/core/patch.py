"""
This module contains algorithms for optimizing batches of task sequences
"""
import node

# USE THESE IMPORTS WHEN PACKAGING
#from . import node

class PatchKit:
    def __init__(self, seq_list = None):
        self.seq_list = seq_list

    def load(self, seq_list):
        """
        Loads seq_list into optimize_v1 object. Overwrites old
        seq_list. Updates as appropriate.

        Parameters:
        ------
        seq_list : TaskSequence[]
        A list of TaskSequence objects
        """
        self.seq_list = seq_list

    def opt_sim(self, n_trials):
        """
        Optimizes seq_list via simulation attempts.

        Returns best discovered sequence

        Parameters
        ------
        n_trials : int (optional)
        The number of trials to simulate
        """
        active_time = sum([seq.act_time() for seq in self.seq_list])
        wait_time = sum([seq.wait_time() for seq in self.seq_list])
        min_time = sum([seq.min_time() for seq in self.seq_list])

        best_timing = -1.0
        best_sequence = []

        for i in range(n_trials):
            new_timing, new_sequence = simulate_v1(seq_list)
            if new_timing < best_timing:
                best_timing = new_timing
                best_sequence = new_sequence

        return best_sequence

    def simulate_v1(self):
        """
        Random simulation of completing all tasks in seq_list.

        Returns the timing and the sequence of tasks used to complete.
        """
        current_timing = 0.0
        current_sequence = []

        return current_timing, current_sequence

class PatchKitBlind(PatchKit):
    def fit(self):
        """
        Pastes a sequence of tasks together.

        Returns the sequence of tasks.
        """
        current_timing = 0.0
        current_sequence = []

        for seq in self.seq_list:

            for task in seq.tasks:
                data = task.dump_data()
                data["start"] = current_timing
                current_timing += task.time
                data["end"] = current_timing
                current_sequence.append(data)
                
                if (task.min_wait > 0):
                    current_sequence.append(
                        node.wait_data(current_timing, current_timing + task.min_wait))
                current_timing += task.min_wait


        return current_timing, current_sequence

class PatchKitGreedy(PatchKit):
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
                min_wait = min(earliest_start) - current_timing
                wait_data = node.wait_data(current_timing, current_timing + min_wait)
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
    """
    Returns whether or not the array arr is nonempty. An empty
    array in this case is one that only contains None for its values
    """
    for el in arr:
        if el != None:
            return True
    return False
