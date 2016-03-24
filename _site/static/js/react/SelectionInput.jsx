/*
A SelectionInput abstracts a checkbox or radiobutton such that it can be
globally structured and styled with minimal change.

Required Props
	String name - input name for form (input[name] attribute)
	String type - type of input (either "radio" or "checkbox")
	String value - value for the input
	String label - label to display for the input	

Optional Props
	String data-react-id - Parse analytics ID for when the item is submitted, if selected
*/

var React = require("react");

class SelectionInput extends React.Component {
	/*
	Create a new SelectionInput

	Arguments
		Object props - properties for component
	*/
	constructor(props) {
		super(props);
		this.state = {
			checked: false, // whether or not the checkbox is checked
			}
		}

	render() {
		// Render the component
		
		/* The primary reason for providing a literal HTML input[props.type] element
		is to allow for simpler form handling. Rather than managing submitting
		the form manually and obtaining the input from each individual
		SelectionInput, the hidden input provides this functionality by default.

		Then, the appropriate displayed elements are created and styled
		as desired.*/
		return (
			<div className="selection-input">
				<input type={this.props.type} name={this.props.name} value={this.props.value} checked={this.state.checked} data-parse-id={this.props["data-parse-id"]} />
				<i className={"ionicons ion-ios-" + (this.state.checked ? "checkmark" :"circle-outline")}
					onClick={() => this.setState({checked: ! this.state.checked})}></i>
				<span>{this.props.label}</span>
			</div>
			);
		}
	}

module.exports = SelectionInput;
