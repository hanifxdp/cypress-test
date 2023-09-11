import akun from "../../../../fixtures/akunTest.json";

describe(`Register`, () => {
	beforeEach(() => {
		cy.visit("/auth/register");
		cy.xpath("//h2[normalize-space()='Register']").should(
			"contain",
			"Register"
		);
		cy.log("filling out first name");
		cy.get("input[placeholder='First name']")
			.type(akun.firstName)
			.should("have.value", akun.firstName);
		cy.log("filling out last name");
		cy.get("input[placeholder='Last name']")
			.type(akun.lastName)
			.should("have.value", akun.lastName);
		cy.log("filling out email");
		cy.get("input[placeholder='Email']")
			.type(akun.email)
			.should("have.value", akun.email);
		cy.log("filling out username");
		cy.get("input[placeholder='Username']")
			.type(akun.username)
			.should("have.value", akun.username);
		cy.log("filling out password");
	});
	it(`(+)Verify that user can successfully create a new account with valid credentials`, () => {
		cy.get("input[placeholder='Password']")
			.type(akun.password)
			.should("have.value", akun.password);
		cy.log("filling out confirmation password");
		cy.get("input[placeholder='Confirm Password']")
			.type(akun.password)
			.should("have.value", akun.password);
		cy.log("submitting form");
		cy.get('button[type="submit"]').click();
	});
	it(`(-)Verify that user cannot create account with invalid or duplicate credentials`, () => {
		cy.get("input[placeholder='Password']")
			.type(akun.password)
			.should("have.value", akun.password);
		cy.get("input[placeholder='Confirm Password']")
			.type(akun.wrongPassword)
			.should("have.value", akun.wrongPassword);
		cy.get('button[type="submit"]').click();
		cy.contains("Passwords must match").should(
			"contain",
			"Passwords must match"
		);
	});
	it.skip(`Verify that user can successfully create a new account with google account`, () => {});
});
