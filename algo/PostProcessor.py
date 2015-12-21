"""
This module provides additional ways to extact data 
from CoreEngine processed data

Methods

    Description
    ------
    Adds in idle tasks and end time to task_list dictionary (see output
    from CoreEngine or example in testPostProcessor.py)

    Parameters:
    ------
    task_list : dict
    Dictionary containing active and passive task information

See also: testPostProcessor.py

Author: Yuan Wang
Copyright Jellifish 2015
"""
import TaskNode as TN

def reformat_v1(task_list):
    """
    Description
    ------
    Adds in idle tasks and end time to task_list dictionary (see output
    from CoreEngine or example in testPostProcessor.py)
    
    Parameters:
    ------
    task_list : dict
    Dictionary containing active and passive task information
    """
    # add in end_time info
    for key in task_list:
        for task in task_list[key]:
            task["end_time"] = task["start_time"] + task["duration"]

    occupied_time = 0.0
    # insert idle tasks into new list
    active_list = []
    # fill in idle tasks between active tasks
    for task in task_list["active"]:
        # if next active task starts after known occupied time
        if task["start_time"] > occupied_time:
            dt = task["start_time"] - occupied_time
            active_list.append(create_idle(occupied_time, dt))
        occupied_time = max(task["end_time"], occupied_time)
        active_list.append(task)
            
    task_list["active"] = active_list
    # check if final task requires waiting
    active_end = max([tsk["end_time"] for tsk in task_list["active"]])
    passive_end = max([tsk["end_time"] for tsk in task_list["passive"]])
    if passive_end > active_end:
        task_list["active"].append(create_idle(active_end, passive_end - active_end))
    return task_list
                               
def create_idle(start, dt):
    """
    Creates an idle task dict beginning at time start with duration dt
    """
    return {"start_time": start, "duration": dt, "name": "Wait",
            "description": "Nothing to do at the moment; just relax!",
            "end_time": start + dt}
