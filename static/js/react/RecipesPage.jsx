/*
A RecipesPage component is the main interface for viewing the recipes in the
database and providing options to update/delete values.

Required Props
	[String, ...] recipes - list of recipes to render
*/

var React = require("react"),
	ReactBootstrap = require("react-bootstrap"),
	Row = ReactBootstrap.Row,
	Col = ReactBootstrap.Col,
	Grid = ReactBootstrap.Grid;

// React components
var Content = require("./Content.jsx"),
	SectionHeaderButton = require("./SectionHeaderButton.jsx");

class RecipesPage extends React.Component {
	/*
	Create a new RecipesPage component

	Parameters
		Object props - properties for component
	*/
	constructor(props) {
		super(props);
		this.state = {};
		}

	render() {
		// Render the component
		return (
			<Content><Grid fluid>

			</Grid></Content>
			);
		}
	}

module.exports = RecipesPage;
