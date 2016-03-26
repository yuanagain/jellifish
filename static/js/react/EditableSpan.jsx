/*
An EditableSpan provides the option to turn a span into an input, depending
on its state. Thus, it can be edited easily.

Optional Props
	Boolean editable - whether or not span should be editable
	String type - type of input
*/

var React = require("react");

/*
Creates a new EditableSpan

Parameters
	Object props - component properties
*/
function EditableSpan(props) {
	if (props.editable) {
		return (<input {...props}></input>);
		}
	else {
		return (<span {...props}>{props.defaultValue}</span>);
		}
	}

module.exports = EditableSpan;
