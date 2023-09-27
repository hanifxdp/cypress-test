// * Test Passed

import { faker } from "@faker-js/faker";

const firstname = faker.person.firstName("male");
const lastname = faker.person.lastName("male");
const username = faker.internet.displayName();
const email = faker.internet.email();
const password = faker.internet.password({
	length: 20,
	memorable: true,
	pattern:
		/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[!@#$%^&*[]{}\(\)_-+=:;,.?|`~\/\\"'<>])(?=.{6,})/,
});

it("register-test", () => {
	cy.request({
		method: "post",
		url: `${Cypress.env("back_url")}/auth/sign-up`,
		body: {
			firstName: firstname,
			lastName: lastname,
			username: username,
			email: email,
			password: password,
		},
		failOnStatusCode: false,
	}).then((res) => {
		expect(res.body.access_token).is.not.null;
		expect(res.body.user.id).is.a("number");
		expect(res.body.user.firstName).is.contain(firstname);
		expect(res.body.user.lastName).is.contain(lastname);
		expect(res.body.user.email).is.contain(email);
		expect(res.body.user.username).is.contain(username);
	});
});

it(`login-test`, () => {
	cy.request({
		method: "POST",
		url: `${Cypress.env("back_url")}/auth/sign-in`,
		body: {
			identifier: username,
			password: password,
		},
	}).then((res) => {
		expect(res.body.access_token).is.not.null;
		expect(res.body.user.id).is.a("number");
		expect(res.status).is.eq(200);
		expect(res.body.user.firstName).is.contain(firstname);
		expect(res.body.user.lastName).is.contain(lastname);
		expect(res.body.user.email).is.contain(email);
		expect(res.body.user.username).is.contain(username);
	});
});

it.skip(`SSO Google`, () => {
	cy.request({
		method: "POST",
		url: `${Cypress.env("back_url")}/auth/sign-in/google`,
	}).then(() => {
		cy.request({
			method: "GET",
			url: `${Cypress.env("back_url")}/auth/google/callback`,
		});
	});
});
