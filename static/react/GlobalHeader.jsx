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
