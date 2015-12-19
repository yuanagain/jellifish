/*
A SectionHeaderButton provides a header along with a button
next to the side - with a custom command and type.

Required Props
	String header -  header to display on page
	String button - text to display on button

Optional Props
	Function onClick - callback when button is clicked
	String type - button type to use
*/

var React = require("react"),
	ReactBootstrap = require("react-bootstrap"),
	Row = ReactBootstrap.Row,
	Col = ReactBootstrap.Col,
	Grid = ReactBootstrap.Grid;

class SectionHeaderButton extends React.Component {
	render() {
		// Render the component
		return (
			<Row className = "section-header">
				<Col md={6} className="center-horizontal"><h3>{this.props.header}</h3></Col>
				<Col md={6} className="center-horizontal">
					<ReactBootstrap.Button bsStyle="primary" onClick={this.props.onClick} type={this.props.type}>
						{this.props.button}
					</ReactBootstrap.Button>
				</Col>
			</Row>
			);
		}
	}

module.exports = SectionHeaderButton;
