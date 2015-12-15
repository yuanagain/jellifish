/*
A TimersPage provides the interface for the timers interface
*/

class TimersPage extends React.Component {
	render() {
		return (
			<Content><Grid fluid>
				<SectionHeaderButton header="Recipe Selection" button="Generate Meal" type="submit" />
				<Row><Col md={12}><header>Recipes</header></Col></Row>
				<Row><Col md={12}>
				</Col></Row>
			</Grid></Content>
			);
		}
	}
