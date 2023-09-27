// * Test Passed
// ? Not using expected

describe("Logout Feature", () => {
	context(`Desktop 1080p`, () => {
		beforeEach(() => {
			cy.log("Viewport");
			cy.viewport(1920, 1080);
			cy.log("Login");
		});
		context(`Client`, () => {
			it.only(`Logout Session`, () => {
				cy.loginBackendWithSession(
					`${Cypress.env("user").usernameHarambe}`,
					`${Cypress.env("user").passwordHarambe}`
				);
				cy.log("Client Logout");
				cy.visit(Cypress.env("path").homepage_url);
				cy.wait(2000);

				cy.log("Logout Process");
				cy.get(".css-af88zl").click();
				cy.wait(1000);
				cy.get(".menu-dropdown-logout.css-1xivi2a").click();

				cy.log("Assert the logout result");
				cy.clearAll();
			});
		});
		context(`Partner`, () => {
			it.only(`Logout Session`, () => {
				cy.loginBackendWithSession(
					`${Cypress.env("user").usernameCoachArif}`,
					`${Cypress.env("user").passwordCoachArif}`
				);
				cy.log("Partner Logout");
				cy.visit(Cypress.env("path").homepage_url);
				cy.wait(2000);

				cy.log("Logout Process");
				cy.get(".css-af88zl").click();
				cy.wait(1000);
				cy.get(".menu-dropdown-logout.css-1xivi2a").click();

				cy.log("Assert the logout result");
				cy.clearAll();
			});
		});
		context(`Admin`, () => {
			it.only(`Logout Session`, () => {
				cy.loginBackendWithSession(
					`${Cypress.env("user").usernameAdmin}`,
					`${Cypress.env("user").passwordAdmin}`
				);
				cy.log("Admin Logout");
				cy.visit(Cypress.env("path").homepage_url);
				cy.wait(2000);

				cy.log("Logout Process");
				cy.get(".css-af88zl").click();
				cy.wait(1000);
				cy.get(".menu-dropdown-logout.css-1xivi2a").click();

				cy.log("Assert the logout result");
				cy.clearAll();
			});
		});
	});
	context(`Smartphone`, () => {
		it(`Logout Session`, () => {
			cy.log("Viewport");
			cy.viewport(428, 926);
		});
	});
	context(`Smartphone`, () => {
		it(`Logout Session`, () => {
			cy.log("Viewport");
			cy.viewport(390, 844);
		});
	});
});
