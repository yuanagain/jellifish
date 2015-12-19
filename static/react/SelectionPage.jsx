/*
A SelectionPage provides the interface for the selection interface

Required Props:
	
	selections: [String, ...] // list of recipe selections
*/

class SelectionPage extends React.Component {
	render() {
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
