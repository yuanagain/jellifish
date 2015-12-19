/*
A GlobalHeader is a header that is intended to be present
on all files, across the entire website.

Required Props:
	
	logoSrc: String // URL location of the logo image
*/

var React = require("react"),
	ReactBootstrap = require("react-bootstrap");

class GlobalHeader extends React.Component {
	render() {
		return (
			<header className = "header">
				<a href = "/"><ReactBootstrap.Image src={this.props.logoSrc} responsive rounded className = "logo" /></a>
			</header>
			);
		}
	}

module.exports = GlobalHeader;
