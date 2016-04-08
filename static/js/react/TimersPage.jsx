/*
A TimersPage provides the interface for the timers page.

Required Props
	[String, ...] recipes - list of recipes used
	[Task, ...] active - active tasks to display

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

	Parameters
		Object props - properties for component
	*/
	constructor(props) {
		super(props);
		this.state = {
			activePointer: 0, // pointer to current active task
			activeTimer: new TimerHooker(), // timer for active tasks

			started: false, // whether or not the app has been started
			paused: false, // whether or not app is paused
			};
		/* the timers are decoupled so that pauses and skips can be handled
		separately */

		// bind various functions to the "this" instance
		this._updateActive = this._updateActive.bind(this);
		this._updateUpcoming = this._updateUpcoming.bind(this);

		// bind the buttons to the "this" instance
		this._startTimers = this._startTimers.bind(this);
		this._pauseActiveTimer = this._pauseActiveTimer.bind(this);
		this._skipCurrentTask = this._skipCurrentTask.bind(this);
		}

	render() {
		// Render the component
		var iconOptions = {};
		if (! this.state.started) iconOptions.disabled = "disabled";

		return (
			<Content><Grid fluid>
				<SectionHeaderButton header="Jelli.fish" button="Start" onClick={this._startTimers} ref="button_header" data-parse-id="button-timers-start" />
				<br/>
				<CollapsibleList list={this.props.recipes} header="Recipes" data-parse-id="button-timers-view-recipes" />
				<br/>
				<Row>
					<Col md={8} xs={12} className="center-horizontal display-height">
						<FullRow><header>Active Task</header></FullRow>
						<br/>
						<FullRow className="timer primary"><Timer ref="timer_active" primary /></FullRow>
						<br/>
						<Row>
							<Col xs={6}>
								<i {...iconOptions} onClick={this._pauseActiveTimer}
								className={"clickable-icon ionicons ion-ios-" + (this.state.paused ? "play": "pause")}
								data-parse-id="button-timers-pause"></i>
							</Col>
							<Col xs={6}>
								<i {...iconOptions} onClick={this._skipCurrentTask}
								className="ionicons ion-ios-skipforward clickable-icon"
								data-parse-id="button-timers-skip"></i>
							</Col>
						</Row>
						<br/>
					</Col>
					<Col md={4} xs={12} className="center-horizontal display-height secondary">
						<Row>
							<Col xs={12} className="timer secondary"><header>Upcoming Tasks</header></Col>
						</Row>
						<br/>
						<Row>
							<Col xs={12} className="timer secondary"><Timer ref="timer_upcoming1" /></Col>
						</Row>
						<Row>
							<Col xs={12} className="timer secondary"><Timer ref="timer_upcoming2" /></Col>
						</Row>
						<Row>
							<Col xs={12} className="timer secondary"><Timer ref="timer_upcoming3" /></Col>
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
		}

	componentWillUnmount() {
		// Hook right before component unmounts
		if (this.state.activeTimer != null) this.state.activeTimer.stop();

		// dereference the timers
		this.setState({activeTimer: null});
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
		timer_active.reset(task.name, task.descr, task.start, task.time);
		this._updateUpcoming()

		this.state.activeTimer.once(task.end, function() {
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
				ref.reset(task.name, task.descr, task.start, task.time);
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
		if (this.state.activeTimer && ! this.state.started) {
			this.state.activeTimer.start();
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
		if (! this.state.started) return null;
		var timer = this.state.activeTimer;
		if (timer.isRunning()) {
			timer.stop();
			this.setState({paused: true});
			return false;
			}
		else {
			timer.start();
			this.setState({paused: false});
			return true;
			}
		}

	/*
	Skip the current active task

	Returns
		(int) number of seconds skipped
	*/
	_skipCurrentTask() {
		if (! this.state.started) return 0;
		var currentTask = this.props.active[this.state.activePointer],
			timer = this.state.activeTimer,
			currentState = timer.isRunning();

		var toSkip = currentTask.end - timer.elapsed;
		for (var t = 0; t < toSkip; t++) {
			timer.progress();
			}

		return toSkip;
		}
	}

module.exports = TimersPage;
