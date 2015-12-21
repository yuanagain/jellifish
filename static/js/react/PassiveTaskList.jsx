/*
A dynamic list to display passive tasks that can change with time.
*/

var React = require("react"),
	ReactBootstrap = require("react-bootstrap");

// React components
var FullRow = require("./FullRow.jsx"),
	Timer = require("./Timer.jsx");

class PassiveTaskList extends React.Component {
	/*
	Create a new PassiveTaskList

	Arguments
		Object props - properties for component
	*/
	constructor(props) {
		super(props);
		this.state = {
			data: {}, // data to render
			timer: props.timer, // timer controlling tasks
			added: 0 // number of added tasks (total) - see queueTasks for reasoning
			};

		this.queueTasks = this.queueTasks.bind(this);
		}

	render() {
		// Render the component
		var data = this.state.data;
		return (
			<div>
				{Object.keys(data).map(function(key) {
					var item = data[key];
					return <FullRow key={"row -" + item.id}>
						<Timer
							end={item.end_time}
							delta={item.duration}
							text={item.name} 
							ref={"timer_" + item.id} />
					</FullRow>;
					})}
			</div>
			);
		}

	componentDidMount() {
		// Hook right after component mounts
		var comp = this;

		this.state.timer.each(function(elapsed) {
			// run each passive task
			for (var key in comp.refs) {
				comp.refs[key].step(elapsed);
				}
			});
		this.queueTasks();
		}

	/*
	Queue the passive tasks onto the timer, so they can be rendered as necessary
	*/
	queueTasks() {
		var comp = this,
			timer = this.state.timer;

		for (var i = 0; i < this.props.data.length; i++) {
			var passiveTask = this.props.data[i];

			// no need to render tasks that do not persist
			if (passiveTask.duration == 0) continue;

			/* function hack for when dynamically creating functions per item
			Otherwise, a false optimization is performed when declaring
			these functions. */
			(function(task, index) {
				timer.once(task.start_time, function() {
					task.id = Math.random(); // random ID for React/data key
					comp.state.data[task.id] = task;

					/* The "added" state field does not get used anywhere else, so
					you may be wondering why it's even needed at all. It's essentially
					a more elegant way of calling comp.forceUpdate(). This is required
					because the "data" state field is only stored as a reference,
					and so adding to the data object does not actually cause an explicit
					state change until another state change occurs. Thus, the simplest way
					to force React to recognize the state change, and thus rerender the data,
					is to update another state field - which is our "added" field. */
					comp.setState({added: comp.state.added + 1});

					// function hack again, because we're creating another function
					(function(pTask) {
						timer.once(pTask.end_time + 1, function() {
							comp.refs["timer_" + task.id].remove();
							delete comp.state.data[task.id];
							// remove the item from the current passive task list
							});
						})(task);
					});
				})(passiveTask, i);
			}
		}
	}

module.exports = PassiveTaskList;
