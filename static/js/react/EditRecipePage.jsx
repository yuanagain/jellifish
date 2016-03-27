/*
An EditRecipePage provides the interface for editing recipes in
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

class EditRecipePage extends React.Component {
	/*
	Create a new EditRecipePage

	Parameters
		Object props - properties for component
	*/
	constructor(props) {
		super(props);
		this.state = {
			tasks: props.recipe.tasks, // all tasks
			updated: false, // whether or not to trigger a new update
			};
		/* The updated state is used to force re-rendering when the tasks
		array is changed, because otherwise a rerender is not performed.*/

		this._elems = new Object();

		// Bind functions to instance
		this._addStep = this._addStep.bind(this);
		this._onEdit = this._onEdit.bind(this);
		}

	render() {
		// Render the component
		var comp = this;

		return (
			<Content><Grid fluid className="center-horizontal">
				<SectionHeaderButton
					header={this.props.recipe.name}
					button="Update"
					type="submit"
					data-parse-id="button-update-recipe" />

				<input type="hidden" name="oldname" value={this.props.recipe.name}></input>

				<InputRow label="Name" name="name"
					rowClass="padding-vertical" inputClass="width-full"
					value={this.props.recipe.name} />
				<FullRow><span>Description</span></FullRow>
				<InputRow label="" name="description" labelSize={0}
					rowClass="padding-vertical" inputClass="width-full"
					value = {this.props.recipe.descr} />

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

				<FullRow className="center-horizontal padding-vertical">
					<ReactBootstrap.Button
						bsStyle="primary"
						onClick={this._addStep}
						type="button"
						data-parse-id="button-new-recipe-add-step">
					Add Step
					</ReactBootstrap.Button>
				</FullRow>

				<hr />

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
						return (<StepInput editable
							name={task.name}
							description={task.descr}
							time={task.time}
							min_wait={task.min_wait}
							max_wait={task.max_wait}
							number={index + 1}
							key={"new-task-" + Math.random()}
							onEdit={(state) => comp._onEdit(state, number)}
							onDelete={() => comp._onDelete(index)}
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

		this.setState({tasks: this.state.tasks.concat([newTask])});
		}

	/*
	Callback for when a step is edited.

	Parameters
		Object task - task to display
			String name - name
			String descr - description
			int time - time (in seconds)
			int min_wait - min wait time (in seconds)
			int max_wait - max wait time (in seconds)
		int index - current task number
	*/
	_onEdit(task, index) {
		this.state.tasks[index] = task;
		this.setState({updated: ! this.state.updated});
		}

	/*
	Callback for when a step is deleted.

	Parameters
		int index - index to delete
	*/
	_onDelete(index) {
		this.state.tasks.splice(index, 1);
		this.setState({updated: ! this.state.updated});
		}
	}

module.exports = EditRecipePage;
