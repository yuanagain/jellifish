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
