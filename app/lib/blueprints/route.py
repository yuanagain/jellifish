# Rushy Panchal
# app/lib/blueprints/route.py

from flask import Blueprint

class Router(Blueprint):
	'''
	A Router serves as a wrapper around a Flask Blueprint, allowing
	for simpler creation of blueprints that act solely as routers.

	Note: because it is a wrapper, it takes the same parameters, during
	construction, as a flask.Blueprint.
	'''
	def __init__(self, *args, **kwargs):
		super(Router, self).__init__(*args, **kwargs)

		self.addRoutes()

	@classmethod
	def setGlobalData(cls, name, value):
		'''
		Set global data for all routers - this is useful for things such as sharing
		database connections.

		Parameters
			str name - name of the data to store
			value - value to store

		Examples
			Router.setGlobalData("db", 23)
			Router.db # => 23
			ChildClass.db # => 23
		'''
		return setattr(cls, name, value)

	def addRoutes(self):
		'''
		Add routes to the router.

		Method should be overridden by child classes.
		'''
		pass
