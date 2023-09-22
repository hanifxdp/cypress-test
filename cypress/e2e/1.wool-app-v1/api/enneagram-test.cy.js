// * Test Passed

let userId;
let access_token;
const identifier = "tfs123";
const password = "T@fs123";
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
		userId = res.body.user.id;
		access_token = res.body.access_token;
		cy.setCookie("access_token", access_token);
	});
});

describe(`Enneagram-endpoint`, () => {
	it.only(`enneagram-take-test`, () => {
		cy.request({
			method: "POST",
			url: `${Cypress.env("back_url")}/tests`,
			headers: {
				authorization: `bearer ${access_token}`,
			},
		}).then((res) => {
			cy.log(res);
		});
	});
	it(`enneagram-finnalize-test`, () => {
		cy.request({
			method: "POST",
			url: `${Cypress.env("back_url")}/tests/finalize`,
			body: {
				answer: [
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
	it.only(`enneagram-get-test-result`, () => {
		cy.request({
			method: "GET",
			url: `${Cypress.env("back_url")}/tests/users/${userId}`,
			headers: {
				authorization: `bearer ${access_token}`,
			},
		}).then((res) => {
			cy.log(res);
		});
	});
});
