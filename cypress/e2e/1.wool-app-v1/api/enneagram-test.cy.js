// * Test Passed

import { faker } from "@faker-js/faker";

let userId;
let accessToken;

const firstname = faker.person.firstName("male");
const lastname = faker.person.lastName("male");
const username = faker.internet.displayName();
const email = faker.internet.email();
const password = faker.internet.password({ length: 20, memorable: true });

before(() => {
	cy.request({
		method: "post",
		url: `${Cypress.env("back_url")}/auth/sign-up`,
		body: {
			firstName: firstname,
			lastName: lastname,
			username: firstname,
			email: email,
			password: password,
		},
	}).then((res) => {
		accessToken = res.body.access_token;
		userId = res.body.user.id;
	});
});

describe(`Enneagram-endpoint`, () => {
	it(`enneagram-take-test`, () => {
		cy.request({
			method: "POST",
			url: `${Cypress.env("back_url")}/tests`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
		}).then((res) => {
			cy.log(res);
		});
	});
	it(`enneagram-finnalize-test`, () => {
		cy.request({
			method: "POST",
			url: `${Cypress.env("back_url")}/tests/finalize`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
			body: {
				answers: [
					"B",
					"A",
					"D",
					"I",
					"E",
					"A",
					"E",
					"H",
					"I",
					"A",
					"G",
					"D",
					"D",
					"I",
					"D",
					"B",
					"F",
					"E",
					"I",
					"D",
					"C",
					"A",
					"B",
					"H",
					"D",
					"I",
					"C",
					"E",
					"F",
					"D",
					"C",
					"B",
					"G",
					"D",
					"F",
					"H",
					"E",
					"G",
					"D",
					"I",
					"E",
					"A",
					"D",
					"E",
					"C",
					"A",
					"G",
					"D",
					"C",
					"I",
					"H",
					"G",
					"A",
					"E",
					"I",
					"D",
					"C",
					"A",
					"B",
					"I",
					"E",
					"A",
					"C",
					"H",
					"G",
					"I",
					"A",
					"B",
					"G",
					"D",
					"F",
					"H",
					"B",
					"A",
					"D",
					"H",
					"F",
					"A",
					"D",
					"F",
					"I",
					"A",
					"G",
					"D",
					"C",
					"I",
					"D",
					"G",
					"A",
					"E",
					"I",
					"D",
					"C",
					"A",
					"B",
					"I",
					"D",
					"A",
					"B",
					"H",
					"G",
					"D",
					"A",
					"B",
					"E",
					"A",
					"I",
					"H",
					"E",
					"A",
					"D",
					"I",
					"E",
					"B",
					"D",
					"H",
					"I",
					"A",
					"G",
					"D",
					"C",
					"I",
					"D",
					"G",
					"F",
					"C",
					"B",
					"D",
					"C",
					"A",
					"B",
					"I",
					"D",
					"I",
					"B",
					"E",
					"F",
					"I",
					"A",
					"H",
					"E",
					"D",
					"I",
					"C",
				],
			},
		}).then((res) => {
			cy.log(res);
		});
	});
	it(`enneagram-get-test-result`, () => {
		cy.request({
			method: "GET",
			url: `${Cypress.env("back_url")}/tests/users/${userId}`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
		}).then((res) => {
			cy.log(res);
		});
	});
});
