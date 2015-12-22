/*
The IngredientsPage component is primarily used to render the ingredients page.

Required Props
	[String, ...] ingredients - list of ingredients
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

class IngredientsPage extends React.Component {
	render() {
		// Render the component
		function renderIngredient(ingredient, index) {
			/* Internal - render a specific ingredient

			Arguments
				String ingredient - ingredient name to display
				int index - index of the current ingredient

			Returns
				(HTMLElement) rendered component
			*/
			return (
					<FullRow key={Math.random()}>
						<h6 className="ingredient">{index + 1}. {ingredient}</h6>
					</FullRow>
				);
			}

		return (
			<Content><Grid fluid>
				<SectionHeaderButton header="Ingredients" button="Continue" type="submit" />
				<br/>
				{this.props.ingredients.map(renderIngredient)}
			</Grid></Content>
			);
		}
	}

module.exports = IngredientsPage;
