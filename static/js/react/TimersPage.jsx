/*
A TimersPage provides the interface for the timers page.

Required Props
	[String, ...] recipes - list of recipes used
	[Task, ...] active - active tasks to display
	[Task, ...] passive - passive tasks to display

Prop data types
	Object Task =
		{
		"name": String, // (short) name of the task
		"description": String, // human-readable description of task
		"start_time": double, // time that the task should start
		"end_time": double, // time when the task will end
		"duration": double // duration of the task
		}
*/

var React = require("react"),
	ReactBootstrap = require("react-bootstrap"),
	Row = ReactBootstrap.Row,
	Col = ReactBootstrap.Col,
	Grid = ReactBootstrap.Grid;

// React components
var Content = require("./Content.jsx"),
	SectionHeaderButton = require("./SectionHeaderButton.jsx"),
	Timer = require("./Timer.jsx"),
	FullRow = require("./FullRow.jsx");
	CollapsibleList = require("./CollapsibleList.jsx");

// Other dependencies
var TimerHooker = require("../lib/TimerHooker.js");

class TimersPage extends React.Component {
	/*
	Create a new TimersPage

	Arguments
		Object props - properties for component
	*/
	constructor(props) {
		// Create a new TimersPage
		super(props);
		this.state = {
			activePointer: 0, // pointer to current active task
			activeTimer: new TimerHooker(), // timer for active tasks
			passiveTimer: new TimerHooker(), // timer for passive tasks

			started: false, // whether or not the app has been started
			paused: false, // whether or not app is paused
			};
		/* the timers are decoupled so that pauses and skips can be handled
		separately */

		this._updateActive = this._updateActive.bind(this);
		this._updateUpcoming = this._updateUpcoming.bind(this);

		this._startTimers = this._startTimers.bind(this);
		this._pauseActiveTimer = this._pauseActiveTimer.bind(this);
		this._skipCurrentTask = this._skipCurrentTask.bind(this);
		}

	render() {
		// Render the component
		var iconOptions = {}
		if (! this.state.started) iconOptions.disabled = "disabled";

		return (
			<Content><Grid fluid>
				<SectionHeaderButton header="Jelli.fish" button="Start" onClick={this._startTimers} ref="button_header" />
				<br/>
				<CollapsibleList list={this.props.recipes} header="Recipes" />
				<br/>
				<Row>
					<Col md={6} xs={12} className="center-horizontal display-height">
						<FullRow><header>Active Task</header></FullRow>
						<br/>
						<FullRow className="timer primary"><Timer ref="timer_active" primary /></FullRow>
						<br/>
						<Row>
							<Col xs={6}>
								<i {...iconOptions} onClick={this._pauseActiveTimer}
								className={"clickable-icon ionicons ion-ios-" + (this.state.paused ? "play": "pause")}></i>
							</Col>
							<Col xs={6}>
								<i {...iconOptions} onClick={this._skipCurrentTask}
								className="ionicons ion-ios-skipforward clickable-icon"></i>
							</Col>
						</Row>
						<br/>
					</Col>
					<Col md={6} xs={12} className="center-horizontal display-height secondary">
						<Row>
							<Col xs={6} className="timer secondary"><header>Upcoming Tasks</header></Col>
							<Col xs={6} className="timer secondary"><header>Background Tasks</header></Col>
						</Row>
						<br/>
						<Row>
							<Col xs={6} className="timer secondary"><Timer ref="timer_upcoming1" /></Col>
							<Col xs={6} className="timer secondary"><Timer ref="timer_passive1" /></Col>
						</Row>
						<Row>
							<Col xs={6} className="timer secondary"><Timer ref="timer_upcoming2" /></Col>
							<Col xs={6} className="timer secondary"><Timer ref="timer_passive2" /></Col>
						</Row>
						<Row>
							<Col xs={6} className="timer secondary"><Timer ref="timer_upcoming3" /></Col>
							<Col xs={6} className="timer secondary"><Timer ref="timer_passive3" /></Col>
						</Row>
					</Col>
				</Row>
			</Grid></Content>
			);
		}

	componentDidMount() {
		// Hook right after component mounts
		var comp = this; // reference to component

		this.state.activeTimer.each(function(elapsed) {
			// only one active timer to progress (the primary)
			comp.refs.timer_active.step(elapsed);
			});
		this.state.activeTimer.once(0, this._updateActive);

		// Prepare passive tasks on queue
		var passiveTimer = this.state.passiveTimer;

		for (var i = 0; i < this.props.passive.length; i++) {
			var passiveTask = this.props.passive[i];
			passiveTask.available = false;

			(function(index, task) {
				passiveTimer.once(passiveTask.start_time, function() {
					// can now display the item and so, update tasks as well
					task.available = true;
					comp._updatePassive();
					});
				passiveTimer.once(passiveTask.end_time + 1, function() {
					task.available = false;
					comp._updatePassive();
					});
				})(i, passiveTask);
			}

		passiveTimer.each(function(elapsed) {
			for (var i = 1; i <= 3; i++) comp.refs["timer_passive" + i].step(elapsed);
			});
		}

	componentWillUnmount() {
		// Hook right before component unmounts
		if (this.state.activeTimer != null) this.state.activeTimer.stop();
		if (this.state.passiveTimer != null) this.state.passiveTimer.stop();

		// dereference the timers
		this.setState({activeTimer: null, passiveTimer: null});
		}
	
	/*
	Update all of the passive tasks
	*/
	_updatePassive() {
		// Find the tasks that can be displayed and sort by time remaining
		var to_display = this.props.passive.filter(x => x.available);
		to_display.sort((a, b) => (a.end_time > b.end_time));
		
		/* We do not want to iterate over all of the display-able items, only
		the top 3 (or all if there are fewer than 3) */
		for (var index = 0; index < Math.min(to_display.length, 3); index++) {
			var task = to_display[index],
				newProgress = 1;
			/* This condition is true if the task is currently being displayed, but
			perhaps in another position. So, we want to make sure wherever iti is
			rendered next, it starts at the correct progress value. */
			if (task.ref != null && task.ref != undefined) {
				newProgress = this.refs[task.ref].getProgress();
				}
			// Triggers above condition in next call of _updatePassive
			task.ref = "timer_passive" + (index + 1);

			// Set the timer's display to the new task's data
			this.refs[task.ref].reset(
				task.name, task.description,
				task.start_time, task.duration, newProgress);
			}

		/* Cleanup all unused timer displays. The +1 is mandatory, otherwise the
		current timer is erroneously removed*/
		for (var j = to_display.length + 1; j <= 3; j++) {
			this.refs["timer_passive" + j].remove();
			}
		}

	/*
	Update all active tasks
	*/
	_updateActive() {
		var pointer = this.state.activePointer,
			activeData = this.props.active,
			task = activeData[pointer],
			timer_active = this.refs.timer_active,
			comp = this;

		// set the new primary task and update the upcoming tasks
		timer_active.reset(task.name, task.description, task.start_time, task.duration);
		this._updateUpcoming()

		this.state.activeTimer.once(task.end_time + 1, function() {
			pointer++;
			// propagate change through the state
			comp.setState({activePointer: pointer});

			// remove from the interface if no more tasks
			if (pointer < activeData.length) comp._updateActive();
			else timer_active.remove();
			});
		}

	/*
	Update the upcoming task queue
	*/
	_updateUpcoming() {
		for (var i = 1; i <= 3; i++) {
			var ref = this.refs["timer_upcoming" + i],
				pointer = this.state.activePointer + i,
				activeData = this.props.active;
			
			// upcoming tasks exist
			if (pointer < activeData.length) {
				var task = activeData[pointer];
				ref.reset(task.name, task.description, task.start_time, task.duration);
				}
			else {
				/* next task does not exist, so destroy the reference and move on
				Note: we do not have to destroy all the other references
				because they can still exist - when they do not exist anymore,
				another call of _updateUpcoming will have destroyed them.

				That is, only one reference should be destroyed per call. */
				ref.remove(true);
				break;
				}
			}
		}

	/*
	Start the timers

	Returns
		(bool) Whether or not the timers started successfully
	*/
	_startTimers() {
		if (this.state.activeTimer && this.state.passiveTimer) {
			this.state.activeTimer.start();
			this.state.passiveTimer.start();
			this.setState({started: true});
			this.refs.button_header.changeButtonState(false);
			return true;
			}
		return false;
		}

	/*
	Pause the current active timer

	Returns
		(bool) Whether or not timer was started (true) or stopped (false)
	*/
	_pauseActiveTimer() {
		if (! this.state.started) return;
		var timer = this.state.activeTimer;
		if (timer.isRunning()) {
			this.setState({paused: true});
			timer.stop();
			return false;
			}
		else {
			this.setState({paused: false});
			timer.start();
			return true;
			}
		}

	/*
	Skip the current active task

	Returns
		(int) number of seconds skipped
	*/
	_skipCurrentTask() {
		if (! this.state.started) return;
		var currentTask = this.props.active[this.state.activePointer],
			timer = this.state.activeTimer,
			currentState = timer.isRunning();

		var toSkip = currentTask.end_time - timer.elapsed;
		for (var t = 0; t <= toSkip; t++) {
			timer.progress();
			}

		return toSkip;
		}
	}

module.exports = TimersPage;
