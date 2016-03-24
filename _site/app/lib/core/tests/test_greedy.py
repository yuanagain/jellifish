import sys

def main(argv):
    print("TESTING PKGREEDY")
    print("PKGREEDY")
    tn_1 = TaskNode(name = "tn1", time = 10.0, min_wait = 10.0, max_wait = 30.0)
    tn_2 = TaskNode(name = "tn2", time = 20.0, min_wait = 0.0, max_wait = 20.0)
    tn_3 = TaskNode(name = "tn3", time = 30.0, min_wait = 40.0, max_wait = 20.0)

    tn_4 = TaskNode(name = "tn4", time = 10.0, min_wait = 10.0, max_wait = 20.0)
    tn_5 = TaskNode(name = "tn5", time = 10.0, min_wait = 0.0, max_wait = 20.0)
    tn_6 = TaskNode(name = "tn6", time = 10.0, min_wait = 20.0, max_wait = 20.0)

    ts_1 = TaskSequence("ts1", tasks = [tn_1, tn_2, tn_3])
    ts_2 = TaskSequence("ts2", tasks = [tn_4, tn_5, tn_6])

    ov1 = PKGreedy([ts_1, ts_2])
    ct, cs = ov1.fit()
    print(ct)
    dutils.print_instr(cs)

if __name__ == "__main__":
    main(sys.argv)