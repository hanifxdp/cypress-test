// * Test Passed
// ? Skipped the (-) test cases

import { faker } from "@faker-js/faker";

describe(`Journal Feature`, () => {
	context("Desktop", () => {
		context(`Client Area`, () => {
			beforeEach(() => {
				cy.viewport(1920, 1080);
				cy.loginBackend({
					identifier: `${Cypress.env("user").usernameHarambe}`,
					password: `${Cypress.env("user").passwordHarambe}`,
				});
				cy.get(".css-2us6ol > :nth-child(2)").click();
				cy.get(".css-12tf880").should("contain", "Journal");
			});
			it(`(+)Verify that user can view list of journal`, () => {
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
						expect($lis.eq(0), "First item").to.have.text(
							"Select Type"
						);
						expect($lis.eq(1), "Second item").to.contain("Daily");
						expect($lis.eq(2), "Thrid item").to.contain(
							"Gratitude"
						);
						expect($lis.eq(3), "Fourth item").to.contain(
							"Overthinking"
						);
						expect($lis.eq(4), "Fifth item").to.contain(
							"Negative Thought"
						);
						expect($lis.eq(5), "Sixth item").to.contain(
							"Reflection"
						);
						expect($lis.eq(6), "Seventh item").to.contain("Idea");
						expect($lis.eq(7), "Eight item").to.contain(
							"Unsent Letter"
						);
						expect($lis.eq(8), "Ninth item").to.contain(
							"Word Affirmation"
						);
						expect($lis.eq(9), "Tenth item").to.contain(
							"Lesson Learn"
						);
						expect($lis.eq(10), "Eleventh item").to.contain(
							"Stress Release"
						);
						expect($lis.eq(11), "Twelfth item").to.contain(
							"Self Love"
						);
						expect($lis.eq(12), "Thirteenth item").to.contain(
							"Art"
						);
						expect($lis.eq(13), "Fourteenth item").to.contain(
							"Work"
						);
						expect($lis.eq(14), "Fifteenth item").to.contain(
							"Family"
						);
						expect($lis.eq(15), "Sixteenth item").to.contain(
							"Other"
						);
					});
			});
			it(`(+)Verify that user can add the journal`, () => {
				cy.wait(1000);
				cy.get(".css-rlhbmu > .chakra-button").click();
				cy.get("select[name='category']").select(
					faker.helpers.rangeToNumber({ min: 1, max: 16 })
				);
				cy.get("#title").type("QA Test - " + faker.lorem.sentence(5));
				cy.get("#description").type(faker.lorem.paragraph(15));
				cy.get(".css-7asiyc > .chakra-button").click();
				cy.get("#toast-1-title").should("contain", "Success");
				cy.get("#toast-1-description").should(
					"contain",
					"Journal Created"
				);
			});
			it(`(+)Verify that user can view journal detail`, () => {
				cy.get(":nth-child(1) > .css-174kbus").click();
				cy.log("Asserting the detail journal");
				cy.get(".css-1b125b4").should("not.be.NaN");
				cy.get(".css-1wfhuvd").should("not.be.NaN");
				cy.get(".css-89c40u").should("not.be.NaN");
				cy.get(".css-9b6r1s").should("not.be.NaN");
			});
			it(`(+)Verify that user can disscuss journal with user's coach`, () => {
				cy.get(":nth-child(1) > .css-174kbus").click();
				cy.wait(1000);
				cy.get("input[placeholder='Write Comment']").type(
					"QA Test - " + faker.lorem.sentence(3),
					{ force: true }
				);
				cy.get(".chakra-input__right-element > .chakra-text").click({
					force: true,
				});
				cy.get("#toast-1-title").should("contain", "Success");
				cy.get("#toast-1-description").should(
					"contain",
					"Comment Created"
				);
			});
			it("delete the comment", () => {
				cy.get(":nth-child(1) > .css-174kbus").click();
				cy.log("Delete Comment");
				cy.get(`[aria-haspopup="menu"]`).click({ multiple: true });
				cy.contains("Delete Comment").click({ force: true });
				cy.get("#toast-1-title").should("contain", "Success");
				cy.get("#toast-1-description").should(
					"contain",
					"Comment Deleted"
				);
			});
			it.skip(`(-)Verify that user cannot add the journal`, () => {});
			it.skip(`(-)Verify that user cannot view list of journal / Empty journal`, () => {
				cy.get(".swiper-slide-active > .css-oq0257").should(
					"be.visible"
				);
				cy.get(".css-1rmcjji").should("have.text", "Journal");
			});
		});
		context(`Coach Area`, () => {
			beforeEach(() => {
				cy.viewport(1920, 1080);
				cy.loginBackendWithSession(
					`${Cypress.env("user").usernameHanif}`,
					`${Cypress.env("user").passwordHanif}`
				);
				cy.visit("/");
				cy.wait(2000);
				cy.get(".css-2us6ol > :nth-child(2)").click();
				cy.get(".chakra-text.css-12tf880").should("contain", "Journal");
			});
			it("look  the journal list", () => {
				cy.get(".css-qvu1wo")
					.children()
					.should("have.length.at.least", 1)
					.and("have.length.greaterThan", 1);
			});
			it("look the detail of the journal list", () => {
				cy.get(":nth-child(1) > .css-174kbus").click();
			});
			it(`comment the journal`, () => {
				cy.get(":nth-child(1) > .css-174kbus").click();
				cy.wait(1000);
				cy.get(".chakra-input__right-element > .chakra-text").click({
					force: true,
				});
				cy.get("input[placeholder='Write Comment']").type(
					"QA Test - " + faker.lorem.sentence(3),
					{
						force: true,
					}
				);
				cy.get(".chakra-input__right-element > .chakra-text").click({
					force: true,
				});
				cy.get("#toast-1-title").should("contain", "Success");
				cy.get("#toast-1-description").should(
					"contain",
					"Comment Created"
				);
			});
			it("delete the journal comment", () => {
				cy.log("Delete Comment");
				cy.get(":nth-child(1) > .css-174kbus").click();
				cy.get(`[aria-haspopup="menu"]`).click({ multiple: true });
				cy.contains("Delete Comment").click({ force: true });
				cy.get("#toast-1-title").should("contain", "Success");
				cy.get("#toast-1-description").should(
					"contain",
					"Comment Deleted"
				);
			});
		});
	});
});
