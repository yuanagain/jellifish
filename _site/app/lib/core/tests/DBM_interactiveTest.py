from DBMClient import DBMClient
import sys
import DataUtils as dutils


def main(argv):
	if len(argv) < 2:
		print("Usage: python DBM_interactiveTest.py <database filename>")
		return
	dbmc = DBMClient(argv[1])

	i = 0
	code = 1
	rlist = []
	while (code != 0):
		print("Available Recipes:")
		print(dbmc.list_recipes())
		print("Enter recipe name " + str(i) + ":")
		rlist.append(sys.stdin.readline()[:-1])
		i += 1

		print(str(i) + " recipes added. Enter 0 to stop input. Enter 6 to cancel input. Hit enter to continue")
		kk = sys.stdin.readline()
		if len(kk) == 1:
			code = 1
		else:
			code = int(kk)
		if code == 6: 
			return
			
	instr2 = dbmc.fetch_recipes_greedy(rlist)
	dutils.print_instr(instr2)

if __name__=="__main__":
	main(sys.argv)