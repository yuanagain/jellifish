import sys

class opNode:
    def __init__(self, idx, children, duration,
                 involvement):
        self.idx = idx
        self.cpl = 0
        self.children = []
        self.duration = duration
        self.involvement = involvement
        self.completed = False;
        self.flags = {'completed': "False"} 



    def status(self):
        status = dict()
        status['id'] = self.idx
        status['duration'] = self.duration
        status['involvement'] = self.involvement
        # returns string of names of dependencies instead
        status['childen'] = [d.idx for d in self.children]
        return status

    def display(self):
        print(self.status())

    def add_child(self, child):
        if child not in self.children:
            self.children.append(child)
            return True
        return False

    def set_flag(self, flag, value = True):
        self.flags[flag] = value

    def get_flag(self, flag):
        if flag in self.flags:
            return self.flags[flag]
        else:
            return None
