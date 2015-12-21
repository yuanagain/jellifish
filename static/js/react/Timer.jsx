/*
A Timer wraps around the Progressbar.Circle to provide an intuitive interface
for displaying timers.

Optional Props
	int end - ending time of timer
	int delta - duration of the timer
	String name - text to display with timer
	String description - description of task to display when primary
	int strokeWidth - width of the progressbar (defaults to 2)
	String strokeColor - color of progressbar (defaults to 'green')

Examples
	var timer = ReactDOM.render(<Timer />, document.getElementById("timer"));

	// starting at t = 0s, with a total elapsed time of 60s
	timer.reset("My Text", 0, 60);
	
	// starting at t = 30s, with a total elapsed time of 15s
	timer.reset("New Text", 30, 15);
*/

var React = require("react"),
	ReactDOM = require("react-dom"),
	Progressbar = require("rc-progress").Circle,
	moment = require("moment"),
	$ = require("jquery");

class Timer extends React.Component {
	/*
	Create a new Timer

	Arguments
		Object props - properties for component
	*/
	constructor(props) {
		super(props);
		this.state = {
			end: props.end || 0, // end time of the timer
			delta: props.delta || 0, // time to run
			name: props.name || "", // name of task
			description: props.description || "", // description of task

			// internal state
			_text_top: 0, // top position of text
			_text_left: 0, // left position of text
			_progress: 1, // progress (as a decimal) of the timer
			_display: true, // whether or not to display the timer
			};

		this._getFormattedTime = this._getFormattedTime.bind(this);
		this._positionText = this._positionText.bind(this);
		this.reset = this.reset.bind(this);
		this.step = this.step.bind(this);
		this.remove = this.remove.bind(this);
		}

	render() {
		// Render the component
		var styleOptions = { // when time is less than 0, don't display
			visibility: (this.state.delta > 0) ? "inherit": "hidden",
			display: (this.state._display) ? "inherit": "none"
			},
			descriptionStyle = {};

		if (! this.props.primary) descriptionStyle["display"] = "none";

		return (
			<div style={styleOptions}>
				<h5>{this.state.name}</h5>
				<Progressbar
					ref="progressbar"
					{...this.props}
					percent={this.state._progress * 100} />
				<div
					className="timer-text primary" ref="progressLabel"
					style={{position: "relative", top: this.state._text_top, left: this.state._text_left}}>
					{this._getFormattedTime()}
				</div>
				<span style={descriptionStyle} className="timer-text description">
					{this.state.description}
				</span>
				<br/>
			</div>
			);
		}

	componentDidMount() {
		// Hook right after component mounts
		window.addEventListener('resize', this._positionText);
		this._positionText();
		}

	componentWillUnmount() {
		// Hook right before component unmounts
		window.removeEventListener('resize', this._positionText);
		}

	/*
	Position the text element depending on the parent and sibling sizes

	Arguments
		Event e - event associated with resize
	*/
	_positionText(e) {
		// the node is an SVG element, so width/height are in special attributes
		var svg = ReactDOM.findDOMNode(this.refs.progressbar),
			height = $(svg).height(),
			width = $(svg).width();

		var textNode = ReactDOM.findDOMNode(this.refs.progressLabel);
		height += ($(textNode).height() - this.props.strokeWidth * 2) * 2;
		width -= ($(textNode).width() + this.props.strokeWidth * 2);

		if (! this.props.primary) width = 0; // position at left = 0
		this.setState({_text_top: -height / 2, _text_left: width / 2});
		}

	/*
	Get the formatted time depending on the current remaining time

	Returns
		(String) format of HH:mm:ss if more than an hour remaining,
		otherwise format of mm:ss
	*/
	_getFormattedTime() {
		var text,
			timeRemaining = this.state.delta * this.state._progress,
			momentTime = moment().set({hours: 0, minutes: 0, seconds: timeRemaining});

		if (timeRemaining > 3600) text = momentTime.format("HH:mm:ss");
		else text = momentTime.format("mm:ss");

		return text;
		}

	/*
	Update the timer with a single decreased second

	Arguments
		int elapsedTime - how much time has passed so far on the global timer

	Returns
		(double) Current progress on timer (as a decimal)
	*/
	step(elapsedTime) {
		if (! this.state._display) return 0; // no step to take
		var state = this.state,
			newProgress = (state.end - elapsedTime) / state.delta;

		this.setState({
			_progress: newProgress
			});

		return newProgress;
		}

	/*
	Reset the timer to display new text and a new time

	Arguments:
		String name - name to display
		String description - description of the task
		int start_time - starting point of the timer
		int delta_time - elapsed time before timer reaches 0 progress
	*/
	reset(name, description, start_time, delta_time) {
		this.setState({
			name: name,
			description: description,
			end: start_time + delta_time,
			delta: delta_time,
			_progress: 1,
			});
		}

	/*
	Remove the timer by setting it as inactive
	*/
	remove() {
		this.setState({_display: false});
		}
	}

Timer.defaultProps = {
	strokeWidth: 2,
	strokeColor: "green"
	}

module.exports = Timer;
