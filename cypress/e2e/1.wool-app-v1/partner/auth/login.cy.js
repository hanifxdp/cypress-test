describe(`Login as A Coach`, () => {
	context(`Desktop 1080p`, () => {
		beforeEach(() => {
			cy.viewport(1920, 1080);
		});
		it.only(`(+)Verify that coach can successfully login to the app with their private account`, () => {
			cy.login(
				`${Cypress.env("user").usernameCoachArif}`,
				`${Cypress.env("user").passwordCoachArif}`,
			);
			cy.intercept(
				"POST",
				`${Cypress.env("api_url")}${
					Cypress.env("path").loginBackend_url
				}`,
			).as("signIn");
			cy.wait("@signIn").then(({ request, response }) => {
				expect(request.body).contain({
					identifier: `${Cypress.env("user").usernameCoachArif}`,
				});
				expect(response.statusCode).to.eq(200);
				expect(response.body.access_token).not.to.be.null;
			});

			cy.get("#toast-1-title").should("contain", "Success");
			cy.get("#toast-1-description").should(
				"contain",
				"Successfully logged in",
			);
		});
		it(`(-)Verify that user need to login to enter the app`, () => {
			cy.visit(`${Cypress.env("path").loginFE_url}`);
			cy.get('button[type="submit"]').click();
			cy.wait(1000);
			cy.xpath(
				"//div[normalize-space()='Email or username is required']",
			).should("contain", "Email or username is required");
			cy.xpath("//div[normalize-space()='Password is required']").should(
				"contain",
				"Password is required",
			);
		});
		it(`(-)Verify that user need the right combination (wrong password) on the credentials to login to the app`, () => {
			cy.login(
				`${Cypress.env("user").usernameCoachArif}`,
				`${Cypress.env("user").wrongPassword}`,
			);
			cy.get("#toast-1-title").should("contain", "Oops..");
			cy.get("#toast-1-description").should(
				"contain",
				"Invalid Identifier Or Password",
			);
		});
		it(`(-)Verify that user need the right combination (wrong email) on the credentials to login to the app`, () => {
			cy.login(
				`${Cypress.env("user").usernameHarambe}`,
				`${Cypress.env("user").passwordCoachArif}`,
			);
			cy.get("#toast-1-title").should("contain", "Oops..");
			cy.get("#toast-1-description").should(
				"contain",
				"Invalid Identifier Or Password",
			);
		});
		it(`(-)Verify that user need the right combination (both wrong) on the credentials to login to the app`, () => {
			cy.login(
				`${Cypress.env("user").usernameHarambe}`,
				`${Cypress.env("user").wrongPassword}`,
			);
			cy.get("#toast-1-title").should("contain", "Oops..");
			cy.get("#toast-1-description").should(
				"contain",
				"Invalid Identifier Or Password",
			);
		});
		it.skip(`(+)Verify that user can successfully login with google account`, () => {});
		it(`loginBackend`, () => {
			cy.loginBackend({
				identifier: `${Cypress.env("user").usernameCoachArif}`,
				password: `${Cypress.env("user").passwordCoachArif}`,
			});
		});
	});
});
