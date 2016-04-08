# Rushy Panchal
# lib/core/cache.py

import time
import collections

class Cache(dict):
 	'''
 	A Cache that overrides a regular dictionary, but serves the same
 	purpose. However, on a cache miss, a function is called for the return value,
 	if provided.

 	The main reason to use this class, as opposed to a regular dictionary,
 	is so that switching to a different type of cache store (such as memcached
 	or Redis) is easy later on.

 	Parameters
 		<value function(key)> onmiss (optional kwarg) - function to call on
 			cache miss. If not provided, returns None.
 	'''
 	def __init__(self, *args, **kwargs):
 		onmiss = kwargs.pop("onmiss", lambda key: None)
 		super(Cache, self).__init__(*args, **kwargs)
 		self._onmiss = onmiss

 	def __getitem__(self, key):
 		'''
 		Get a value from the cache, same as dict[key].
 		'''
 		try:
 			value = super(Cache, self).__getitem__(key)
 		except KeyError:
 			value = self._onmiss(key)
 		return value

class FixedSizeCache(Cache):
	'''
	A Cache with a fixed size. Once the cache size is exhausted, the oldest
	items are removed.

	Parameters
		int size - maximum size of the cache
		int clear_amount - number of items to clear when cache is exhausted
	'''
	def __init__(self, size, clear_amount, *args, **kwargs):
		super(FixedSizeCache, self).__init__(*args, **kwargs)
		self._inserted_order = collections.deque()
		self._size = size
		self._clear_amount = clear_amount

	def __setitem__(self, key, value):
		if (len(self) == self._size):
			self._cleanup()
		super(FixedSizeCache, self).__setitem__(key, value)
		self._inserted_order.append(key)

	def _cleanup(self):
		'''
		Cleans up the cache, by deleting the last <clear_amount> items.
		'''
		for index in range(self._clear_amount):
			try:
				del self[self._inserted_order.popleft()]
			except IndexError:
				break

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
		self._refresh = refresh if refresh else lambda: None
		if prefetch:
			self.refresh(True)
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
		self.refresh()
		return self._value

	def refresh(self, force = False):
		'''
		Refresh the value, with force if necessary.

		Parameters
			bool force - force the refresh, regardless of time (default: False)
		'''
		currentTime = time.time()
		if force or ((currentTime - self.lastRetrieved) > self.timeout):
			# if the value is stale, refresh the value
			self._value = self._refresh()
			self.lastRetrieved = currentTime

	@value.setter
	def value(self, newValue):
		'''
		Set the new value

		Parameters
			<value> newValue - new value to set to
		'''
		self._value = newValue
