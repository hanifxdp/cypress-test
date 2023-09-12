describe("Logout Feature", () => {
	context(`Desktop 1080p`, () => {
		it.only(`Logout Session (loginBackend)`, () => {
			cy.log("Viewport");
			cy.viewport(1920, 1080);
			cy.clearAll();

			cy.log("Login");
			cy.loginBackend({
				identifier: `${Cypress.env("user").usernameCoachArif}`,
				password: `${Cypress.env("user").passwordCoachArif}`,
			});
			cy.visit(Cypress.env("path").homepage_url);
			cy.wait(2000);

			cy.log("Logout Process");
			cy.get(".css-af88zl").click();
			cy.wait(1000);
			cy.get(".menu-dropdown-logout.css-1xivi2a").click();

			cy.log("Assert the logout result");
			cy.clearAll();
		});
		it(`Logout Seesion (loginAndLogoutBackend)`, () => {
			cy.log("Viewport");
			cy.viewport(1920, 1080);
			cy.clearAll();

			cy.log("Login");
			cy.loginBackend({ identifier: "harambe", password: "H@rambe123" });
			cy.wait(2000);

			cy.logoutBackend();
		});
	});
	context(`Smartphone`, () => {
		it(`Logout Session`, () => {
			cy.log("Viewport");
			cy.viewport(428, 926);

			cy.log("Login");
			cy.login("harambe", "H@rambe123");

			cy.log("Logout Process");
			cy.get(".css-af88zl").click();
			cy.get(".menu-dropdown-logout.css-1xivi2a").click();

			cy.log("Assert the logout result");
			cy.get(".chakra-text.css-7bw2ky")
				.should("contain", "Login")
				.and("be.visible");
			cy.get(".chakra-text.css-7kgmg7")
				.should("contain", "Welcome back to Wool👋")
				.and("be.visible");
		});
	});
	context(`Smartphone`, () => {
		it(`Logout Session`, () => {
			cy.log("Viewport");
			cy.viewport(390, 844);

			cy.log("Login");
			cy.login("harambe", "H@rambe123");

			cy.log("Logout Process");
			cy.get(".css-af88zl").click();
			cy.get(".menu-dropdown-logout.css-1xivi2a").click();

			cy.log("Assert the logout result");
			cy.get(".chakra-text.css-7bw2ky")
				.should("contain", "Login")
				.and("be.visible");
			cy.get(".chakra-text.css-7kgmg7")
				.should("contain", "Welcome back to Wool👋")
				.and("be.visible");
		});
	});
});
