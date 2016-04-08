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
	SectionHeaderButton = require("./SectionHeaderButton.jsx"),
	FullRow = require("./FullRow.jsx");

class RecipesPage extends React.Component {
	/*
	Create a new RecipesPage component

	Parameters
		Object props - properties for component
	*/
	constructor(props) {
		super(props);
		this.state = {};
		for (var index in props.recipes) {
			this.state[props.recipes[index]] = true;
			}
		}

	render() {
		// Render the component
		var comp = this;
		return (
			<Content><Grid fluid>
			<SectionHeaderButton header="Recipes" button="New" type="button"
				href={this.props.urls.new} />

			<div id="recipes" className="padding-vertical">
			{this.props.recipes.filter((recipe) => comp.state[recipe]).map(
				function(recipe) {
				return (
					<Row className="padding-vertical" key={Math.random()}>
						<Col md={8} xs={6} className="center-horizontal">
							<span>{recipe}</span>
						</Col>
						<Col md={2} xs={3}>
							<ReactBootstrap.Button
								href={comp.props.urls.edit + encodeURIComponent(recipe)}
								bsStyle="primary">Edit</ReactBootstrap.Button>
						</Col>
						<Col md={2} xs={3}>
							<ReactBootstrap.Button
								href={comp.props.urls.delete + encodeURIComponent(recipe)}
								bsStyle="primary">Delete</ReactBootstrap.Button>
						</Col>
					</Row>);
				})}
			</div>
			</Grid></Content>
			);
		}
	}

module.exports = RecipesPage;
