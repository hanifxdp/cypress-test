let journalId;
let access_token;

const option = {
	method: "POST",
	url: `${Cypress.env("api_url")}/auth/sign-in`,
	body: {
		identifier,
		password,
	},
};

const client = (name) => {
	cy.loginBackendWithSession(name, "H@rambe");
};

const partner = (name) => {
	cy.loginBackendWithSession(name, "password");
};

describe(`journal-endpoint`, () => {
	client("harambe");
	it(`journal-post`, () => {
		cy.request({
			method: "POST",
			url: `${Cypress.env("back_url")}/journals`,
			body: {
				title: "string",
				description: "string",
				isPrivate: true,
				category: "gratitude",
			},
		}).then((res) => {
			let respBody = res.body;
			journalId = respBody.id;
			expect(respBody.category).contain("daily");
		});
	});
	partner("hanif");
	it(`journal-get`, () => {
		cy.request({
			method: "get",
			url: `${Cypress.env("back_url")}/journals/${journalId}`,
		}).then((res) => {
			let respBody = res.body;
			journalId = respBody.id;
			expect(respBody.category).contain("daily");
		});
	});
});
