"""
This module provides tools for examining sequences of TaskNodes

Methods

printTasks(tn_list)
    Description
    ------
    Prints start and end times of each task in tn_list

    Parameters
    ------
    tn_list : TaskNode[]

printTaskData(task_data)
    Description
    ------
    Prints data on start and end times of tasks from post_processed
    task lists

    Parameters
    ------
    task_data : dict()
    Output dicionary indicating start and end times of
    active and passive task streams.

printTaskData_v2(task_data)
    Description
    ------
    Prints data on start and end times of tasks

    Parameters
    ------
    task_data : dict()
    Output dicionary indicating start and end times of
    active and passive task streams.


Author: Yuan Wang
Copyright Jellifish 2015
"""
from old import TaskNode as TN

def printTasks(tn_list):
    """
    Description
    ------
    Prints start and end times of each task in tn_list

    Parameters
    ------
    tn_list : TaskNode[]
    """
    print("PRINTING TASK SEQUENCE")
    print("%16s %10s %10s" % ("Name", "Start", "End"))
    for tn in tn_list:
        print("%16s %10d %10d" % (tn.name, tn.start_time,
                                  tn.start_time + tn.time))

def printTaskData(task_data):
    """
    Description
    ------
    Prints data on start and end times of tasks from post_processed
    task lists

    Parameters
    ------
    task_data : dict()
    Output dicionary indicating start and end times of 
    active and passive task streams.
    """
    print("%16s %10s %10s" % ("Name", "Start", "End"))
    for key in task_data:
        print("Task Type: " + key)
        for task in task_data[key]:
            print("%16s %10d %10d" % (task["name"], task["start_time"],
                                      task["end_time"]))
                    

def printTaskData_v2(task_data):
    """
    Description
    ------
    Prints data on start and end times of tasks

    Parameters
    ------
    task_data : dict()
    Output dicionary indicating start and end times of
    active and passive task streams.
    """
    print("%16s %10s %10s" % ("Name", "Start", "End"))
    for key in task_data:
        print("Task Type: " + key)
        for task in task_data[key]:
            print("%16s %10d %10d" % (task["name"], task["start_time"],
                                      task["start_time"] + task["duration"]))
