/*
A StepInput component shows a step, specifically on the NewRecipePage.

Required Props
	String name - name of the step
	String description - description of the step
	int time - amount of time (in seconds) the step takes
	int number - step number

Optional Props
	Boolean editable - whether or not the input is editable
	Function onEdit - callback for when an edit is made and saved
	Function onDelete - callback for when a step is deleted

Callback Parameters
	onEdit
		Object state - current values of step input
	onDelete
			
*/

var React = require("react"),
	ReactBootstrap = require("react-bootstrap"),
	Row = ReactBootstrap.Row,
	Col = ReactBootstrap.Col;

// React components
var FullRow = require("./FullRow.jsx"),
	EditableSpan = require("./EditableSpan.jsx");

class StepInput extends React.Component {
	/*
	Creates a new StepInput.
	*/
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			number: props.number,
			descr: props.description,
			time: props.time,
			min_wait: props.min_wait,
			max_wait: props.max_wait,
			editing: false
			};

		this._data = {
			name: props.name,
			descr: props.description,
			time: props.time,
			min_wait: props.min_wait,
			max_wait: props.max_wait
			};

		this._updateValueState = this._updateValueState.bind(this);
		this._edit = this._edit.bind(this);
		}

	render() {
		// Render the component
		return (
			<div id={"step-" + this.state.number}>
				<Row>
					<Col md={2}><span>{this.state.number}.</span></Col>
					<Col md={3}><span>Name</span></Col>
					<Col md={7}>
						<EditableSpan name="name" editable={this.state.editing} 
							type="text" defaultValue={this.state.name}
							onChange={this._updateValueState} />
					</Col>
				</Row>
				<FullRow className="padding-vertical"><span>Description</span></FullRow>
				<FullRow className="padding-vertical">
					<EditableSpan name="descr" editable={this.state.editing} 
							type="text" defaultValue={this.state.descr}
							onChange={this._updateValueState} />
				</FullRow>
				<Row>
					<Col md={4} xs={12}>
						<Row className="center-horizontal"><span>Time</span></Row>
						<Row className="center-horizontal padding-vertical">
							<EditableSpan name="time" editable={this.state.editing}
								type="number" defaultValue={this.state.time}
								onChange={this._updateValueState} />
						</Row>
					</Col>
					<Col md={4} xs={12}>
						<Row className="center-horizontal"><span>Min. Wait</span></Row>
						<Row className="center-horizontal padding-vertical">
							<EditableSpan name="min_wait" editable={this.state.editing}
								type="number" defaultValue={this.state.min_wait}
								onChange={this._updateValueState} />
						</Row>
					</Col>
					<Col md={4} xs={12}>
						<Row className="center-horizontal"><span>Max. Wait</span></Row>
						<Row className="center-horizontal padding-vertical">
							<EditableSpan name="max_wait" editable={this.state.editing}
								type="number" defaultValue={this.state.max_wait}
								onChange={this._updateValueState} />
						</Row>
					</Col>
				</Row>
				{this.props.editable ?
				(<Row>
					<Col md={6}>
						<ReactBootstrap.Button bsStyle="primary" type="button"
							onClick={this._edit}>
							{this.state.editing ? "Save" : "Edit"}
						</ReactBootstrap.Button>
					</Col>
					<Col md={6}>
						<ReactBootstrap.Button bsStyle="primary" type="button"
							onClick={this.props.onDelete ? this.props.onDelete: null}>
							Delete
						</ReactBootstrap.Button>
					</Col>
				</Row>)
				: null}
				<hr />
			</div>
			);
		}

	_updateValueState(event) {
		var update = {}, value = event.target.value;
		if (event.target.type == "number") value = Number.parseInt(value);
		update[event.target.name] = value;
		this.setState(update);

		this._data[event.target.name] = value;
		}

	/*
	* Called when the edit (or save) button is pressed.
	*/
	_edit() {
		if (this.state.editing && this.props.onEdit)
			this.props.onEdit(this._data);
		this.setState({editing: ! this.state.editing});
		}
	}

module.exports = StepInput;
