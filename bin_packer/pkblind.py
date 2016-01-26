from PatchKit import PatchKit
from TaskSequence import TaskSequence
from TaskSequence import TaskNode
import DataUtils as dutils
import TaskSequence as TS
import sys

class PKBlind(PatchKit):

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
                
                if (task.wait_low > 0):
                    current_sequence.append(
                        TS.wait_data(current_timing, current_timing + task.wait_low))
                current_timing += task.wait_low


        return current_timing, current_sequence

def main(argv):
    print("PKBLIND")
    tn_1 = taskNode(name = "tn1", time = 10.0, wait_low = 10.0, wait_high = 20.0)
    tn_2 = taskNode(name = "tn2", time = 10.0, wait_low = 0.0, wait_high = 20.0)
    tn_3 = taskNode(name = "tn3", time = 10.0, wait_low = 20.0, wait_high = 20.0)

    tn_4 = taskNode(name = "tn4", time = 10.0, wait_low = 10.0, wait_high = 20.0)
    tn_5 = taskNode(name = "tn5", time = 10.0, wait_low = 0.0, wait_high = 20.0)
    tn_6 = taskNode(name = "tn6", time = 10.0, wait_low = 20.0, wait_high = 20.0)

    ts_1 = taskSequence([tn_1, tn_2, tn_3])
    ts_2 = taskSequence([tn_4, tn_5, tn_6])

    ov1 = PKBlind([ts_1, ts_2])
    ct, cs = ov1.fit()
    print(ct)
    dutils.print_instr(cs)

if __name__ == "__main__":
    main(sys.argv)