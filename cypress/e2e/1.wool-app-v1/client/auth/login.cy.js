// * Test Passed
// ? Not using any expected.

describe(`Login`, () => {
	context(`Desktop 1080p`, () => {
		context(`Client`, () => {
			beforeEach(() => {
				cy.viewport(1920, 1080);
			});
			it(`(+)Verify that client can successfully login to the app with their private account`, () => {
				cy.login(
					`${Cypress.env("user").usernameHarambe}`,
					`${Cypress.env("user").passwordHarambe}`
				);
				cy.get("#toast-1-title").should("contain", "Success");
				cy.get("#toast-1-description").should(
					"contain",
					"Successfully logged in"
				);
			});
			it(`(-)Verify that user need to login to enter the app`, () => {
				cy.visit("/auth/login");
				cy.get('button[type="submit"]').click();
				cy.wait(1000);
				cy.xpath(
					"//div[normalize-space()='Email or username is required']"
				).should("contain", "Email or username is required");
				cy.xpath(
					"//div[normalize-space()='Password is required']"
				).should("contain", "Password is required");
			});
			it(`(-)Verify that user need the right combination (wrong password) on the credentials to login to the app`, () => {
				cy.login(
					`${Cypress.env("user").usernameHarambe}`,
					`${Cypress.env("user").wrongPassword}`
				);
				cy.get("#toast-1-title").should("contain", "Oops..");
				cy.get("#toast-1-description").should(
					"contain",
					"Invalid Identifier Or Password"
				);
			});
			it(`(-)Verify that user need the right combination (wrong email) on the credentials to login to the app`, () => {
				cy.login(
					`${Cypress.env("user").usernameHarambe}`,
					`${Cypress.env("user").wrongPassword}`
				);
				cy.get("#toast-1-title").should("contain", "Oops..");
				cy.get("#toast-1-description").should(
					"contain",
					"Invalid Identifier Or Password"
				);
			});
			it(`(-)Verify that user need the right combination (both wrong) on the credentials to login to the app`, () => {
				cy.login(
					`${Cypress.env("user").usernameHarambe}`,
					`${Cypress.env("user").wrongPassword}`
				);
				cy.get("#toast-1-title").should("contain", "Oops..");
				cy.get("#toast-1-description").should(
					"contain",
					"Invalid Identifier Or Password"
				);
			});
			it.skip(`(+)Verify that user can successfully login with google account`, () => {});
			it(`loginBackend`, () => {
				cy.loginBackend({
					identifier: `${Cypress.env("user").usernameHarambe}`,
					password: `${Cypress.env("user").passwordHarambe}`,
				});
			});
		});
		context(`Partner`, () => {
			it(`(+)Verify that coach can successfully login to the app with their private account`, () => {
				cy.login(
					`${Cypress.env("user").usernameCoachArif}`,
					`${Cypress.env("user").passwordCoachArif}`
				);
				cy.get("#toast-1-title").should("contain", "Success");
				cy.get("#toast-1-description").should(
					"contain",
					"Successfully logged in"
				);
			});
			it(`(-)Verify that coach need to login to enter the app`, () => {
				cy.visit(`${Cypress.env("path").loginFE_url}`);
				cy.get('button[type="submit"]').click();
				cy.wait(1000);
				cy.xpath(
					"//div[normalize-space()='Email or username is required']"
				).should("contain", "Email or username is required");
				cy.xpath(
					"//div[normalize-space()='Password is required']"
				).should("contain", "Password is required");
			});
			it(`(-)Verify that coach need the right combination (wrong password) on the credentials to login to the app`, () => {
				cy.login(
					`${Cypress.env("user").usernameCoachArif}`,
					`${Cypress.env("user").wrongPassword}`
				);
				cy.get("#toast-1-title").should("contain", "Oops..");
				cy.get("#toast-1-description").should(
					"contain",
					"Invalid Identifier Or Password"
				);
			});
			it(`(-)Verify that coach need the right combination (wrong email) on the credentials to login to the app`, () => {
				cy.login(
					`${Cypress.env("user").usernameHarambe}`,
					`${Cypress.env("user").passwordCoachArif}`
				);
				cy.get("#toast-1-title").should("contain", "Oops..");
				cy.get("#toast-1-description").should(
					"contain",
					"Invalid Identifier Or Password"
				);
			});
			it(`(-)Verify that user need the right combination (both wrong) on the credentials to login to the app`, () => {
				cy.login(
					`${Cypress.env("user").usernameHarambe}`,
					`${Cypress.env("user").wrongPassword}`
				);
				cy.get("#toast-1-title").should("contain", "Oops..");
				cy.get("#toast-1-description").should(
					"contain",
					"Invalid Identifier Or Password"
				);
			});
			it.skip(`(+)Verify that user can successfully login with google account`, () => {});
			it(`loginBackend`, () => {
				cy.loginBackend({
					identifier: `${Cypress.env("user").usernameHarambe}`,
					password: `${Cypress.env("user").passwordHarambe}`,
				});
			});
		});
		context(`Admin`, () => {
			it(`(+)Verify that client can successfully login to the app with their private account`, () => {
				cy.login(
					`${Cypress.env("user").usernameAdmin}`,
					`${Cypress.env("user").passwordAdmin}`
				);
			});
			it(`(-)Verify that user need to login to enter the app`, () => {
				cy.visit(`${Cypress.env("path").homepage_url}`);
			});
			it(`(-)Verify that user need the right combination (wrong password) on the credentials to login to the app`, () => {
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
});
