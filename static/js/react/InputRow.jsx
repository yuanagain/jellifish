/*
An InputRow provides a wrapper around a text label and an input element.

Required Props
	String label - label to display on the input
	String name - name to attach to input
	String id - id of the input (defaults to name)

Optional Props
	String type - type of input (default: 'text')
	Function onClick - function for when input is clicked
	int labelSize - grid size of label (1 - 12) (default: 6)
	String rowClass - classes for row
	String labelClass - classes for label
	String inputClass - classes for span
*/

var React = require("react"),
	ReactBootstrap = require("react-bootstrap"),
	Row = ReactBootstrap.Row,
	Col = ReactBootstrap.Col;

function InputRow(props) {
	// Render the InputRow
	return (
		<Row className={props.rowClass}>
			<Col md={props.labelSize || 6} xs={12} className="center-horizontal">
				<span className={props.labelClass}>{props.label}</span>
			</Col>
			<Col md={(12 - props.labelSize) || 6} xs={12} className="center-horizontal">
				<input
					type={props.type || "text"}
					name={props.name}
					id={props.id || props.name}
					className={props.inputClass}
					onClick={props.onClick}
				/>
			</Col>
		</Row>
		);
	}

module.exports = InputRow;
