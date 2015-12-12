
#boolean defining type of ingredient
basic = True;
compound = False;

'''
class Ingredient

fields : name (string)
		 type (boolean)
		 operator (object)
		 operands (list of objects)

initializer : name_in (string describing task)
			  operator_in (object) (optional)
			  operands_in (list of objects) (optional)

notes : operands_in will ALWAYS be in the order that they
		are input

'''

class Ingredient:
	def __init__(self, name_in, operator_in = None, \
				  operands_in = None):
		self.name = name_in
		#Overload 
		if (operator_in is None or operands_in is None):
			self.type = basic
		else:
			self.type = compound
			self.operator = operator_in
			self.operands = operands_in

'''
class Operator

fields : name (string)
		 type (boolean)
		 operator (object)
		 operands (list of objects)

initializer : name_in (string)
			  front_end_name (string)
			  operator_in (object) (optional)
			  operands_in (list of objects) (optional)

notes : operands_in will ALWAYS be in the order that they
		are input

'''

class Operator:
	def __init__(self, name_in):
		self.name = name_in

#Testing
def main():
	print('\n')
	print('Welcome to the Recipe Database Generator')
	print('\n')
	print('Enumerate Basic Ingredients')
	print('\n')
	ing_list = []
	end_loop = False
	while (end_loop == False):
		ing_name = input('Provide an ingredient or "stop" when done) : ')
		if (ing_name != 'stop'):
			ing = Ingredient(ing_name)
			ing_list.append(ing)
			print
		else:
			end_loop = True

	print('\n')
	print('Create compound Ingredients by processing basic ones')
	print('\n')

	#TODO make method or something to print list of available
	#operators

	end_loop = False
	while (end_loop == False):
		print('\n')
		print('New Instruction')
		print('\n')
		operator_name = input('Select an Operator or "stop" when done : ')
		
		if (operator_name == 'stop'):
			print
			end_loop = True

		#TODO check thru list of available operators
		elif (operator_name != 'put' and operator_name != 'chop'):
			print('Please Enter a Valid Operator!')
		else:#(operator_name != 'stop'):
			#TODO Implement range of operands for each operator
			operator = Operator(operator_name)
			operand_list = []
			for i in range(0,2):
				# TODO Efficiency may matter here. If we have lots of operands
				#hashing may be worthwhile
				operand_not_found = True
				while (operand_not_found):
					operand_name = input('Select Operand ' + str(i) + " : ")
					for j in ing_list:
						if (operand_name == j.name):
							print ('Match') 
							operand = Ingredient(operand_name)
							operand_list.append(operand)
							operand_not_found = False
							break
					if (operand_not_found):
						#Print list of available operands (existing ingredients)
						print ('Please Enter a Valid Operand!')
			ing_name = input('Describe what just happened : ')
			ing = Ingredient(ing_name, operator_name, operand_list)
			ing_list.append(ing)

	print('\n')
	print('List of Ingredients/Processes')
	print('\n')

	for i in ing_list:
		print (i.name)
		#print (i.operator.name)
		#for j in i.operands:
		#	print (j.name)
		#print('\n')
	
if __name__ == '__main__':
    main()