// * Test Passed
// ? failOnStatusCode is true because the subs is still there.

let accessToken;
let subsId;

const identifier = `${Cypress.env("user").usernameHarambe}`;
const password = `${Cypress.env("user").passwordHarambe}`;

const option = {
	method: "POST",
	url: `${Cypress.env("back_url")}/auth/sign-in`,
	body: {
		identifier,
		password,
	},
};

before(() => {
	cy.request(option).then((res) => {
		accessToken = res.body.access_token;
	});
});

describe(`subs-test`, () => {
	it(`get-the-subs`, () => {
		cy.request({
			method: "GET",
			url: `${Cypress.env("back_url")}/subscriptions`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
		}).then((res) => {
			expect(res.body.total).to.be.a("number");
			expect(res.body.data).to.have.lengthOf(1);
		});
	});
	it(`post-the-subs`, () => {
		cy.request({
			method: "POST",
			url: `${Cypress.env("back_url")}/subscriptions`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
			body: {
				type: "enlightenment",
			},
			failOnStatusCode: false,
		}).then((res) => {
			let respBody = res.body;
			expect(respBody.message).to.be.a("string");
		});
	});
	it(`active-subs-test`, () => {
		cy.request({
			method: "GET",
			url: `${Cypress.env("back_url")}/subscriptions/active`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
		}).then((res) => {
			subsId = res.body.id;
			expect(res.body.status).to.be.a("string");
			expect(res.body.status).is.contain("paid");
			expect(res.status).eq(200);
		});
	});
	it(`latest-subs-test`, () => {
		cy.request({
			method: "GET",
			url: `${Cypress.env("back_url")}/subscriptions/latest`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
		}).then((res) => {});
	});
	it(`latest-subs-getId-test`, () => {
		cy.request({
			method: "GET",
			url: `${Cypress.env("back_url")}/subscriptions/${subsId}`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
			qs: {
				includeUser: true,
				includeTransaction: true,
			},
		}).then((res) => {
			console.log(res);
		});
	});
});
