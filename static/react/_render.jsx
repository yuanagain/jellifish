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
