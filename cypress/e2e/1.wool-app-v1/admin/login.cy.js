describe(`Login`, () => {
	context(`Desktop 1080p`, () => {
		beforeEach(() => {
			cy.viewport(1920, 1080);
		});
		it(`(+)Verify that client can successfully login to the app with their private account`, () => {
			cy.login(
				`${Cypress.env("user").usernameAdmin}`,
				`${Cypress.env("user").passwordAdmin}`
			);
		});
		it(`(-)Verify that user need to login to enter the app`, () => {
			cy.visit(`${Cypress.env("path").homepage_url}`);
		});
		it.only(`(-)Verify that user need the right combination (wrong password) on the credentials to login to the app`, () => {
			cy.login(
				`${Cypress.env("user").usernameAdmin}`,
				`${Cypress.env("user").wrongPassword}`
			);
			cy.get("#toast-1-title").should(
				"contain",
				Cypress.env("info").loginGagalTitle
			);
			cy.get("#toast-1-description").should(
				"contain",
				Cypress.env("info").loginGagalDesc
			);
		});
		it(`(-)Verify that user need the right combination (wrong email) on the credentials to login to the app`, () => {});
		it(`(-)Verify that user need the right combination (both wrong) on the credentials to login to the app`, () => {});
		it.skip(`(+)Verify that user can successfully login with google account`, () => {});
	});
});
