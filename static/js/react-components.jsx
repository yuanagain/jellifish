/*
A GlobalHeader is a header that is intended to be present
on all files, across the entire website.
*/

var GlobalHeader = React.createClass({
	render: function() {
			return (
				<header className = "header">
					<img src = {this.props.logoSrc} className = "logo"></img>
				</header>
				);
			}
	});

