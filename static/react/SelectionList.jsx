/*
A SelectionList essentially holds a list of selections, with a given type
(radio or checkbox).

Required Props:

	name: String // input name for form (HTML:form attribute)
	type: String // type of input (either "radio" or "checkbox")
	selections: [String, ...] // list of selection options
*/

class SelectionList extends React.Component {
	render() {
		var props = this.props;
		return (
			<ul>
				{this.props.selections.map(function(item) {
					var input_id = props.name + Math.ceil(Math.random() * 100000);
					return (
						<div>
							<ReactBootstrap.Input type={props.type} name={props.name} value={item} className = "radio-select" id={input_id} />
							<label htmlFor={input_id} className="input-label">{item}</label>
						</div>
						);
					})}
			</ul>
			);
		}
	}
