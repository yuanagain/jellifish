/*
A GlobalHeader is a header that is intended to be present
on all files, across the entire website.
*/

class GlobalHeader extends React.Component {
	render() {
		return (
			<header className = "header">
				<a href = "/"><ReactBootstrap.Image src={this.props.logoSrc} responsive rounded className = "logo" /></a>
			</header>
			);
		}
	}
