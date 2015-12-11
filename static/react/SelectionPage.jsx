/*
A SelectionPage provides the interface for the selection interface
*/

const SelectionPage = React.createClass({
	render: function() {
		return (
			<Content>
				<Grid fluid>
					<SectionHeaderButton header="Recipe Selection" button="Generate Meal" type="submit" />
					<Row><Col md={12}><header>Recipes</header></Col></Row>
					<Row><Col md={12}>
						<SelectionList selections={ALL_RECIPES} name="recipe" type="radio"></SelectionList>
					</Col></Row>
				</Grid>
			</Content>
			);
		}
	});
