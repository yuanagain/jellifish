/*
A GlobalHeader is a header that is intended to be present
on all files, across the entire website.

Required Props
	String logoSrc - URL location of the logo image
*/

var React = require("react"),
	ReactBootstrap = require("react-bootstrap");

function GlobalHeader(props) {
	// Render the GlobalHeader component
	return (
		<header className = "header">
			<a href = "/"><ReactBootstrap.Image src={props.logoSrc} responsive rounded className = "logo" /></a>
		</header>
		);
	}

module.exports = GlobalHeader;
