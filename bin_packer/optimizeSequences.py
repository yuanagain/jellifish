"""
This module contains algorithms for optimizing batches of task sequences
"""
from taskSequence import taskNode
from taskSequence import taskSequence
import dataUtils as dutils
import taskSequence as TS
import sys

class optimize_v1:
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


	def simulate_v1(self):
		"""
		Random simulation of completing all tasks in seq_list.

		Returns the timing and the sequence of tasks used to complete.
		"""
		current_timing = 0.0
		current_sequence = []

		return current_timing, current_sequence

	def blind_sequence(self):
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
	print("Testing blind_sequence")
	tn_1 = taskNode(name = "tn1", time = 10.0, wait_low = 10.0, wait_high = 20.0)
	tn_2 = taskNode(name = "tn2", time = 10.0, wait_low = 0.0, wait_high = 20.0)
	tn_3 = taskNode(name = "tn3", time = 10.0, wait_low = 20.0, wait_high = 20.0)

	tn_4 = taskNode(name = "tn4", time = 10.0, wait_low = 10.0, wait_high = 20.0)
	tn_5 = taskNode(name = "tn5", time = 10.0, wait_low = 0.0, wait_high = 20.0)
	tn_6 = taskNode(name = "tn6", time = 10.0, wait_low = 20.0, wait_high = 20.0)

	ts_1 = taskSequence([tn_1, tn_2, tn_3])
	ts_2 = taskSequence([tn_4, tn_5, tn_6])

	ov1 = optimize_v1([ts_1, ts_2])
	ct, cs = ov1.blind_sequence()
	print(ct)
	dutils.print_instr(cs)

if __name__ == "__main__":
	main(sys.argv)