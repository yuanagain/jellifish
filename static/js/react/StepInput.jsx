/*
A StepInput component shows a step, specifically on the NewRecipePage.

Required Props
	String name - name of the step
	String description - description of the step
	int time - amount of time (in seconds) the step takes
	int number - step number
*/

var React = require("react"),
	ReactBootstrap = require("react-bootstrap"),
	Row = ReactBootstrap.Row,
	Col = ReactBootstrap.Col;

// React components
var FullRow = require("./FullRow.jsx");

function StepInput(props) {
	// Render the StepInput
	return (
		<div id={"step-" + props.number}>
			<Row>
				<Col md={6}><span>{props.number}.</span></Col>
				<Col md={6}><span>{props.name}</span></Col>
			</Row>
			<FullRow><span>{props.description}</span></FullRow>
			<Row>
				<Col md={4} xs={12}>
					<Row className="center-horizontal"><span>Time</span></Row>
					<Row className="center-horizontal padding-vertical"><span>{props.time}</span></Row>
				</Col>
				<Col md={4} xs={12}>
					<Row className="center-horizontal"><span>Min. Wait</span></Row>
					<Row className="center-horizontal padding-vertical"><span>{props.min_wait}</span></Row>
				</Col>
				<Col md={4} xs={12}>
					<Row className="center-horizontal"><span>Max. Wait</span></Row>
					<Row className="center-horizontal padding-vertical"><span>{props.max_wait}</span></Row>
				</Col>
			</Row>
			<hr />
		</div>
		);
	}

module.exports = StepInput;
