import DBMClient
import TaskSequence

def main():
	client = DBMClient.DBMClient("tigerlaunch.db")
	client.fetch_recipe("ramen").print_dump()
	print("------------------------------------------")
	client.fetch_recipe("chicken tacos").print_dump()
	print("------------------------------------------")
	client.fetch_recipe("roasted root vegetables with couscous").print_dump()
	print("------------------------------------------")

if __name__ == '__main__':
    main()