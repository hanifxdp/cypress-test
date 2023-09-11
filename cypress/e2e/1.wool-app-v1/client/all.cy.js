import akun from "../../../fixtures/akunTest.json";
import info from "../../../fixtures/test.json";

describe("All Feature", () => {
	context("Desktop 1080p", () => {
		beforeEach(() => {
			cy.viewport(1920, 1080);
			cy.clearAllCookies();
			cy.clearAllLocalStorage();
			cy.clearAllSessionStorage();
			cy.login(akun.username, akun.password);
			cy.skipEnneagram(info.enneagram, info.enneagramDesc);
		});
		it(`Homepage`, () => {
			cy.get(".css-1l9oi2i").click();
			cy.log("At Homepage");
			cy.get(".css-12tf880").should("have.text", "Home");
			cy.get(".css-1v8my8o > .chakra-heading").should("have.text", "My Coach");
			cy.get("div").contains("Arif Samil");
			cy.get(".css-di2piv").should("have.text", "Life Coach");
		});
		//   it(`Add Journal`, () => {});
		//   it(`View Journal`, () => {});
		//   it(`View counseling`, () => {});
		//   it(`Add counseling`, () => {});
		//   it(`Enneagram result`, () => {});
		//   it(`View profile`, () => {});
		//   it(`Edit profile`, () => {});
		//   it(`View transaction`, () => {});
		//   it(`Detail Transaction`, () => {});
		//   it(``, () => {});
	});
});
