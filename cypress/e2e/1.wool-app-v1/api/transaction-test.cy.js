// * Test Passed
// ? Skipped the client, and admin when changing the status. Because it's already on other page.

let transactionId;
let accessToken;
let review = "approved";

describe(`Transaction-test`, () => {
	context(`transaction-client`, () => {
		before(() => {
			cy.loginBackendWithSession(
				`${Cypress.env("user").usernameHarambe}`,
				`${Cypress.env("user").passwordHarambe}`
			);
			cy.getCookie("access_token").then((e) => {
				accessToken = e.value;
			});
		});
		it(`get-transaction-client`, () => {
			cy.request({
				method: "GET",
				url: `${Cypress.env("back_url")}/transactions`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
				qs: {
					orderBy: "type",
				},
			}).then((res) => {
				expect(res.body.total).is.not.null;
				expect(res.body.data).is.not.null;
				transactionId = res.body.data[0].id;
			});
		});
		it(`get-transaction-one-client`, () => {
			console.log(transactionId);
			cy.request({
				method: "GET",
				url: `${Cypress.env("back_url")}/transactions/${transactionId}`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			}).then((res) => {
				console.log(res);
				expect(res.body.id).is.not.null;
				expect(res.body.status).to.contain("success");
			});
		});
		it.skip(`PUT-transaction-client`, () => {
			client();
			cy.request({
				method: "PUT",
				url: `${Cypress.env(
					"back_url"
				)}/transactions/${transactionId}/payment`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			}).then((res) => {
				expect(res.body.id).is.not.null;
			});
		});
	});
	context(`transaction-partner`, () => {
		before(() => {
			cy.loginBackendWithSession(
				`${Cypress.env("user").usernameHanif}`,
				`${Cypress.env("user").passwordHanif}`
			);
			cy.getCookie("access_token").then((e) => {
				accessToken = e.value;
			});
		});
		it(`get-transaction-coach`, () => {
			cy.request({
				method: "GET",
				url: `${Cypress.env("back_url")}/transactions`,
				qs: {
					page: 1,
					take: 10,
					orderBy: "createdAt",
					sortBy: "desc",
					searchBy: "type",
				},
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			}).then((res) => {
				transactionId = res.body.data[0].id;
				expect(res.body.total).is.not.null;
				expect(res.body.data).is.not.null;
			});
		});
		it(`get-transaction-analytics-coach`, () => {
			cy.request({
				method: "GET",
				url: `${Cypress.env("back_url")}/transactions/analytic`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			}).then((res) => {
				expect(res.body.total).is.not.null;
				expect(res.body.thisMonth).is.not.null;
				expect(res.body.thisWeek).is.not.null;
			});
		});
		it(`get-transaction-one-coach`, () => {
			cy.request({
				method: "GET",
				url: `${Cypress.env("back_url")}/transactions/${transactionId}`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			}).then((res) => {
				expect(res.body.id).is.not.null;
			});
		});
	});
	context(`transaction-admin`, () => {
		before(() => {
			cy.loginBackendWithSession(
				`${Cypress.env("user").usernameAdmin}`,
				`${Cypress.env("user").passwordAdmin}`
			);
			cy.getCookie("access_token").then((e) => {
				accessToken = e.value;
			});
		});
		it(`get-transaction-admin`, () => {
			cy.request({
				method: "GET",
				url: `${Cypress.env("back_url")}/transactions`,
				qs: {
					take: 10,
				},
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			}).then((res) => {
				expect(res.body.total).is.not.null;
				expect(res.body.data).is.not.null;
			});
		});
		it(`get-transaction-one-admin`, () => {
			cy.request({
				method: "GET",
				url: `${Cypress.env("back_url")}/transactions/${transactionId}`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			}).then((res) => {
				expect(res.body.id).is.not.null;
			});
		});
		it.skip(`admin-acc-transaction-test`, () => {
			cy.request({
				method: "PUT",
				url: `${Cypress.env(
					"back_url"
				)}/transactions/${transactionId}/${review}`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			}).then((res) => {
				expect(res.body.id).is.not.null;
				expect(res.body.status).is.contain("success");
			});
		});
	});
});
