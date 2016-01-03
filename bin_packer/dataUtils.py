import taskSequence as TS

def print_instr(instructions, verbose = False):
	"""
	Prints the instructions
	"""
	print("%16s %10s %10s" % ("Name", "Start", "End"))
	for task in instructions:
		print("%16s %10s %10s" % (task["name"], task["start"], task["end"]))
