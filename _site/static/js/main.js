/*
Main page script
*/

var React = require("react"),
	ReactDOM = require("react-dom"),
	jQuery = require("jquery"),
	utils = require("./lib/utils.js"),
	analytics = require("./lib/analytics.js");

// React components
var GlobalHeader = require("./react/GlobalHeader.jsx"),
	SelectionPage = require("./react/SelectionPage.jsx"),
	IngredientsPage = require("./react/IngredientsPage.jsx"),
	TimersPage = require("./react/TimersPage.jsx");

function main() {
	// Render main components
	ReactDOM.render(
		<GlobalHeader logoSrc={utils.staticPath("images/logo.png")} />,
		utils.getElem("#header"));

	jQuery(document).ready(postRender);
	}

function postRender() {
	// Post-render hooks
	/* Parse analytics have been disabled because we are no longer
	using Parse, as their platform will be discontinued soon. */
	// analytics.parse(null, null);
	return;
	}

var page = {
	/*
	Render the selection page

	Arguments
		[String, ...] selections - list of selection options to render
	*/
	selection: function(selections) {
		main();
		ReactDOM.render(
			<SelectionPage selections={selections}/>,
			utils.getElem("#selection")
			);
		},

	/*
	Render the ingredients page

	Arguments
		[String, ...] ingredients - list of ingredients to render
	*/
	ingredients: function(ingredients) {
		main();
		ReactDOM.render(
			<IngredientsPage ingredients={ingredients} />,
			utils.getElem("#ingredients")
			);
		},

	/*
	Render the timers page

	Arguments
		Object data - list of ingredients to render
	*/
	timers: function(data) {
		main();
		ReactDOM.render(
			<TimersPage
				active={data.active}
				passive={data.passive}
				recipes={data.recipes} />,
			utils.getElem("#timers")
			);
		}
	}

window.pages = page;
