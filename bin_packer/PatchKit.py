"""
This module contains algorithms for optimizing batches of task sequences
"""
from TaskSequence import TaskNode
from TaskSequence import TaskSequence
import dataUtils as dutils
import TaskSequence as TS
import sys

class PatchKit:
    def __init__(self, seq_list = None):
        self.seq_list = seq_list

    def load(self, seq_list):
        """
        Loads seq_list into optimize_v1 object. Overwrites old
        seq_list. Updates as appropriate.

        Parameters:
        ------
        seq_list : taskSequence[]
        A list of taskSequence objects
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

    def fit(self):
        print("NOT IMPLEMENTED")

    def simulate_v1(self):
        """
        Random simulation of completing all tasks in seq_list.

        Returns the timing and the sequence of tasks used to complete.
        """
        current_timing = 0.0
        current_sequence = []

        return current_timing, current_sequence

def main(argv):
    print("TESTING PATCHKIT")
    print("TESTS NOT YET IMPLEMENTED")

if __name__ == "__main__":
    main(sys.argv)