/*
Main page script
*/

var React = require("react"),
	ReactDOM = require("react-dom"),
	jQuery = require("jquery"),
	utils = require("./utils.js");

// React components
var GlobalHeader = require("./react/GlobalHeader.jsx"),
	SelectionPage = require("./react/SelectionPage.jsx"),
	IngredientsPage = require("./react/IngredientsPage.jsx"),
	TimersPage = require("./react/TimersPage.jsx")

function main() {
	// Render main components
	ReactDOM.render(
		<GlobalHeader logoSrc={utils.staticPath("images/logo.png")} />,
		utils.getElem("#header"));
	}

var page = {
	selection: function(selections) {
		main();
		ReactDOM.render(
			<SelectionPage selections={selections}/>,
			utils.getElem("#selection")
			);
		},
	ingredients: function(ingredients) {
		main();
		ReactDOM.render(
			<IngredientsPage ingredients={ingredients} />,
			utils.getElem("#ingredients")
			);
		},

	timers: function(data) {
		main();
		ReactDOM.render(
			<TimersPage data={data} />,
			utils.getElem("#timers")
			);
		}
	}

window.pages = page;
