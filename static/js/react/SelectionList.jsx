/*
A SelectionList essentially holds a list of selections, with a given type
(radio or checkbox).

Required Props
	String name - input name for form (input[name] attribute)
	String type - type of input (either "radio" or "checkbox")
	[String, ...] selections - list of selection options

Optional Props
	String data-react-id - base Parse analytics ID for when a selected item is submitted
*/

var React = require("react");

// React components
var SelectionInput = require("./SelectionInput.jsx");

function SelectionList(props) {
	// Render the SelectionList component
	return (
		<ul>
			{props.selections.map(function(item) {
				/* render each selection

				Arguments
					String item - value to display (also set as input value)

				Returns 
					(HTMLElement) rendered component
				*/
				var input_id = props.name + Math.ceil(Math.random() * 100000);
				return (
					<div key={"div-" + input_id}>
						<SelectionInput type={props.type} name={props.name} value={item} label={item}
						data-parse-id={
							(props["data-parse-id"] == undefined || props["data-parse-id"] == null) ? "":
							(props["data-parse-id"] + "-" + item)
						} />
					</div>
					);
				})}
		</ul>
		);
	}

module.exports = SelectionList;
