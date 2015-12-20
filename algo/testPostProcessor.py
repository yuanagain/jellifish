"""
This module tests the funcionality of the PostProcessor module

Usage:
python testPostProcessor.py

See also: PostProcessor.py

Author: Yuan Wang
Copyright Jellifish 2015
"""
import PostProcessor as Pst
import TnodeUtils as TNU

def main():
    active_data = [(0.0, 10.0), (10.0, 20.0), (40.0, 5.0), (50.0, 60.0)]
    passive_data = [(0.0, 0.0), (0.0, 0.0), (10.0, 10.0), (50.0, 80.0)]
    active_list = []
    passive_list = []
    i = 0
    for tup in active_data:
        i += 1
        el = {"start_time": tup[0], "end_time": tup[0] + tup[1],
              "name": "act_" + str(i), "description": "test_data",
              "duration": tup[1]}
        active_list.append(el)
        
    i = 0
    for tup in passive_data:
        i += 1
        el = {"start_time": tup[0], "end_time":tup[0] + tup[1],
              "name": "pas_" + str(i), "description": "test_data",
              "duration": tup[1]}
        passive_list.append(el)

    data = {"active": active_list, "passive": passive_list}    
    print("=========")
    print("Input data")
    print("=========")
    TNU.printTaskData_v2(data)
    
    print("=========")
    print("After post-processing")
    print("=========")
    
    data = Pst.reformat_v1(data)
    TNU.printTaskData(data)
    
if __name__ == "__main__":
    main()
