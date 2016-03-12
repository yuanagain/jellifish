"""
Adds recipes
"""
import sys
import DBMClient
from TaskSequence import TaskSequence, TaskNode
import DataUtils as dutils

default_dbname = "jellifish_data.db"

def main(argv):
	# take default or user specified one
	dbmc = DBMClient.DBMClient(default_dbname)
	if len(argv) > 1: 
		dbmc = DBMClient.DBMClient(argv[1])

	print("=======================================")
	print("Enter Recipe Name, then hit <ENTER> to submit:")
	ts_name = sys.stdin.readline()
	print("Enter Recipe Description (optional), then hit <ENTER> to submit:")
	ts_descr = sys.stdin.readline()
	tasklist = []

	i = 0
	code = 1
	while (code != 0):
		i += 1
		print("Inputting task " + str(i))
		print("Enter Taskname, then hit <ENTER> to submit:")
		name = sys.stdin.readline()[:-1]
		
		print("Enter Task Description, then hit <ENTER> to submit:")
		descr = sys.stdin.readline()[:-1]

		print("Enter Duration, then hit <ENTER> to submit:")
		dur = sys.stdin.readline()

		print("Enter Min Wait, then hit <ENTER> to submit:")
		min_wait = float(sys.stdin.readline())

		print("Enter Max Wait, then hit <ENTER> to submit:")
		max_wait = float(sys.stdin.readline())

		tn = TaskNode(name = name, descr = descr, time = dur, 
					min_wait = min_wait, max_wait = max_wait)
		tasklist.append(tn)

		print(str(i) + " tasks added. Enter 0 to stop input. Enter 6 to cancel input. Hit enter to continue")
		kk = sys.stdin.readline()
		if len(kk) == 1:
			code = 1
		else:
			code = int(kk)
		if code == 6: 
			return

	ts = TaskSequence(name = ts_name, descr = ts_descr, tasks = tasklist)
	dbmc.add_recipe(ts)
	print("Recipe %s Added", ts_name)
	print("=======================================")
	instr = dbmc.fetch_recipe_v2(ts_name)
	dutils.print_instr(instr)
	print("=======================================")
	print("DBMC CONTENTS:")
	print(dbmc.list_recipes())
	print("=======================================")
if __name__=="__main__":
	main(sys.argv)