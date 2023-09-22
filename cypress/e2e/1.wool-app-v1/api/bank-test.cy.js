// * Test Passed

import { faker } from "@faker-js/faker";

let accessToken;
let bankId;

const option = {
	method: "POST",
	url: `${Cypress.env("back_url")}/auth/sign-in`,
	body: {
		identifier: `${Cypress.env("user").usernameHanif}`,
		password: `${Cypress.env("user").passwordHanif}`,
	},
};

before(() => {
	cy.request(option).then((res) => {
		accessToken = res.body.access_token;
	});
});

describe(`bank-account-test`, () => {
	it(`create-bank-test`, () => {
		cy.request({
			method: "POST",
			url: `${Cypress.env("back_url")}/bank-accounts`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
			body: {
				bankName: "bri",
				accountNumber: faker.finance.accountNumber(),
				accountName: faker.person.fullName(),
			},
		}).then((res) => {
			bankId = res.body.id;
			expect(res.body.id).is.not.null;
			expect(res.body.bankName).is.not.null;
			expect(res.body.accountNumber).is.not.null;
			expect(res.body.accountName).is.not.null;
		});
	});
	it(`GET-bank-test`, () => {
		cy.request({
			method: "GET",
			url: `${Cypress.env("back_url")}/bank-accounts`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
		}).then((res) => {
			bankId = res.body.data[0].id;
			expect(res.body.total).is.above(1);
			expect(res.body.data).is.not.null;
		});
	});
	it(`GET-one-bank-test`, () => {
		cy.request({
			method: "GET",
			url: `${Cypress.env("back_url")}/bank-accounts/${bankId}`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
		}).then((res) => {
			expect(res.body.id).is.not.null;
			expect(res.body.accountName).is.a("string");
			expect(res.body.accountNumber).is.a("string");
		});
	});
	it(`PUT-bank-test`, () => {
		cy.request({
			method: "PUT",
			url: `${Cypress.env("back_url")}/bank-accounts/${bankId}`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
			body: {
				bankName: "bri",
				accountNumber: faker.finance.accountNumber(),
				accountName: faker.person.fullName(),
			},
		}).then((res) => {
			expect(res.body.id).is.not.null;
		});
	});
	it(`DELETE-bank-test`, () => {
		cy.request({
			method: "DELETE",
			url: `${Cypress.env("back_url")}/bank-accounts/${bankId}`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
		}).then((res) => {
			expect(res.body.id).is.not.null;
		});
	});
});
