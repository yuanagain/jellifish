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
	TimersPage = require("./react/TimersPage.jsx"),
	NewRecipePage = require("./react/NewRecipePage.jsx"),
	RecipesPage = require("./react/RecipesPage.jsx"),
	EditRecipePage = require("./react/EditRecipePage.jsx");

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
	Render the selection page.

	Parameters
		[Task, ...] selections - list of selection options to render
			Object Task -
				String name - name of task
				String descr - descr of task
	*/
	selection: function(selections) {
		main();
		data = new Array(selections.length);
		for (var index in selections) {
			data[index] = selections[index].name;
			}
		ReactDOM.render(
			<SelectionPage selections={data}/>,
			utils.getElem("#selection")
			);
		},

	/*
	Render the ingredients page.

	Parameters
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
	Render the timers page.

	Parameters
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
		},

	/*
	Render the new_recipe page.
	*/
	new_recipe: function() {
		main();
		ReactDOM.render(
			<NewRecipePage />,
			utils.getElem("#new-recipe")
			);
		},

	/*
	Render the recipe page.

	Parameters
		[String, ...] recipes - list of recipes to render
	*/
	recipes: function(recipes, urls) {
		main();
		data = new Array(recipes.length);
		for (var index in recipes) {
			data[index] = recipes[index].name;
			}
		ReactDOM.render(
			<RecipesPage recipes={data} urls={urls} />,
			utils.getElem("#recipes")
			);
		},

	/*
	Render a recipe to edit.

	Parameters
		Object recipe - recipe to edit
	*/
	edit_recipe: function(recipe) {
		main();
		ReactDOM.render(
			<EditRecipePage recipe={recipe} />,
			utils.getElem("#edit-recipe"));
		}
	}

window.pages = page;
