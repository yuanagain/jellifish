'''
module graphDBMgr

SQLlite database manager for the graph of TaskNodes implementation
of jelli.fish

classes : graphDBMgr, Operator

'''
import marshal
import sqlite3 as lite
import os, sys
from old import TaskNode as TN

# Global Defaults
default_db_fname = "RECIPEDATA_GRAPH.db"

'''
class graphDBMgr

attributes:
    db_fname : the database's name
    connect : the database manager's Connection object

initializer input:
    db_fname : the database's name (if none, Defaults to 
                default_db_fname)

functions:
    initialize(): 
    print_dump():
    add_operator():
    add_operator():
    fetch_operators():
    fetch_taskNode():

'''
class graphDBMgr:
    def __init__(self, db_fname = None):
        if (db_fname is not None):
            self.db_fname = db_fname
            self.connect = lite.connect(db_fname)
            #self.initialize()
        else:
            self.db_fname = default_db_fname
            self.connect = lite.connect(self.db_fname)
            self.initialize()

    def initialize(self):
        """
        Description
        ------
        First time setup
        """
        create_ops = "CREATE TABLE operators(name TEXT, numOperands INTEGER)"
        create_taskNodes = "CREATE TABLE taskNodes(id integer primary key,\
                                  name TEXT, depends BLOB, short_desc TEXT, \
                                  long_desc TEXT, flags BLOB, \
                                  time REAL)"
        #print(create_ops)
        #print(create_taskNodes)
        self.connect.execute(create_ops)
        self.connect.execute(create_taskNodes)
        #self.connect.commit()
        #self.connect.close()

    def print_dump(self):
        """
        Prints contents of database
        """
        with self.connect:
            cur = self.connect.cursor()
            print("OPERATORS")   
            cur.execute('SELECT name, numOperands FROM operators')
            col_names = [cn[0] for cn in cur.description]
            rows = cur.fetchall()
            print(col_names)
            for row in rows:    
                print(row)

            print("TASKNODES")
            cur.execute('SELECT id, name, depends, short_desc, \
                          long_desc, flags, \
                          time FROM taskNodes')
            col_names = [cn[0] for cn in cur.description]
            rows = cur.fetchall()
            print(col_names)
            for row in rows:    
                print(row)

    def add_operator(self, operator):
        """
        Adds an operator to database
        """
        with self.connect:
            cur = self.connect.cursor()
            cur.execute('SELECT name FROM operators WHERE name=:name',\
                         {"name": operator.name})
            data = cur.fetchone()
            if data != None:
                print("This operator is already in the database")
                return
            vals = [operator.name, operator.numOperands]
            cur.execute("INSERT INTO operators VALUES (?,?)", vals)

    def fetch_operators(self):
        '''
        Fetches all operators from the database, returns
        a list of Operator objects
        '''
        with self.connect:
            cur = self.connect.cursor()
            cur.execute('SELECT name, numOperands FROM operators')
            db_operators = cur.fetchall()
            operators = []
            for i in db_operators:
                operators.append(Operator(i[0],i[1]))
        return operators

    def add_taskNode(self,tasknode):
        '''
        Adds a tasknode to the database
        '''
        with self.connect:
            cur = self.connect.cursor()
            cur.execute('SELECT id, name FROM taskNodes WHERE name=:name',\
                         {"name": tasknode.name})
            data = cur.fetchone()
            if data != None:
                #print("This tasknode is already in the database")
                ID = data[0]
            else:        
                list_of_IDs = []
                for depend in tasknode.dependencies:
                    list_of_IDs.append(self.add_taskNode(depend))
                #Serialize the list of IDs
                list_of_IDs = marshal.dumps(list_of_IDs)
                #Serialize the flags
                flags = []
                for flag in tasknode.flags.items():
                    flags.append(flag)
                flags = marshal.dumps(flags)
                vals = [None, tasknode.name, list_of_IDs,\
                        tasknode.short_descr, tasknode.long_descr,\
                        flags, tasknode.time]
                cur.execute("INSERT INTO taskNodes VALUES (?,?,?,?,?,?,?)", vals)
                ID = cur.lastrowid
        return ID

    def fetch_taskNode_byName(self, name):
        '''
        Fetch a taskNode from the database by its name,
        return as an instance of the TaskNode class
        '''
        with self.connect:
            cur = self.connect.cursor()
            cur.execute('SELECT * FROM taskNodes WHERE name=:name',\
                         {"name": name})
            data = cur.fetchone()
            if data == None:
                print("This tasknode is not in the database")
                return None
            else:
                toRet = TN.TaskNode(data[1],data[3], data[4], data[6])
                #Deserialize the flags
                flags = marshal.loads(data[5])
                flagsdict = dict()
                for flag in flags:
                    flagsdict[flag[0]] = flag[1]
                #Deserialize the dependencies
                list_of_IDs = marshal.loads(data[2])
                toRet.flags = flagsdict
                list_of_dependencies = []
                for depend in list_of_IDs:
                    list_of_dependencies.append(self.fetch_taskNode_byID(depend))
                toRet.dependencies = list_of_dependencies
        return toRet

    def fetch_taskNode_byID(self, id):
        '''
        Fetch a taskNode from the database by its ID,
        return as an instance of the TaskNode class
        '''
        with self.connect:
            cur = self.connect.cursor()
            cur.execute('SELECT * FROM taskNodes WHERE id=:id',\
                         {"id": id})
            data = cur.fetchone()
            if data == None:
                print("This tasknode is not in the database")
                return None
            else:
                toRet = TN.TaskNode(data[1],data[3], data[4], data[6])
                #Deserialize the flags
                flags = marshal.loads(data[5])
                flagsdict = dict()
                for flag in flags:
                    flagsdict[flag[0]] = flag[1]        
                #Deserialize the dependencies
                list_of_IDs = marshal.loads(data[2])
                toRet.flags = flagsdict
                list_of_dependencies = []
                for depend in list_of_IDs:
                    list_of_dependencies.append(self.fetch_taskNode_byID(depend))
                toRet.dependencies = list_of_dependencies
        return toRet

'''
class Operator:

stores the name of a cooking Operator (Ex. the string "cut")
and its associated number of operands. A list of operators is
kept in the database and helps guide the
user during the content entry process. 

attributes:
    name : a string describing the name of the operator (Ex. "cut")
    numOperands : an integer of the number of operands that this 
                    operator operates on

initializer input:
    name : a string describing the name of the operator (Ex. "cut")
    numOperands : an integer of the number of operands that this 
                    operator operates on
'''
class Operator:
    def __init__(self, name, numOperands):
        self.name = name
        self.numOperands = numOperands

#Tester Client
def main():
    os.system("rm -rf RECIPEDATA_GRAPH.db")
    
    print('TESTING CONSTRUCTOR:')
    gDBMgr = graphDBMgr()
    
    print('TESTING print_dump')
    gDBMgr.print_dump()
    
    print('ADDING OPERATORS')
    opFluff = Operator('fluff', 1)
    gDBMgr.add_operator(opFluff)
    
    opCover = Operator('cover', 1)
    gDBMgr.add_operator(opCover)
    
    gDBMgr.add_operator(opFluff)

    opRemoveFrom = Operator('remove from',2)
    gDBMgr.add_operator(opRemoveFrom)

    opSetOn = Operator('set on',2)
    gDBMgr.add_operator(opSetOn)

    print('TESTING print_dump')
    gDBMgr.print_dump()

    print ('TESTING fetch_operators')
    for op in gDBMgr.fetch_operators():
        print(op.name + ' ' + str(op.numOperands))
    
if __name__ == "__main__":
    main()