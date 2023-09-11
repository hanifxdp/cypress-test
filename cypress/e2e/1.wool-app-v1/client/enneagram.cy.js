describe(`Enneagram Feature`, () => {
	context("Desktop 1080", () => {
		let enneagramId = 0;
		beforeEach(() => {
			cy.viewport(1920, 1080);
			// cy.loginBackend({ identifier: "harambe", password: "H@rambe123" });
			cy.request("POST", `${Cypress.env("api_url")}/auth/sign-in`, {
				identifier: "harambe",
				password: "H@rambe123",
			}).then((res) => {
				const resBody = res.body.access_token;
				enneagramId = res.body.user.enneagramType;

				cy.setCookie("access_token", resBody);
				cy.visit(Cypress.env("homepage_url"));
			});
			cy.get(".css-2us6ol > :nth-child(3)").click();
		});
		it(`(+)Verify that user can complete the enneagram test`, () => {});
		it(`(+)Verify that user can check the result of the enneagram test result`, () => {
			cy.log(enneagramId);
			cy.get(".css-1o2bxj4").should("be.visible");
			cy.get(".css-1itor2y").children().should("have.length.at.least", 1);
			cy.get(".css-x9o02n > .chakra-heading")
				.invoke("text")
				.then((text1) => {
					cy.log(text1);
				});
			cy.get(".css-x9o02n > .chakra-text")
				.invoke("text")
				.then((text2) => {
					cy.log(text2);
				});
			cy.get(".css-1o2bxj4").should("contain", "Hasil Tes Enneagram");
			cy.contains("Konsultasi dengan Coach");
		});
		it.only(`(+)Verify that user can request to get discussion about enneagram test result with coach`, () => {
			cy.get(".css-1o2bxj4").should("be.visible");
			cy.get(".css-1itor2y").children().should("have.length.at.least", 1);
			cy.contains("Konsultasi dengan Coach").click();
		});
	});
});
