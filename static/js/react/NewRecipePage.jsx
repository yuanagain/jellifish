/*
A NewRecipePage provides the interface for inputting new recipes into
the database.
*/

var React = require("react"),
	ReactBootstrap = require("react-bootstrap"),
	Row = ReactBootstrap.Row,
	Col = ReactBootstrap.Col,
	Grid = ReactBootstrap.Grid,
	utils = require("../lib/utils.js");

// React components
var Content = require("./Content.jsx"),
	SectionHeaderButton = require("./SectionHeaderButton.jsx"),
	InputRow = require('./InputRow.jsx'),
	FullRow = require('./FullRow.jsx'),
	StepInput = require("./StepInput.jsx");

class NewRecipePage extends React.Component {
	/*
	Create a new NewRecipePage

	Parameters
		Object props - properties for component
	*/
	constructor(props) {
		super(props);
		this.state = {
			totalTime: 0, // total time for the tasks
			tasks: new Array(), // all tasks
			};

		this._elems = new Object();

		// Bind functions to instance
		this._addStep = this._addStep.bind(this);
		}

	render() {
		// Render the component
		return (
			<Content><Grid fluid className="center-horizontal">
				<SectionHeaderButton header="New Recipe" button="Save" type="submit" data-parse-id="button-new-recipe" />

				<InputRow label="Name" name="name"
					rowClass="padding-vertical" inputClass="width-full" />
				<FullRow><span>Description</span></FullRow>
				<InputRow label="" name="description" labelSize={0}
					rowClass="padding-vertical" inputClass="width-full"/>

				<hr />
				<FullRow>
					<h3>Steps</h3>
				</FullRow>

				<input type="hidden" name="tasks" value={JSON.stringify(this.state.tasks)} />

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

				<hr />
				<FullRow className="center-horizontal padding-vertical">
					<ReactBootstrap.Button
						bsStyle="primary"
						onClick={this._addStep}
						type="button"
						data-parse-id="button-new-recipe-add-step">
					Add Step
					</ReactBootstrap.Button>
				</FullRow>

				<div id="tasks">
					{this.state.tasks.map(function(task, index) {
						/*
						Render each task

						Parameters
							Object task - task to display
								String name - name
								String descr - description
								int time - time (in seconds)
								int min_wait - min wait time (in seconds)
								int max_wait - max wait time (in seconds)
							int index - current task number

						Returns
							(HTMLElement) rendered component
						*/
						return (<StepInput
							name={task.name}
							description={task.descr}
							time={task.time}
							min_wait={task.min_wait}
							max_wait={task.max_wait}
							number={index + 1}
							key={"new-task-" + Math.random()}
							/>);
						})}
				</div>
			</Grid></Content>
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

		this.setState({
			tasks: this.state.tasks.concat([newTask]),
			totalTime: this.state.totalTime + newTask.time
			});
		}
	}

module.exports = NewRecipePage;
