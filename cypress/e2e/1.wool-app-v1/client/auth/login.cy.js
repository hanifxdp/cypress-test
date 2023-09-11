describe(`Login`, () => {
	context(`Desktop 1080p`, () => {
		beforeEach(() => {
			cy.viewport(1920, 1080);
		});
		it(`(+)Verify that client can successfully login to the app with their private account`, () => {
			cy.login(akun.username, akun.password);
			cy.intercept("POST", "http://back.wool.id/auth/sign-in").as("signIn");
			cy.wait("@signIn").then(({ request, response }) => {
				expect(request.body).contain({ identifier: "autotesst" });
				expect(response.statusCode).to.eq(200);
				expect(response.body.access_token).not.to.be.null;
			});

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
			cy.xpath("//div[normalize-space()='Password is required']").should(
				"contain",
				"Password is required"
			);
		});
		it(`(-)Verify that user need the right combination (wrong password) on the credentials to login to the app`, () => {
			cy.login(akun.username, akun.wrongPassword);
			cy.get("#toast-1-title").should("contain", "Oops..");
			cy.get("#toast-1-description").should(
				"contain",
				"Invalid Identifier Or Password"
			);
		});
		it(`(-)Verify that user need the right combination (wrong email) on the credentials to login to the app`, () => {
			cy.login(akun.password, akun.password);
			cy.get("#toast-1-title").should("contain", "Oops..");
			cy.get("#toast-1-description").should(
				"contain",
				"Invalid Identifier Or Password"
			);
		});
		it(`(-)Verify that user need the right combination (both wrong) on the credentials to login to the app`, () => {
			cy.login(akun.password, akun.wrongPassword);
			cy.get("#toast-1-title").should("contain", "Oops..");
			cy.get("#toast-1-description").should(
				"contain",
				"Invalid Identifier Or Password"
			);
		});
		it.skip(`(+)Verify that user can successfully login with google account`, () => {});
		it.only(`loginBackend`, () => {
			cy.loginBackend({
				identifier: `${Cypress.env("user").usernameHarambe}`,
				password: `${Cypress.env("user").passwordHarambe}`,
			});
		});
	});
});
