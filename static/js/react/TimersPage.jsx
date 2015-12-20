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
	FullRow = require("./FullRow.jsx");

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
			timer: null, // global timer
			activePointer: 0, // pointer to current active task
			passivePointer: 0, // pointer to current passive task
			};

		this._startTimers = this._startTimers.bind(this);
		this._updateActive = this._updateActive.bind(this);
		this._updateUpcoming = this._updateUpcoming.bind(this);
		}

	render() {
		// Render the component
		return (
			<Content><Grid fluid>
				<SectionHeaderButton header="Jelli.fish" button="Start" onClick={this._startTimers} ref="button_header" />
				<br/>
				<Row>
					<Col md={6} xs={12} className="center-horizontal display-height">
						<FullRow><header>Active Task</header></FullRow>
						<br/>
						<FullRow><Timer ref="timer_active" strokeColor="red" strokeWidth={1} /></FullRow>
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
						<FullRow>
							<Timer ref="timer_passive1"></Timer>
						</FullRow>
						<FullRow>
							<Timer ref="timer_passive2"></Timer>
						</FullRow>
						<FullRow>
							<Timer ref="timer_passive3"></Timer>
						</FullRow>
					</Col>
				</Row>
			</Grid></Content>
			);
		}

	/*
	Start the timers
	*/
	_startTimers() {
		this.state.timer.start();
		this.refs.button_header.changeButtonState();
		}

	componentDidMount() {
		// Hook right after component mounts
		// filter the primary + passive timer references from this.refs
		var all_tasks = Object.keys(this.refs).filter((key) => key.match(/timer_(active|passive)\d*/)),
			component = this;

		var globalTimer = new TimerHooker();
		globalTimer.each(function(elapsed) {
			// progress each individual timer
			for (var i = 0; i < all_tasks.length; i++) {
				component.refs[all_tasks[i]].step(elapsed);
				}
			});
		globalTimer.once(0, this._updateActive);

		this.setState({
			timer: globalTimer // keep a reference to the timer in the state
			});
		}

	componentWillUnmount() {
		// Hook right before component unmounts
		var timer = this.state.timer;
		if (timer != null) timer.stop();
		this.setState({"timer": null}); // deference the timer
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

		timer_active.reset(task.name, task.start_time, task.duration);
		this._updateUpcoming()

		this.state.timer.once(task.end_time + 1, function() {
			pointer++;
			// propagate change through the state
			comp.setState({activePointer: pointer});

			// no more tasks, so remove from the interface
			if (pointer < activeData.length) {
				comp._updateActive();
				}
			else {
				timer_active.remove();
				}
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
	}

module.exports = TimersPage;
