/*
The IngredientsPage is primarily used to render the ingredients page.
*/

class IngredientsPage extends React.Component {
	render() {
		function renderIngredient(ingredient, index) {
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
