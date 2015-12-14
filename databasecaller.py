'''
class DatabaseCaller:


initializer : 
	Creates a DatabaseCaller Object by using the APPLICATION_ID and 
		REST_API_KEY to connect to the database

functions:

	add_ingredients: list_of_ingredients (List of Ingredient Objects)

'''

import os, sys
from parse_rest.connection import register, ParseBatcher
# Alias the Object type to make clear is not a normal python Object
from parse_rest.datatypes import Object as ParseObject

class DatabaseCaller:
	def __init__(self):
		APPLICATION_ID = "qfJEdKLsk6oGWYL6CotKWZGSGxpWtGECdUT8IGhX"
		REST_API_KEY = "TmXWGk0CxoPIBeSzqlxf7u2C9V7mlB6sNgRs5eEZ"
		register(APPLICATION_ID, REST_API_KEY)


	def add_ingredients(self, list_of_ingredients):
		for i in list_of_ingredients:
			# TODO change this its too inefficient save a list of all the ingredients and then iterate
			if len(Ingredient.Query.filter(name=i.name)) == 0:
				current_ingredient = Ingredient()
				current_ingredient.name = i.name
				current_ingredient.type = i.type
				if i.type == False:
					current_ingredient.operator = i.operator.name
					temp_list = []
					for j in i.operands:
						temp_list.append(j.name)
					current_ingredient.operands = temp_list
				current_ingredient.save()
			else:
				print("already in Db")

	def get_operators(self):
		list_of_operators = []
		for i in Operator.Query.all():
			list_of_operators.append(i.name)
		return list_of_operators

	def add_recipe(self, recipe):
		if len(Recipe.Query.filter(name = recipe.name)) != 0:
			return
		my_recipe = Recipe()
		my_recipe.name = recipe.name
		my_recipe.ingredients = recipe.ingredients
		my_recipe.save()

	def get_recipe(self, recipe_name):
		return Recipe.Query.filter(name = recipe_name)

class Ingredient(ParseObject):
    pass

class Operator(ParseObject):
    pass

class Recipe(ParseObject):
    pass