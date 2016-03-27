/*
A NewStep allows the user to input a new step into the recipe. Used by
NewRecipePage and EditRecipePage.

Required Props
	Function onAdd - callback for when a step is added

Callback Parameters
	onAdd
		Object step - step added
			String name - name of step
			String descr - description of step
			int time - time of step
			int min_wait - minimum wait time for step
			int max_wait - maximum wait time for step
*/

var React = require("react"),
	ReactBootstrap = require("react-bootstrap"),
	Row = ReactBootstrap.Row,
	Col = ReactBootstrap.Col,
	utils = require("../lib/utils.js");

var FullRow = require('./FullRow.jsx'),
	InputRow = require('./InputRow.jsx');

class NewStep extends React.Component {
	/*
	Create a new NewStep.
	*/
	constructor(props) {
		super(props);

		this.state = {};

		this._elems = new Object();

		// Bind functions to instane
		this._addStep = this._addStep.bind(this);
		}

	render() {
		// Render the component
		return (
			<div>
				<FullRow>
					<h3>Steps</h3>
				</FullRow>

				<div id="new-task" className="center-horizontal">
					<InputRow label="Name" id="new-task-name" labelSize={4} 
						rowClass="padding-vertical" inputClass="width-full" />
					<InputRow label="Description" id="new-task-descr" labelSize={4}
						rowClass="padding-vertical" inputClass="width-full" />
					<Row className="padding-vertical">
						<Col md={4} xs={12}>
							<Row className="center-horizontal"><span>Time (s)</span></Row>
							<Row className="center-horizontal padding-vertical">
								<input type="number" id="new-task-time" />
							</Row>
						</Col>
						<Col md={4} xs={12}>
							<Row className="center-horizontal"><span>Min. Wait (s)</span></Row>
							<Row className="center-horizontal padding-vertical">
								<input type="number" id="new-task-min-wait" />
							</Row>
						</Col>
						<Col md={4} xs={12}>
							<Row className="center-horizontal"><span>Max. Wait (s)</span></Row>
							<Row className="center-horizontal padding-vertical">
								<input type="number" id="new-task-max-wait" />
							</Row>
						</Col>
					</Row>
				</div>

				<FullRow className="center-horizontal padding-vertical">
					<ReactBootstrap.Button
						bsStyle="primary"
						onClick={this._addStep}
						type="button"
						data-parse-id="button-new-recipe-add-step">
					Add Step
					</ReactBootstrap.Button>
				</FullRow>
			</div>
			);
		}

	componentDidMount() {
		// Hook right after component mounts
		this._elems.name = utils.getElem("#new-task-name");
		this._elems.descr = utils.getElem("#new-task-descr");
		this._elems.time = utils.getElem("#new-task-time");
		this._elems.min_wait = utils.getElem("#new-task-min-wait");
		this._elems.max_wait = utils.getElem("#new-task-max-wait");
		}

	/*
	Add a step to the recipe.
	*/
	_addStep() {
		var newTask = {
			name: this._elems.name.value,
			descr: this._elems.descr.value,
			time: Number.parseInt(this._elems.time.value),
			min_wait: Number.parseInt(this._elems.min_wait.value),
			max_wait: Number.parseInt(this._elems.max_wait.value)
			};

		this._elems.name.value = "";
		this._elems.descr.value = "";
		this._elems.time.value = 0;
		this._elems.min_wait.value = 0;
		this._elems.max_wait.value = 0;
		
		this.props.onAdd(newTask);
		}
	}

module.exports = NewStep;
