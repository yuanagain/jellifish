/*
A CollapsibleList displays items in a list that can be, as the name implies,
collapsed.

Required Props
	[Object, ...] list - list of data to display
	String header - header of the list

Optional Props
	String data-parse-id - Parse analytics ID for when the list is collapsed or expanded
*/

var React = require("react"),
	ReactBootstrap = require("react-bootstrap"),
	Row = ReactBootstrap.Row,
	Col = ReactBootstrap.Col;

// React components
var FullRow = require("./FullRow.jsx");

class CollapsibleList extends React.Component {
	/*
	Create a new CollapsibleList

	Arguments
		Object props - properties for component
	*/
	constructor(props) {
		super(props);

		this.state = {
			open: false, // whether or not the list is open
			};
		}

	render() {
		// Render the component
		return (
			<div className="collapsible-list">
				<Row>
					<Col xs={8}><header className="center-horizontal">{this.props.header}</header></Col>
					<Col xs={4}>
						<i className={"clickable-icon ionicons ion-ios-arrow-" + (this.state.open ? "up": "down")}
						onClick={() => this.setState({open: ! this.state.open})}
						data-parse-id={this.props["data-parse-id"]}></i>
					</Col>
				</Row>
				<ReactBootstrap.Panel collapsible expanded={this.state.open}
					className="center-horizontal">
					{this.props.list.map(function(item, index) {
						// render each individual item
						return (
							<FullRow key={"item-"+Math.random()}>
								{index + 1}. {item}
							</FullRow>
							);
						})}
				</ReactBootstrap.Panel>
			</div>
			);
		}
	}

module.exports = CollapsibleList;
