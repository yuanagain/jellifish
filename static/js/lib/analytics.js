// Rushy Panchal
// jellifish
// analytics.js - analytics configuration and execution

var Parse = require("parse"),
	jQuery = require("jquery");

module.exports = {
	/*
	Configure Parse analytics

	Arguments
		String applicationID - Parse's provided application ID
		String jsKey - Parse's provided JavaScript Key

	Examples
		// Initialize the Parse analytics
		analytics.parse(MY_APP_ID, MY_JAVASCRIPT_KEY);
	*/
	parse: function(applicationID, jsKey) {
		Parse.initialize(applicationID, jsKey);

		// button to be tracked
		jQuery("button[data-parse-id]").click(function() {
			var payload = {"analytics-id": this.getAttribute("data-parse-id")};
			Parse.Analytics.track("click", payload);
			});

		// form to track selected options
		jQuery("form:has(input[data-parse-id])").submit(function() {
			var selected = new Array();
			jQuery(this).find("input[data-parse-id]:checked").each(function() {
				selected.push(this.getAttribute("data-parse-id"));
				});
			var payload = {"selections": selected};
			Parse.Analytics.track("form", payload);
			});
		}
	};
