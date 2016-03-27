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
	StepInput = require("./StepInput.jsx"),
	NewStep = require("./NewStep.jsx");

class NewRecipePage extends React.Component {
	/*
	Create a new NewRecipePage

	Parameters
		Object props - properties for component
	*/
	constructor(props) {
		super(props);
		this.state = {
			tasks: new Array(), // all tasks
			};

		// Bind functions to instance
		this._addStep = this._addStep.bind(this);
		}

	render() {
		// Render the component
		return (
			<Content><Grid fluid className="center-horizontal">
				<SectionHeaderButton header="New Recipe" button="Save" type="submit" data-parse-id="button-new-recipe" />

				<input type="hidden" name="tasks" value={JSON.stringify(this.state.tasks)} />

				<InputRow label="Name" name="name"
					rowClass="padding-vertical" inputClass="width-full" />
				<FullRow><span>Description</span></FullRow>
				<InputRow label="" name="description" labelSize={0}
					rowClass="padding-vertical" inputClass="width-full"/>

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

	/*
	Add a step to the recipe.

	Parameters
		Object task - task just added
	*/
	_addStep(task) {
		this.setState({tasks: this.state.tasks.concat([task])});
		}
	}

module.exports = NewRecipePage;
