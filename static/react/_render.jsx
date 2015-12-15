/*
Render all React Elements here
*/

function main() {
	ReactDOM.render(
		<GlobalHeader logoSrc={staticPath("images/logo.png")} />,
		getElem("#header"));
	}

function selectionPage(selections) {
	ReactDOM.render(
		<SelectionPage selections={selections}/>,
		getElem("#selection")
		);
	}

function ingredientsPage(ingredients) {
	ReactDOM.render(
		<IngredientsPage ingredients={ingredients} />,
		getElem("#ingredients")
		);
	}

function timersPage(data) {
	ReactDOM.render(
		<TimersPage data={data} />,
		getElem("#timers")
		);
	}

exportFunctions([selectionPage, ingredientsPage, timersPage]);

const Grid = ReactBootstrap.Grid;
const Col = ReactBootstrap.Col;
const Row = ReactBootstrap.Row;

main();
