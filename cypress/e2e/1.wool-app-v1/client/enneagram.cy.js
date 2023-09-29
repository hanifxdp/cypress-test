import { faker } from "@faker-js/faker";

const firstname = faker.person.firstName("male");
const lastname = faker.person.lastName("male");
const username = faker.internet.displayName();
const email = faker.internet.email();
const password = faker.internet.password({
	length: 20,
	memorable: true,
	pattern:
		/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[!@#$%^&*[]{}\(\)_-+=:;,.?|`~\/\\"'<>])(?=.{6,})/,
});

before(() => {
	cy.request({
		method: "POST",
		url: `${Cypress.env("back_url")}/auth/sign-up`,
		body: {
			firstName: firstname,
			lastName: lastname,
			username: username,
			email: email,
			password: password,
		},
	}).then((res) => {
		cy.setCookie("access_token", res.body.access_token);
	});
});

describe(`Enneagram Feature`, () => {
	context("Desktop 1080", () => {
		let enneagramId = 0;
		beforeEach(() => {
			cy.viewport(1920, 1080);
			cy.visit("/");
			cy.get(".css-2us6ol > :nth-child(3)").click();
		});
		it(`(+)Verify that user can complete the enneagram test`, () => {
			cy.get("css-186k2hk").click()
			cy.get("css-186k2hk").click()
			cy.get('css-vl9e3j').click()
		});
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
			cy.get(".css-1o2bxj4").should(
				"contain",
				"Your enneagram test result is..."
			);
			cy.contains("Unlock Complete Enneagram Overview");
		});
		it(`(+)Verify that user can request to get discussion about enneagram test result with coach`, () => {
			cy.get(".css-1o2bxj4").should("be.visible");
			cy.get(".css-1itor2y").children().should("have.length.at.least", 1);
			cy.contains("Konsultasi dengan Coach").click();
		});
	});
});
