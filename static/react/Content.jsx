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
