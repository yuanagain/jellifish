/*
Content houses all of the main content, and is mainly used to manage CSS
classes that should be applied to all of the primary content in the page.
*/

const Content = React.createClass({
	render: function() {
		return (
			<div className = "content">{this.props.children}</div>
			);
		}
	});

/*
A GlobalHeader is a header that is intended to be present
on all files, across the entire website.
*/

const GlobalHeader = React.createClass({
	render: function() {
		return (
			<header className = "header">
				<ReactBootstrap.Image src={this.props.logoSrc} responsive rounded className = "logo" />
			</header>
			);
		}
	});

/*
A SectionHeaderButton provides a header along with a button
next to the side - with a custom command and type.
*/

const SectionHeaderButton = React.createClass({
	render: function() {
		return (
			<Row className = "section-header">
				<Col md={6} className="center-horizontal"><h3>{this.props.header}</h3></Col>
				<Col md={6} className="center-horizontal">
					<ReactBootstrap.Button bsStyle="primary"onClick={this.props.conClick} type={this.props.type}>
						{this.props.button}
					</ReactBootstrap.Button>
				</Col>
			</Row>
			);
		}
	});

/*
A SelectionList essentially holds a list of selections, with a given type
(radio or checkbox).
*/

const SelectionList = React.createClass({
	render: function() {
		var props = this.props;
		return (
			<ul>
				{this.props.selections.map(function(item) {
					var input_id = props.name + Math.ceil(Math.random() * 100000);
					return (
						<div>
							<ReactBootstrap.Input type={props.type} name={props.name} value={item} className = "radio-select" id={input_id} />
							<label htmlFor={input_id} className="input-label">{item}</label>
						</div>
						);
					})}
			</ul>
			);
		}
	});

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

/*
Render all React Elements here
*/

function main() {
	ReactDOM.render(
		<GlobalHeader logoSrc={staticPath("images/logo.png")} />,
		getElem("#header"));

	ReactDOM.render(
		<SelectionPage />,
		getElem("#selection"));
	}

const Grid = ReactBootstrap.Grid;
const Col = ReactBootstrap.Col;
const Row = ReactBootstrap.Row;

main();

