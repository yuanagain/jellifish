/*
The IngredientsPage component is primarily used to render the ingredients page.

Required Props:
	
	ingredients: [String, ...] // list of ingredients
*/

var React = require("react"),
	ReactBootstrap = require("react-bootstrap"),
	Row = ReactBootstrap.Row,
	Col = ReactBootstrap.Col,
	Grid = ReactBootstrap.Grid;

// React components
var Content = require("./Content.jsx"),
	SectionHeaderButton = require("./SectionHeaderButton.jsx");

class IngredientsPage extends React.Component {
	render() {
		// Render the component
		function renderIngredient(ingredient, index) {
			/* Internal - render a specific ingredient

			Arguments:
				ingredient (String) - ingredient name to display
				index (int) - index of the current ingredient

			Returns rendered component
			*/
			return <Row><Col md={12}>{index + 1}. {ingredient}</Col></Row>;
			}

		return (
			<Content><Grid fluid>
				<SectionHeaderButton header="Ingredients" button="Continue" type="submit" />
				{this.props.ingredients.map(renderIngredient)}
			</Grid></Content>
			);
		}
	}

module.exports = IngredientsPage;
