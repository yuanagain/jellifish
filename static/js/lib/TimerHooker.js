/*
The TimerHooker class allows you to add hooks to passing time.

Author: Rushy Panchal
Project: jellifish
*/

class TimerHooker {
	constructor() {
		// Create a timer that counts seconds passed
		this.elapsed = 0;
		this.interval = null;
		this.hooks = {};
		this.hooks[-1] = {};

		this.progress = this.progress.bind(this);
		}

	/*
	Subscribe a callback to each second passing

	Arguments
		function callback - the callback to register
		hashable id (optional) - a ID for the callback (randomly generated
			if not provided)

	Callback Parameters
		int second - the number of seconds that have elapsed since the timer
			was started

	Returns
		(hashable) the ID corresponding to the given callback

	Examples
		// Register callback to output every second
		var id = timer.each(function(second) {
			console.log(second)
			});

		// Create a callback with a custom identifier
		timer.each(my_custom_callback, "custom_callback_id");
	*/
	each(callback, id) {
		var id = (id == undefined) ? Math.random(): id;
		this.hooks[-1][id] = callback;

		return id;
		}

	/*
	Add a callback that is called once when a specific elapsed time is reached

	Arguments
		int second - the elapsed time (in seconds) for when the callback
			should be called (a second value less than 0 renders this moot)
		function callback - function to be called at the given time

	Callback Parameters
		int second - the number of seconds that have elapsed since the timer
			was started

	Examples
		// Add a callback at t = 10
		timer.once(10, function(second) {
			console.log(second); // will output 10
			})

		// Add a callback that will never be called (no reason to do this)
		timer.once(-5, function(second) {
			console.log("This is impossible.");
			})
	*/
	once(second, callback) {
		if (second < 0) return; // irrelevant hook, t < 0
		if (this.hooks.hasOwnProperty(second)) this.hooks[second].push(callback);
		else this.hooks[second] = [callback];
		}

	/*
	Returns whether or not the timer is currently running

	Returns
		(bool) whether or not the timer is running at the moment

	Examples
		// Two different actions based on whether or not the timer is running
		if (timer.isRunning()) {
			console.log("Timer is running");
			}
		else {
			console.log("Timer is not running");
			}
	*/
	isRunning() {
		return this.interval != null;
		}

	/*
	Progress the timer one second

	Examples
		timer.progress();
	*/
	progress() {
		// should only run if there are hooks for the current second
		if (this.hooks.hasOwnProperty(this.elapsed)) {
			// call each hook for each second
			for (var i = 0; i < this.hooks[this.elapsed].length; i++) {
				this.hooks[this.elapsed][i](this.elapsed);
				}
			// the time has passed and so this memory can be freed
			delete this.hooks[this.elapsed];
			}
		// call the hooks for each second
		for (var key in this.hooks[-1]) {
			this.hooks[-1][key](this.elapsed);
			}
		this.elapsed++;
		}

	/*
	Start the timer if it is not currently running

	Returns
		(bool) whether or not the timer was started
			This is equivalent to calling isRunning() before start()

	Examples
		// Start the timer
		timer.start();
	*/
	start() {
		if (! this.isRunning()) {
			var timer = this;
			this.interval = setInterval(this.progress, 1000);
			return true;
			}
		return false;
		}

	/*
	Stop the timer if it is currently running

	Returns
		(bool) whether or not the timer was stopped
			This is equivalent to calling isRunning() before stop()

	Examples
		// Stop the timer
		timer.stop();
	*/
	stop() {
		if (this.isRunning()) {
			clearInterval(this.interval);
			this.interval = null;
			return true;
			}
		return false;
		}
	}	

module.exports = TimerHooker;
