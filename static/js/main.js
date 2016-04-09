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
	RecipesPage = require("./react/RecipesPage.jsx"),
	EditRecipePage = require("./react/EditRecipePage.jsx"),
	LoginPage = require("./react/LoginPage.jsx");

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
		data = selections.map((item) => item.name);
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
			<EditRecipePage button="Save" header="New Recipe" />,
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
		data = recipes.map((item) => item.name);
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
			<EditRecipePage name={recipe.name} descr={recipe.descr}
				tasks={recipe.tasks} button="Save" header={recipe.name} />,
			utils.getElem("#edit-recipe"));
		},

	/*
	Render the login page.
	*/
	login: function() {
		main();
		ReactDOM.render(
			<LoginPage />,
			utils.getElem("#login"));
		}
	}

window.pages = page;
