import akun from "../../../fixtures/akunTest.json";

describe(`Login Coach`, () => {
	it(`(+)Verify that client can successfully login to the app with their private account`, () => {
		cy.login(akun.usernameCoach, akun.passwordCoach);
		cy.get("#toast-1-title").should("contain", "Success");
		cy.get("#toast-1-description").should("contain", "Successfully logged in");
	});
	it.only(`(-)Verify that user need to login to enter the app`, () => {
		cy.visit("/auth/login");
		cy.clickTombolSubmit();
		cy.wait(1000);
		cy.xpath("//div[normalize-space()='Email or username is required']")
			.should("contain", "Email or username is required")
			.should("be.visible");
		cy.xpath("//div[normalize-space()='Password is required']")
			.should("contain", "Password is required")
			.should("be.visible");
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
});
