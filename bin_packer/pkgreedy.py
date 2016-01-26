from PatchKit import PatchKit
from TaskSequence import TaskSequence
from TaskSequence import TaskNode
import DataUtils as dutils
import TaskSequence as TS
import sys

class PKBlind(PatchKit):
    def __init__(self, seq_list = None):
        super(PKBlind, self).__init__(seq_list)

    def greedy_sequence(self):
        """
        Pastes a sequence of tasks together, attempts to fill
        idle time w/ a greedy heuristic.

        Returns the sequence of tasks.
        """
        current_timing = 0.0
        current_sequence = []

        # while action items available

            # if idle, consider possible tasks from other recipes

            # select task

            # wait if no possible tasks.

def main(argv):
    print("TESTING PKGREEDY")
    print("TESTS NOT YET IMPLEMENTED")

if __name__ == "__main__":
    main(sys.argv)