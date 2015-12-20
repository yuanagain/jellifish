/*
A Timer wraps around the Progressbar.Circle to provide an intuitive interface
for displaying timers.

Optional Props
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
			start: 0, // start time of timer
			delta: 0, // time to run
			text: "", // text to display

			// internal state
			_timer_id: Math.random(), // id for timer to identify timer
			_text_top: 0, // top position of text
			_progress: 1, // progress (as a decimal) of the timer
			};

		this._getFormattedTime = this._getFormattedTime.bind(this);
		this._positionText = this._positionText.bind(this);
		this.reset = this.reset.bind(this);
		this.step = this.step.bind(this);
		}

	render() {
		// Render the component
		var styleOptions = { // when time is less than 0, don't display
			visibility: (this.state.delta > 0) ? "inherit": "hidden",
			};

		return (
			<div style={styleOptions}>
				<Progressbar
					ref="progressbar"
					{...this.props}
					percent={this.state._progress * 100} />
				<span className="timer-text primary" style={{position: "relative", top: this.state._text_top, left: 0}} ref="progressLabel">
					{this._getFormattedTime()}
				</span>
				<br/>
				<h3>{this.state.text}</h3>
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
			height = $(svg).height();

		var textNode = ReactDOM.findDOMNode(this.refs.progressLabel);
		height += $(textNode).height() * 2;

		this.setState({_text_top: -height / 2});
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
		var state = this.state,
			newProgress = (state.delta - elapsedTime + state.start) / state.delta;

		this.setState({
			_progress: newProgress
			});

		return newProgress;
		}

	/*
	Reset the timer to display new text and a new time

	Arguments:
		String display - text to display
		int start_time - starting point of the timer
		int delta_time - elapsed time before timer reaches 0 progress
	*/
	reset(display, start_time, delta_time) {
		this.setState({
			start: start_time,
			delta: delta_time,
			text: display,
			_progress: 1
			});
		}
	}

Timer.defaultProps = {
	strokeWidth: 2,
	strokeColor: "green"
	}

module.exports = Timer;
