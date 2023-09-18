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
	}).then((res) => {
		cy.log(res.body.user.username);
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
		expect(res.body.user.username).contain("testapibackwool");
		expect(res.body.access_token).is.not.null;
		expect(res.body.statusCode).eq(200);
	});
});

it(`SSO Google`, () => {
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
