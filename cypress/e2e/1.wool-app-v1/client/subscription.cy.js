import akun from "../../../fixtures/akunTest.json";
import text from "../../../fixtures/test.json";

describe(`Subsribe to the app to access journal`, () => {
	context(
		`Desktop 1080p`(() => {
			beforeEach(() => {
				cy.viewport(1920, 1080);
				cy.login(akun.username, akun.password);
				cy.skipEnneagram(text.enneagram, text.enneagramDesc);
			});
			it(`Client subs to the app to access the journal`, () => {});
		})
	);
});
