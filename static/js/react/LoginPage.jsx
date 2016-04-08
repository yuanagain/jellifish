/*
A LoginPage provides the interface for logging in to the application.
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
	FullRow = require('./FullRow.jsx');

/*
	Create a new LoginPage component.

	Parameters
		Object props - properties for component
	*/
function LoginPage(props) {
	return (
		<Content><Grid fluid>
			<SectionHeaderButton
				header="Access Restricted"
				button="Login"
				type="submit"
				className="padding-vertical" />

			<InputRow label="Password" name="password" type="password"
				rowClass="padding-vertical" inputClass="width-full" />
		</Grid></Content>
		);			
	}

module.exports = LoginPage;
