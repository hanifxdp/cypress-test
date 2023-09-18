let cookie;
let firstName;
let respBody;

describe("Profile Feature", () => {
	context(`Desktop 1080p`, () => {
		context("Client", () => {
			before(() => {
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
				cy.get(".css-dfdtq4").should("contain", "Profile");
			});
			it(`View Profile`, () => {
				cy.request({
					method: "GET",
					url: `${Cypress.env("api_url")}/users/me`,
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
			it.skip(`Edit profile`, () => {
				cy.get(`input[placeholder='Username']`)
					.invoke("text")
					.as("usernameText");
				cy.get("@usernameText").then((username) => {
					cy.get(`.chakra-text.css-1ayejpo`).should(
						"have.text",
						username
					);
				});
				cy.get(`input[placeholder='First name']`).type(firstName);
			});
			it.skip(`Change password`, () => {});
		});
		context(`Coach`, () => {
			before(() => {
				cy.viewport(1920, 1080);
				cy.loginBackendWithSession(
					`${Cypress.env("user").usernameCoachArif}`,
					`${Cypress.env("user").passwordCoachArif}`
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
					url: `${Cypress.env("api_url")}/users/me`,
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
		});
	});
});
