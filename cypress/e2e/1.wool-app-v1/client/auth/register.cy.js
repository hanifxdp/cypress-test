import { faker } from "@faker-js/faker";

const firstname = faker.person.firstName("male");
const lastname = faker.person.lastName("male");
const username = faker.internet.displayName();
const email = faker.internet.email();
const password = faker.internet.password({
	length: 20,
	memorable: true,
	pattern:
		/^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*[]{}()_-+=:;,.?|`~\/\\"'<>])(?=.{6,})/,
});
const wrongPassword = faker.internet.password();

describe(`Register`, () => {
	beforeEach(() => {
		cy.visit("/auth/register");
		cy.xpath("//h2[normalize-space()='Register']").should(
			"contain",
			"Register"
		);
		cy.log("filling out first name");
		cy.get("input[placeholder='First name']")
			.type(firstname)
			.should("have.value", firstname);
		cy.log("filling out last name");
		cy.get("input[placeholder='Last name']")
			.type(lastname)
			.should("have.value", lastname);
		cy.log("filling out email");
		cy.get("input[placeholder='Email']")
			.type(email)
			.should("have.value", email);
		cy.log("filling out username");
		cy.get("input[placeholder='Username']")
			.type(username)
			.should("have.value", username);
		cy.log("filling out password");
	});
	it(`(+)Verify that user can successfully create a new account with valid credentials`, () => {
		cy.get("input[placeholder='Password']")
			.type(password)
			.should("have.value", password);
		cy.log("filling out confirmation password");
		cy.get("input[placeholder='Confirm Password']")
			.type(password)
			.should("have.value", password);
		cy.log("submitting form");
		cy.get('button[type="submit"]').click();
	});
	it(`(-)Verify that user cannot create account with invalid or duplicate credentials`, () => {
		cy.get("input[placeholder='Password']")
			.type(password)
			.should("have.value", password);
		cy.get("input[placeholder='Confirm Password']")
			.type(wrongPassword)
			.should("have.value", wrongPassword);
		cy.get('button[type="submit"]').click();
		cy.contains("Passwords must match").should(
			"contain",
			"Passwords must match"
		);
	});
	it.skip(`Verify that user can successfully create a new account with google account`, () => {});
});
