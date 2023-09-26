const { defineConfig } = require("cypress");

module.exports = defineConfig({
	projectId: `fd6g85`,
	viewportHeight: 1080,
	e2e: {
		specPattern: `cypress/e2e/**/*.cy.{js,jsx,ts,tsx}`,
		baseUrl: `http://dev2.wool.id`,
		reporter: "cypress-mochawesome-reporter",
		setupNodeEvents(on, config) {
			require("cypress-mochawesome-reporter/plugin")(on);
		},
	},
});
