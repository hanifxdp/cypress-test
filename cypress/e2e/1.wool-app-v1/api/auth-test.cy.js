// * Test Passed

it("register-test", () => {
	cy.request({
		method: "post",
		url: `${Cypress.env("back_url")}/auth/sign-up`,
		body: {
			firstName: "testAPI",
			lastName: "backWool",
			username: "testapibackwool",
			email: "testapiback@wool.id",
			password: "T#stapi123",
		},
		failOnStatusCode: false,
	}).then((res) => {
		expect(res.status).is.eq(400);
	});
});

it(`login-test`, () => {
	cy.request({
		method: "POST",
		url: `${Cypress.env("back_url")}/auth/sign-in`,
		body: {
			identifier: "testapibackwool",
			password: "T#stapi123",
		},
	}).then((res) => {
		console.log(res);
		expect(res.body.user.username).contain("testapibackwool");
		expect(res.body.access_token).is.not.null;
		expect(res.status).is.eq(200);
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
