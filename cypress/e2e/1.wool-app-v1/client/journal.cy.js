describe(`Journal Feature`, () => {
	context("Desktop", () => {
		beforeEach(() => {
			cy.viewport(1920, 1080);
			cy.loginBackend({ identifier: "harambe", password: "H@rambe123" });
			cy.get(".css-2us6ol > :nth-child(2)").click();
		});
		it.skip(`(-)Verify that user cannot view list of journal / Empty journal`, () => {
			cy.get(".swiper-slide-active > .css-oq0257").should("be.visible");
			cy.get(".css-1rmcjji").should("have.text", "Journal");
		});
		it(`(+)Verify that user can view list of journal`, () => {
			cy.get(".css-12tf880").should("contain", "Journal");
			cy.get(".css-qvu1wo")
				.children()
				.should("have.length.at.least", 1)
				.and("have.length.greaterThan", 1);
		});
		it(`Assert the journal type`, () => {
			cy.wait(1000);
			cy.get(".css-rlhbmu > .chakra-button").click();
			cy.get("select[name='category']")
				.children()
				.should(($lis) => {
					expect($lis, "16 items").to.have.length(16);
					expect($lis.eq(0), "First item").to.have.text("Select Type");
					expect($lis.eq(1), "Second item").to.contain("Daily");
					expect($lis.eq(2), "Thrid item").to.contain("Gratitude");
					expect($lis.eq(3), "Fourth item").to.contain("Overthinking");
					expect($lis.eq(4), "Fifth item").to.contain("Negative Thought");
					expect($lis.eq(5), "Sixth item").to.contain("Reflection");
					expect($lis.eq(6), "Seventh item").to.contain("Idea");
					expect($lis.eq(7), "Eight item").to.contain("Unsent Letter");
					expect($lis.eq(8), "Ninth item").to.contain("Word Affirmation");
					expect($lis.eq(9), "Tenth item").to.contain("Lesson Learn");
					expect($lis.eq(10), "Eleventh item").to.contain("Stress Release");
					expect($lis.eq(11), "Twelfth item").to.contain("Self Love");
					expect($lis.eq(12), "Thirteenth item").to.contain("Art");
					expect($lis.eq(13), "Fourteenth item").to.contain("Work");
					expect($lis.eq(14), "Fifteenth item").to.contain("Family");
					expect($lis.eq(15), "Sixteenth item").to.contain("Other");
				});
		});
		it(`(+)Verify that user can add the journal`, () => {
			cy.wait(1000);
			cy.get(".css-rlhbmu > .chakra-button").click();
			cy.request("GET", `${Cypress.env("jsonPlaceholder_url")}/posts/1`).then(
				(response) => {
					const resBody = response.body;
					cy.get("#title").type(resBody.title);
					cy.get("#description").type(resBody.body);
				}
			);
			cy.get(".css-7asiyc > .chakra-button");
		});
		it.skip(`(-)Verify that user cannot add the journal`, () => {});
		it(`(+)Verify that user can view journal detail`, () => {
			cy.get(":nth-child(1) > .css-196uhej").click();
			cy.log("Asserting the detail journal");
			cy.get(".css-1b125b4").should("not.be.NaN");
			cy.get(".css-1wfhuvd").should("not.be.NaN");
			cy.get(".css-89c40u").should("not.be.NaN");
			cy.get(".css-9b6r1s").should("not.be.NaN");
		});
		it(`(+)Verify that user can disscuss journal with user's coach`, () => {
			cy.get(":nth-child(1) > .css-196uhej").click();
			cy.wait(1000);
			cy.request("GET", `${Cypress.env("jsonPlaceholder_url")}/posts/1`).then(
				(response) => {
					const respBody = response.body;
					cy.get("input[placeholder='Write Comment']").type(respBody[1].title, {
						force: true,
					});
				}
			);
			cy.get(".chakra-input__right-element > .chakra-text").click({
				force: true,
			});
			cy.get("#toast-1-title").should("contain", "Success");
			cy.get("#toast-1-description").should("contain", "Comment Created");

			cy.log("Delete Comment");
			cy.get(`[aria-haspopup="menu"]`).click({ multiple: true });
			cy.contains("Delete Comment").click({ force: true });
			cy.get("#toast-1-title").should("contain", "Success");
			cy.get("#toast-1-description").should("contain", "Comment Deleted");
		});
	});
});
