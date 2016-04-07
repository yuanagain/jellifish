"""
Test client for client.py

Author: Yuan Wang, Ilya Krasnovsky
Copyright Jellifish 2015
"""

from node import TaskNode, TaskSequence
from client import DatabaseClient as DBMClient

def main():
    print("TESTING METHODS")
    tn_1 = TaskNode(name = "tn1", descr="d1", time = 10.0, min_wait = 10.0, max_wait = 20.0)
    tn_2 = TaskNode(name = "tn2", descr="d2", time = 10.0, min_wait = 0.0, max_wait = 20.0)
    tn_3 = TaskNode(name = "tn3", descr="d3", time = 10.0, min_wait = 20.0, max_wait = 20.0)

    tn_4 = TaskNode(name = "tn4", descr="d4", time = 10.0, min_wait = 10.0, max_wait = 20.0)
    tn_5 = TaskNode(name = "tn5", descr="d5", time = 10.0, min_wait = 0.0, max_wait = 20.0)
    tn_6 = TaskNode(name = "tn6", descr="d6", time = 10.0, min_wait = 20.0, max_wait = 20.0)

    ts_1 = TaskSequence(name = "seq_1", descr="tsd1", tasks = [tn_1, tn_2, tn_3])
    ts_2 = TaskSequence(name = "seq_2", descr="tsd2", tasks = [tn_4, tn_5, tn_6])

    print("TESTING CONSTRUCTOR")
    client = DBMClient(database="postgres",
                       user="postgres",
                       password="jellifishrulez",
                       host="localhost")

    print("\nTESTING add_recipe")
    client.add_recipe(ts_1)
    client.add_recipe(ts_2)

    print("\nTESTING list_recipes")
    print(client.list_recipes())

    print("\nTESTING fetch_recipe")
    client.fetch_recipe("seq_1").print_dump()
    client.fetch_recipe("seq_2").print_dump()

    instr = client.fetch_recipe_by_name("seq_1")
    #dutils.print_instr(instr)

    print("\nTESTING import_recipes")
    tn_7 = TaskNode(name = "tn7", descr="d7", time = 10.0, min_wait = 10.0, max_wait = 20.0)
    tn_8 = TaskNode(name = "tn8", descr="d8", time = 10.0, min_wait = 0.0, max_wait = 20.0)
    tn_9 = TaskNode(name = "tn9", descr="d9", time = 10.0, min_wait = 20.0, max_wait = 20.0)

    tn_10 = TaskNode(name = "tn10", descr="d10", time = 10.0, min_wait = 10.0, max_wait = 20.0)
    tn_11 = TaskNode(name = "tn11", descr="d11", time = 10.0, min_wait = 0.0, max_wait = 20.0)
    tn_12 = TaskNode(name = "tn12", descr="d12", time = 10.0, min_wait = 20.0, max_wait = 20.0)

    ts_3 = TaskSequence(name = "seq_3", descr="tsd3", tasks = [tn_7, tn_8, tn_9])
    ts_4 = TaskSequence(name = "seq_4", descr="tsd4", tasks = [tn_10, tn_11, tn_12])

    client2 = DBMClient(database="postgres",
                       user="postgres",
                       password="jellifishrulez",
                       host="localhost")

    client2.add_recipe(ts_3)
    client2.add_recipe(ts_4)

    client.import_recipes(client2)
    print(client.list_recipes())

    print("\nTESTING multi-fetch")
    instr2 = client.fetch_recipes_greedy(["seq_2", "seq_4", "seq_3", "seq_1"])
    #dutils.print_instr(instr2)

    print("\nTESTS COMPLETED")

if __name__ == "__main__":
    main()