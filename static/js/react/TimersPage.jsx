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
		}

	render() {
		// Render the component
		return (
			<Content><Grid fluid>
				<SectionHeaderButton header="Jelli.fish" button="Start" onClick={this._startTimers} />
				<br/>
				<Row>
					<Col md={6} xs={12} className="center-horizontal display-height">
						<FullRow><header>Active Task</header></FullRow>
						<br/>
						<FullRow><Timer ref="timer_active" strokeColor="red" /></FullRow>
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
		}

	componentDidMount() {
		// Hook right after component mounts
		// filter all timer_ references
		var all_tasks = Object.keys(this.refs).filter((key) => key.match(/timer_\w+/)),
			comp = this;	
		var globalTimer = new TimerHooker();
		globalTimer.each(function(elapsed) {
			// progress each individual timer
			for (var i = 0; i < all_tasks.length; i++) {
				comp.refs[all_tasks[i]].step(elapsed);
				}
			});

		this.setState({
			timer: globalTimer
			});
		}

	componentWillUnmount() {
		// Hook right before component unmounts
		var timer = this.state.timer;
		if (timer != null) timer.stop();
		this.setState({"timer": null}); // deference the timer
		}
	}

module.exports = TimersPage;
