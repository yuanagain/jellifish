# Rushy Panchal
# lib/core/auth.py

from flask import session, g, redirect, flash, url_for

from functools import wraps

class AuthenticationManager(object):
	'''
	An AuthenticationManager handles authenticating users. In addition,
	it provides various functions (and wrappers) to easily add authentication
	features to a route function.

	Most of the methods within the class can be overridden in child classes
	to modify the default behavior for various tasks, such as authenticating
	and checking for authentication.

	Parameters
		String authenticate_route - route to redirect to when user is not
			authenticated (defaults to ".login")
		String already_authenticated_route - route to redirect to when user is already
			authenticated (defaults to ".index")
	'''
	def __init__(self, authenticate_route = ".index", already_authenticated_route = ".index"):
		self.authenticate_route = authenticate_route
		self.already_authenticated_route = already_authenticated_route

	def authentication_required(self, function):
		'''
		A function decorator to handle routes that require authentication.
		This should not be called directly. See the examples for usage.

		Parameters
			Function function - function to decorate

		Examples
			auth = AuthenticationManager()

			@app.route("/index")
			@auth.authentication_required
			def index():
				return "<h1>Hello, World!</h1>"
		'''
		@wraps(function)
		def 	decorated(*args, **kwargs):
			# Decorated function for route
			if self.is_authenticated():
				return function(*args, **kwargs)
			else:
				return self.not_authenticated()
		return decorated

	def not_authentication_required(self, function):
		'''
		A function decorator to handle routes that the user cannot be authenticated.
		Acts as a logical complement to @authentication_required.
		This should not be called directly. See the examples for usage.

		Parameters
			Function function - function to decorate

		Examples
			auth = AuthenticationManager()

			@app.route("/login")
			@auth.not_authentication_required
			def login():
				return "<h1>You are not logged in!</h1>"
		'''
		@wraps(function)
		def 	decorated(*args, **kwargs):
			# Decorated function for route
			if not self.is_authenticated():
				return function(*args, **kwargs)
			else:
				return self.already_authenticated()
		return decorated

	def authenticate(self):
		'''
		Authenticate the user for the current request.

		By default, sets session['authenticated'] and g.authenticated to True.

		Note: if overriden, @unauthenticate and @is_authenticated need to be
		changed accordingly.
		'''
		session['authenticated']= True
		g.authenticated = True

	def unauthentiate(self):
		'''
		Unauthenticate the user for the current request. 

		By default, sets session['authenticated'] and g.authenticated to False.

		Note: this should match the data format present in @authenticate.
		'''
		session['authenticated']= False
		g.authenticated = False

	def is_authenticated(self):
		'''
		Check if the user is authenticated or not.

		By default, a user is authenticated if the session['authenticated'] is True,
		or if g.authenticated True.

		Note: this should match the data format present in @authenticate.
		'''
		return session.get('authenticated', False) or getattr(g, 'authenticated', False)

	def not_authenticated(self):
		'''
		Called when user is not authenticated.

		By default, users are redirected to self.authenticate_route.
		'''
		flash("You must be logged in to view this page.")
		return redirect(url_for(self.authenticate_route))

	def already_authenticated(self):
		'''
		Called when user is already authenticated.

		By default, users are redirected to self.already_authenticate_route.
		'''
		flash("You are already logged in!")
		return redirect(url_for(self.already_authenticated_route))
