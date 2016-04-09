/*
An EditRecipePage provides the interface for editing recipes in
the database.

Required Props
	String button - label for button
	String header - header for interface

Optional Props
	Object recipe - contains an object representation of a recipe
		String name - name of the recipe
		String descr - description of the recipe
		[Task, ...] tasks - list of tasks in the recipe
*/

var React = require("react"),
	ReactBootstrap = require("react-bootstrap"),
	Row = ReactBootstrap.Row,
	Col = ReactBootstrap.Col,
	Grid = ReactBootstrap.Grid;

// React components
var Content = require("./Content.jsx"),
	SectionHeaderButton = require("./SectionHeaderButton.jsx"),
	InputRow = require('./InputRow.jsx'),
	FullRow = require('./FullRow.jsx'),
	StepInput = require("./StepInput.jsx"),
	NewStep = require("./NewStep.jsx");

class EditRecipePage extends React.Component {
	/*
	Create a new EditRecipePage.

	Parameters
		Object props - properties for component
	*/
	constructor(props) {
		super(props);
		this.state = {
			tasks: props.tasks || new Array(), // all tasks
			updated: false, // whether or not to trigger a new update
			};
		/* The updated state is used to force re-rendering when the tasks
		array is changed, because otherwise a rerender is not performed.*/

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
					header={this.props.header}
					button={this.props.button}
					type="submit"
					data-parse-id="button-update-recipe" />

				<input type="hidden" name="oldname" value={this.props.name}></input>
				<input type="hidden" name="tasks" value={JSON.stringify(this.state.tasks)} />

				<InputRow label="Name" name="name"
					rowClass="padding-vertical" inputClass="width-full"
					value={this.props.name} />
				<FullRow><span>Description</span></FullRow>
				<InputRow label="" name="description" labelSize={0}
					rowClass="padding-vertical" inputClass="width-full"
					value = {this.props.descr} />

				<hr />
				<NewStep onAdd={this._addStep} />
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
							onEdit={(state) => comp._onEdit(state, index)}
							onDelete={() => comp._onDelete(index)}
							/>);
						})}
				</div>
			</Grid></Content>
			);
		}

	/*
	Add a step to the recipe.

	Parameters
		Object task - task just added
	*/
	_addStep(task) {
		this.setState({tasks: this.state.tasks.concat([task])});
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
