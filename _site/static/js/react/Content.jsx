/*
Content houses all of the main content, and is mainly used to manage CSS
classes that should be applied to all of the primary content in the page.
*/

var React = require("react");

function Content(props) {
	// Render the Content component
	return <div className="content">{props.children}</div>;
	}

module.exports = Content;
