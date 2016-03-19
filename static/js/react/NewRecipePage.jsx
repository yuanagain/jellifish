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
			<Content><Grid fluid>
				<SectionHeaderButton header="New Recipe" button="Save" type="submit" data-parse-id="button-new-recipe" />
				<InputRow label="Name" name="name"
					rowClass="padding-vertical" inputClass="width-full" />
				<InputRow label="Description" name="description"
					rowClass="padding-vertical" inputClass="width-full"/>
				<FullRow className="center-horizontal">
					<span>Steps</span>
				</FullRow>
				<input type="hidden" id="data-tasks" name="tasks"
					value={JSON.stringify(this.state.tasks)}/>
				<div id="new-task" className="center-horizontal">
					<InputRow label="Name" id="new-task-name" labelSize={4} 
						rowClass="padding-vertical" inputClass="width-full" />
					<InputRow label="Time" id="new-task-time" labelSize={4}
						rowClass="padding-vertical" inputClass="width-full"
						type="number" />
					<FullRow>
						<span>Description</span>
					</FullRow>
					<InputRow label="" id="new-task-descr" labelSize={0}
						rowClass="padding-vertical" inputClass="width-full" />
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
				<div id="tasks">
					{this.state.tasks.map(function(task, index) {
						/*
						Render each task

						Parameters
							Object task - task to display
								String name - name of task
								String descr - description of task
								int time - time (in seconds) for task
							int index - current task number

						Returns
							(HTMLElement) rendered component
						*/
						return (<StepInput
							name={task.name}
							description={task.descr}
							time={task.time}
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
		this._elems.time = utils.getElem("#new-task-time");
		this._elems.descr = utils.getElem("#new-task-descr");
		this._elems.tasks = utils.getElem("#data-tasks");
		}

	/*
	Add a step to the recipe.
	*/
	_addStep() {
		var newTask = {
			name: this._elems.name.value,
			time: Number.parseInt(this._elems.time.value),
			descr: this._elems.descr.value
			};

		this._elems.name.value = "";
		this._elems.time.value = 0;
		this._elems.descr.value = "";

		this.setState({
			tasks: this.state.tasks.concat([newTask]),
			totalTime: this.state.totalTime + newTask.time
			});
		}
	}

module.exports = NewRecipePage;
