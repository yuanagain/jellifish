# Rushy Panchal
# lib/core/cache.py

import time

class CachedValue(object):
	'''
	A cached value that allows for automated refreshing.

	Parameters
		<value function()> refresh - a function to retrieve the latest value.
			The function should take no parameters and returns the new value.
		int timeout - time before refreshing the value
		bool prefetch - whether or not to fetch the data as soon as the
			CachedValue is initialized.
	'''
	def __init__(self, refresh = None, timeout = 60, prefetch = False):
		self.timeout = timeout
		self.refresh = refresh if refresh else lambda: None
		if prefetch:
			self.lastRetrieved = time.time()
			self._value = self.refresh()
		else:
			self.lastRetrieved = time.time() - (timeout + 1) # ensure that on the first request, the data is retrieved
			self._value = None

	def setValue(self, value, resetTimer = False):
		'''
		Force set the value to a new value
		
		Parameters
			<value> value - new value 
			bool resetTimer - whether or not to reset the timer
		'''
		self._value = value
		if resetTimer:
			self.lastRetrieved = time.time()

	@property
	def value(self):
		'''
		Retrieve the value from cache. Refresh if necessary

		Returns
			<value> last cached value
		'''
		currentTime = time.time()
		if (currentTime - self.lastRetrieved) > self.timeout:
			# if the value is stale, refresh the value
			self._value = self.refresh()
			self.lastRetrieved = currentTime
		return self._value

	@value.setter
	def value(self, newValue):
		'''
		Set the new value

		Parameters
			<value> newValue - new value to set to
		'''
		self._value = newValue
