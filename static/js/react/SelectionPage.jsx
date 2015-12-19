/*
A SelectionPage provides the interface for the selection interface

Required Props
	[String, ...] selections - list of recipe selections
*/

var React = require("react"),
	ReactBootstrap = require("react-bootstrap"),
	Row = ReactBootstrap.Row,
	Col = ReactBootstrap.Col,
	Grid = ReactBootstrap.Grid;

// React components
var Content = require("./Content.jsx"),
	SectionHeaderButton = require("./SectionHeaderButton.jsx"),
	SelectionList = require("./SelectionList.jsx");

class SelectionPage extends React.Component {
	render() {
		// Render the component
		return (
			<Content><Grid fluid>
				<SectionHeaderButton header="Recipe Selection" button="Generate Meal" type="submit" />
				<Row><Col md={12}><header>Recipes</header></Col></Row>
				<Row><Col md={12}>
					<SelectionList selections={this.props.selections} name="recipe" type="radio" />
				</Col></Row>
			</Grid></Content>
			);
		}
	}

module.exports = SelectionPage;
