/*
A TimersPage provides the interface for the timers page.

Required Props
	Object data =
		{
			"recipes": [String, ...], // list of recipes
			"active": [Task, ...], // active tasks
			"passive": [Task, ...] // passive tasks
		}

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
	FullRow = require("./FullRow.jsx"),
	PassiveTaskList = require("./PassiveTaskList.jsx");

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
				<Row>
					<Col md={6} xs={12} className="center-horizontal display-height">
						<FullRow><header>Active Task</header></FullRow>
						<br/>
						<FullRow><Timer ref="timer_active" strokeColor="red" strokeWidth={1} /></FullRow>
						<Row>
							<Col xs={6}>
								<i
								{...iconOptions}
								className={"clickable-icon ionicons ion-ios-" + (this.state.paused ? "play": "pause")}
								onClick={this._pauseActiveTimer}></i>
							</Col>
							<Col xs={6}>
								<i
								{...iconOptions}
								className="ionicons ion-ios-skipforward clickable-icon" 
								onClick={this._skipCurrentTask}></i>
							</Col>
						</Row>
					</Col>
					<Col md={3} xs={6} className="center-horizontal display-height">
						<FullRow><header>Upcoming Tasks</header></FullRow>
						<br/>
						<FullRow>
							<Timer ref="timer_upcoming1"></Timer>
						</FullRow>
						<FullRow>
							<Timer ref="timer_upcoming2"></Timer>
						</FullRow>
						<FullRow>
							<Timer ref="timer_upcoming3"></Timer>
						</FullRow>
					</Col>
					<Col md={3} xs={6} className="center-horizontal display-height">
						<FullRow><header>Background Tasks</header></FullRow>
						<br/>
						<PassiveTaskList
							timer={this.state.passiveTimer}
							data={this.props.data.passive}
							ref="timers_passive"  />
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
		}

	componentWillUnmount() {
		// Hook right before component unmounts
		if (this.state.activeTimer != null) {
			this.state.activeTimer.stop();
			}
		if (this.state.passiveTimer != null) {
			this.state.passiveTimer.stop();
			}

		// dereference the timers
		this.setState({activeTimer: null, passiveTimer: null});
		}
	
	/*
	Update all active tasks
	*/
	_updateActive() {
		var pointer = this.state.activePointer,
			activeData = this.props.data.active,
			task = activeData[pointer],
			timer_active = this.refs.timer_active,
			comp = this;

		// set the new primary task and update the upcoming tasks
		timer_active.reset(task.name, task.start_time, task.duration);
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
				activeData = this.props.data.active;
			
			// upcoming tasks exist
			if (pointer < activeData.length) {
				var task = activeData[pointer];
				ref.reset(task.name, task.start_time, task.duration);
				}
			else {
				/* next task does not exist, so destroy the reference and move on
				Note: we do not have to destroy all the other references
				because they can still exist - when they do not exist anymore,
				another call of _updateUpcoming will have destroyed them.

				That is, only one reference should be destroyed per call. */
				ref.remove();
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
		var currentTask = this.props.data.active[this.state.activePointer],
			timer = this.state.activeTimer,
			currentState = timer.isRunning();
		// timer.stop(); // pause the timer before continuing 
		var toSkip = currentTask.end_time - timer.elapsed;
		for (var t = 0; t <= toSkip; t++) {
			timer.progress();
			}

		// if (currentState) timer.start();
		}
	}

module.exports = TimersPage;
