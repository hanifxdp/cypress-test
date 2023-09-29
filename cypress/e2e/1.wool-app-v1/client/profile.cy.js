// * Test Passed
// ? Change password skipped, and not yet all the cases is developed

import { faker } from "@faker-js/faker";

let cookie;
let firstName;
let respBody;

describe("Profile Feature", () => {
	context(`Desktop 1080p`, () => {
		context("Client", () => {
			beforeEach(() => {
				cy.viewport(1920, 1080);
				cy.loginBackendWithSession(
					`${Cypress.env("user").usernameHarambe}`,
					`${Cypress.env("user").passwordHarambe}`
				);
				cy.getCookie("access_token")
					.should("exist")
					.then((c) => {
						cookie = c.value;
					});
				cy.visit("/");
				cy.wait(2000);
				cy.get(".css-af88zl").click();
				cy.contains("My Profile").click();
			});
			it(`View Profile`, () => {
				cy.get(".css-dfdtq4").should("contain", "Profile");
				cy.request({
					method: "GET",
					url: `${Cypress.env("back_url")}/users/me`,
					headers: {
						authorization: `bearer ${cookie}`,
					},
				}).then((res) => {
					console.log(res);
					respBody = res.body;
					cy.get(".css-1qwnwpn").contains(
						respBody.firstName + " " + respBody.lastName
					);
				});
			});
			it(`Edit profile`, () => {
				cy.get(`input[placeholder='First name']`).clear();
				cy.get(`input[placeholder='First name']`).type(
					faker.person.firstName("male")
				);
				cy.get(`input[placeholder='Last name']`).clear();
				cy.get(`input[placeholder='Last name']`).type(
					faker.person.lastName("female")
				);
				cy.get(".css-1vbta7t").click();
				cy.get("#toast-1-title").should("contain", "Success");
				cy.get("#toast-1-description").should(
					"contain",
					"Profile updated"
				);
			});
			it.skip(`Change password`, () => {});
		});
		context(`Coach`, () => {
			beforeEach(() => {
				cy.viewport(1920, 1080);
				cy.loginBackendWithSession(
					`${Cypress.env("user").usernameHanif}`,
					`${Cypress.env("user").passwordHanif}`
				);
				cy.getCookie("access_token")
					.should("exist")
					.then((c) => {
						cookie = c.value;
					});
				cy.visit("/");
				cy.wait(2000);
				cy.get(".css-af88zl").click();
				cy.contains("My Profile").click();
				cy.get(".css-dfdtq4").should("contain", "Profile");
			});
			it(`View profile`, () => {
				cy.request({
					method: "GET",
					url: `${Cypress.env("back_url")}/users/me`,
					headers: {
						authorization: `bearer ${cookie}`,
					},
				}).then((res) => {
					respBody = res.body;
					cy.get(".css-1qwnwpn").contains(
						respBody.firstName + " " + respBody.lastName
					);
				});
			});
			it(`Edit profile`, () => {
				cy.get(`input[placeholder='First name']`).clear();
				cy.get(`input[placeholder='First name']`).type(
					faker.person.firstName("male")
				);
				cy.get(`input[placeholder='Last name']`).clear();
				cy.get(`input[placeholder='Last name']`).type(
					faker.person.lastName("female")
				);
				cy.get(".css-1vbta7t").click();
				cy.get("#toast-1-title").should("contain", "Success");
				cy.get("#toast-1-description").should(
					"contain",
					"Profile updated"
				);
			});
		});
	});
});
