describe("Profile Feature", () => {
	let firstName = "";
	context(`Desktop 1080p`, () => {
		beforeEach(() => {
			cy.viewport(1920, 1080);
			cy.clearAll();
			cy.loginBackend({ identifier: "harambe", password: "H@rambe123" });
			cy.get(".css-af88zl").click();
			cy.contains("My Profile").click();
			cy.get(".css-dfdtq4").should("contain", "Profile");
		});
		it(`View Profile`, () => {
			cy.get(".css-722v25").invoke("text").as("firstName");
			cy.get("@firstName").then((textFirstName) => {
				firstName = textFirstName;
				cy.get(".css-1qwnwpn").should("have.text", textFirstName);
			});
		});
		it(`Edit profile`, () => {
			cy.get(`input[placeholder='Username']`).invoke("text").as("usernameText");
			cy.get("@usernameText").then((username) => {
				cy.get(`.chakra-text.css-1ayejpo`).should("have.text", username);
			});
			cy.get(`input[placeholder='First name']`).type(firstName);
		});
		it(`Change password`, () => {});
	});
});
