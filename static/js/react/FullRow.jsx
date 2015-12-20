/*
A FullRow spans the entire 12-column grid, but on a single row.
It is essentially a shortcut for creating a row with a single 12-width column
inside.

Optional Props
	[ReactElement, ...] children - any nested React elements
*/

var React = require("react"),
	ReactBootstrap = require("react-bootstrap"),
	Row = ReactBootstrap.Row,
	Col = ReactBootstrap.Col;

function FullRow(props) {
	return <Row><Col xs={12}>{props.children}</Col></Row>;
	}

module.exports = FullRow;
