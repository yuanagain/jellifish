/*
A TimersPage provides the interface for the timers page.

Required Props:

	data: Object =
		{
			"recipes": [String, ...], // list of recipes
			"active": [Task, ...], // active tasks
			"passive": [Task, ...] // passive tasks
		}.

Implicit data types used by props:

	Task: Object, =
		{
		"name": String, // (short) name of the task
		"description": String, // human-readable description of task
		"start_time": double, // time that the task should start
		"duration": double // duration of the task
		}.
*/

var React = require("react"),
	ReactBootstrap = require("react-bootstrap"),
	Row = ReactBootstrap.Row,
	Col = ReactBootstrap.Col,
	Grid = ReactBootstrap.Grid;

// React components
var Content = require("./Content.jsx"),
	SectionHeaderButton = require("./SectionHeaderButton.jsx");

class TimersPage extends React.Component {
	render() {
		return (
			<Content><Grid fluid>
				<SectionHeaderButton header="Jelli.fish" button="Start" onClick="" />
				<Row>
					<Col md={6} className="center-horizontal">
						<header>Active Task</header>
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
	}

module.exports = TimersPage;
