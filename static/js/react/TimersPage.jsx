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
	Timer = require("./Timer.jsx");

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
			timer: null
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
					<Col md={6} className="center-horizontal">
						<header>Active Task</header>
						<br/>
						<Timer ref="active_timer" />
					</Col>
					<Col md={3} className="center-horizontal">
						<header>Upcoming Tasks</header>
					</Col>
					<Col md={3} className="center-horizontal">
						<header>Background Tasks</header>
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
		var globalTimer = new TimerHooker();
		var active_task = this.refs.active_timer;
		active_task.setState({delta: 60});
		globalTimer.each(function(elapsed) {
			var delta = active_task.state.delta;
			active_task.setState({progress: (delta - elapsed) / delta});
			});
		this.setState({"timer": globalTimer});
		}

	componentWillUnmount() {
		// Hook right before component unmounts
		var timer = this.state.timer;
		if (timer != null) timer.stop();
		this.setState({"timer": null}); // deference the timer
		}
	}

module.exports = TimersPage;
