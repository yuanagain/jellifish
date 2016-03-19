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
				<Col md={4} xs={6}><span>{props.number}.</span></Col>
				<Col md={4} xs={12}><span>{props.name}</span></Col>
				<Col md={4} xs={6}><span>{props.time}</span></Col>
			</Row>
			<FullRow><span>{props.description}</span></FullRow>
		</div>
		);
	}

module.exports = StepInput;
