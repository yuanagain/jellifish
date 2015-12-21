'''
Command line script for recipe Generation

Instructions : 

1. Follow the installation insructions in 
databasecaller.py to get ParsePy, and make
sure to do the line change mentioned there
as well.

2. Run this file (python ingredientNEW.py)
and follow the Instructions to generate a
bunch of tasknodes. These will automatically
be put in the Parse Database. You can then
test a query of the database using tester.py
(Instructions included)

'''

from databasecaller import DatabaseCaller
from TaskNode import TaskNode

#Function takes in s, and determines if it
#is a float (returns True if yes, False if no)
def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False

#Recipe Generation Command Line Interface
def main():

	#Setup
	db_caller = DatabaseCaller()
	print('\n')
	print('Welcome to the Recipe Database Generator')
	print('\n')
	task_list = []
	#recipe_name = input('Give your recipe a name : ')
	end_loop = False
	list_of_operators = db_caller.get_operators()
	
	#Command Line Main Loop
	while (end_loop == False):

		#Begin new tasknode
		print ('Generating new tasknode...')
		valid = False
		while(valid == False):
			begin_anew = input('Continue (y/n)? : ')
			if(begin_anew == 'y' or begin_anew == 'n'):
				valid = True
			else:
				print('Please enter y or n!')
		if(begin_anew == 'n'):
			break

		#Ingredient/Non-ingredient tasknode flag selection
		valid = False
		while(valid == False):
			task_ingredient_flag = input('Enter 1 for ingredient, 0 otherwise : ')
			if (task_ingredient_flag == '0' or task_ingredient_flag == '1'):
				valid = True
			else:
				print('Please enter 0 or 1!') 

		#Ingredient selection (if task_ingredient_flag == 1)
		if (task_ingredient_flag == '1'):
			task_name = str.lower(input('Enter an ingredient : '))
			
			#TaskNode Construction
			task = TaskNode(task_name)
			task.set_flag('ingredient', 'TRUE')
			task.set_flag('active', 'FALSE')
			task_list.append(task)

		#Operator/Operand Selection (if task_ingredient_flag == 0)
		if (task_ingredient_flag == '0'):
			#Operator Selection
			valid = False
			while(valid == False):
				print('available operators:\n')
				for i in list_of_operators:
					print(i.name)
					print
				operator_name = input('Select an Operator : ')
				for k in list_of_operators:
					if (operator_name == k.name):
						operator = k
						valid = True
						break
				if (valid == False):
					print('Please Enter a Valid Operator!')
		
			#Operand Selection
			task_operands = []
			task_operand_names = []
			ctr = 0
			for i in range(0,operator.numOperands):
				valid = False
				while (valid == False):	
					print('available operands:\n')
					for i in task_list:
						print(i.name)
					print
					operand_name = str.lower(input('Choose Operand ' + str(ctr) + ' (MAX ' + \
					                      str(operator.numOperands-1) + ')' + " : "))
					for k in task_list:
						if(operand_name == k.name):
							task_operands.append(k)
							task_operand_names.append(k.name)
							valid = True
							break
					if (valid == False):
						print ('Please enter a valid operand!')
				ctr = ctr + 1
			
			#Task name provided automatically 
			#task_name = operator.parseStyle(operator, task_operand_names)		
			#print('Task Name Processed as : ' + task_name)
			
			#Task name provided manually
			task_name = str.lower(input('Enter the result : '))
			
			#Provide short and long task descriptioms
			task_short = input('Enter task short description : ')
			task_long = input('Enter long task description : ')

			#Active/Passive Task Flag selection
			valid = False
			while(valid == False):
				task_active_flag = input('Enter 1 for active task, 0 for passive task : ')
				if (task_active_flag == '0' or task_active_flag == '1'):
					valid = True
				else:
					print('Please enter 0 or 1!')

			#Time Selection
			valid = False
			while (valid == False):
				task_time = input('Enter a task time (in seconds): ')
				if (is_number(task_time) == True):
					valid = True
					task_time = float(task_time)
				else:
					print('Please enter a valid number for time!')

			#Tasknode Construction
			task = TaskNode(task_name, task_short,\
	                        task_long, task_time)
			for i in task_operands:
				task.add_dependency(i)			
			if (task_active_flag == '0'):
				task.set_flag('active', 'FALSE')
			if (task_active_flag == '1'):
				task.set_flag('active', 'TRUE')
			task.set_flag('ingredient', 'FALSE')
			task_list.append(task)

	#Review of Tasknodes
	print('\n')
	print('List of TaskNodes')
	print('\n')

	#Input into Database
	for i in task_list:
		print
		i.display()
		print
	db_caller.add_tasknodes(task_list)
	#db_caller.add_recipe(recipe_name, task_list)
	
	#Read back from database
	


	#db_caller.add_recipe(recipe_name, task_list)
		#print (i.operator.name)
		#for j in i.operands:
		#	print (j.name)
		#print('\n')
	
if __name__ == '__main__':
    main()