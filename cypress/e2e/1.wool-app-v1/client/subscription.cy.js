// * Test Passed

describe(`Subsribe to the app to access journal`, () => {
	context(`Desktop 1080p`, () => {
		beforeEach(() => {
			cy.viewport(1920, 1080);
			cy.loginBackendWithSession(
				`${Cypress.env("user").usernameSnake}`,
				`${Cypress.env("user").passwordSnake}`
			);
			cy.visit("/");
			cy.get(".css-2us6ol > :nth-child(2)").click();
			cy.get(".css-12tf880").should("contain", "Journal");
		});
		it(`Client subs to the app to access the journal`, () => {
			cy.get(".css-1rmcjji").should("have.text", "Journal");
			cy.get(".swiper-button-prev").click();
			cy.get(".css-15nsv0c > .chakra-button").click();
			cy.get("#type").select(1);
			cy.get(".chakra-checkbox__control").click();
			cy.get(".css-1gauf4i").click();
			cy.get(".css-b1m6vs > .chakra-button").click();
		});
	});
});
