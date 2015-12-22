/*
A SelectionList essentially holds a list of selections, with a given type
(radio or checkbox).

Required Props
	String name - input name for form (HTML:form attribute)
	String type - type of input (either "radio" or "checkbox")
	[String, ...] selections - list of selection options
*/

var React = require("react"),
	ReactBootstrap = require("react-bootstrap");

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
						<ReactBootstrap.Input type={props.type} name={props.name} value={item} className = "radio-select" id={input_id} label={item} />
					</div>
					);
				})}
		</ul>
		);
	}

module.exports = SelectionList;
