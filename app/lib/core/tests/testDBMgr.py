"""
Tests key functionalities of DBMgr
Author: Yuan Wang
Copyright Jellifish 2015
"""

import DBMgr as utils
import sys
import os
from TaskSequence import TaskNode, TaskSequence

db_fname_default = "test.db"

def main(argv):
    n = 4
    db_fname = db_fname_default
    if len(argv) > 1:
        if len(argv) > 2:
            db_fname = argv[2]
        if argv[1] == "clean":
            os.system("rm -rf " + db_fname)
            
    dbu = utils.DBMgr(db_fname)
    for i in range(n):
        task_data = dict()
        task_data["name"] = "task_" + str(i)
        task_data["time"] = str((i % 3) * 2.5)
        
        dbu.add_task_v2(task_data)

    dbu.print_dump()

    tn_1 = TaskNode(name = "tn1", time = 10.0, min_wait = 10.0, max_wait = 20.0)
    tn_2 = TaskNode(name = "tn2", time = 10.0, min_wait = 0.0, max_wait = 20.0)
    tn_3 = TaskNode(name = "tn3", time = 10.0, min_wait = 20.0, max_wait = 20.0)

    tn_4 = TaskNode(name = "tn4", time = 10.0, min_wait = 10.0, max_wait = 20.0)
    tn_5 = TaskNode(name = "tn5", time = 10.0, min_wait = 0.0, max_wait = 20.0)
    tn_6 = TaskNode(name = "tn6", time = 10.0, min_wait = 20.0, max_wait = 20.0)
    
    print("=======================================")
    print("CREATING TASK SEQUENCES")
    print("=======================================")
    ts_1 = TaskSequence(name = "seq_1", tasks = [tn_1, tn_2, tn_3])
    ts_1.print_dump()

    ts_2 = TaskSequence(name = "seq_2", tasks = [tn_4, tn_5, tn_6])
    ts_2.print_dump()

    print("=======================================")
    print("STORING TASK SEQUENCES")
    print("=======================================")
    dbu.add_seq_v1(ts_1)
    dbu.add_seq_v1(ts_2)

    dbu.print_dump()

    print("=======================================")
    print("LOADING AND RECOVERING TASK SEQUENCES")
    print("=======================================")
    ts_1a = dbu.load_seq_v1("seq_1")
    ts_2a = dbu.load_seq_v1("seq_2")

    ts_1a.print_dump()
    ts_2a.print_dump()    

    print("=======================================")
    print("DONE")
    print("=======================================")

    
if __name__ == "__main__":
    main(sys.argv)