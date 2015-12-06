// Rushy Panchal
// jellifish
// static/js/base-components.js

function baseComponents() {
	// Generate the base components to be used by React
	var Header = React.createClass({
		render: function() {
			return (
				<header className = "header">
					<img src = {this.props.logoSrc} className = "logo"></img>
				</header>
				);
			}
		});

	ReactDOM.render(
		<Header logoSrc={staticPath("images/logo.png")} />,
		document.getElementById("header")
		);
	}

$(document).ready(baseComponents);
