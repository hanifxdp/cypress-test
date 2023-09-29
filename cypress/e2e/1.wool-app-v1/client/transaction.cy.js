// TODO : Coach Trasanction and Admin

describe(`Transaction Feature`, () => {
	context("Desktop 1080p", () => {
		context("Client Side", () => {
			beforeEach(() => {
				cy.viewport(1920, 1080);
				cy.loginBackend({
					identifier: `${Cypress.env("user").usernameHarambe}`,
					password: `${Cypress.env("user").passwordHarambe}`,
				});
				cy.get(".css-2us6ol > :nth-child(5)").click();
				cy.get(".chakra-text.css-12tf880").should(
					"contain",
					"Transaction"
				);
			});
			it(`Empty Transaction`, () => {
				cy.loginBackend({
					identifier: `${Cypress.env("user").usernameAutomation}`,
					password: `${Cypress.env("user").passwordAutomation}`,
				});
				cy.tombolButton().should("contain", "How to Pay");
				cy.get(".chakra-text.css-m05ulo").should(
					"contain",
					"Transaksi Kosong"
				);
				cy.get(".chakra-text.css-o5jxbd").should(
					"contain",
					"Sejauh ini, kamu belum melakukan transaksi. Yuk upgrade akunmu ke premium untuk menikmati full akses ke semua fitur!"
				);
			});
			it(`(+)Verify that user can view the list of transaction`, () => {
				cy.get(".css-3pksgp")
					.children()
					.should("have.length.at.least", 1);
			});
			it.skip(`Update the status from pending to settlement`, () => {});
			it.skip(`(+)Verify that user can view the transaction detail (Pending)`, () => {
				cy.get(".css-3pksgp")
					.children()
					.should("have.length.at.least", 1);
				cy.get(
					":nth-child(1) > .css-1x6gbsm > .css-0 > .css-7uk6us"
				).should("contain", "Pending");
				cy.get(".css-3pksgp").children(":nth-child(1)").click();
				cy.get(".css-6rk7hb").should("be.visible");
				cy.wait(1000);
				cy.get(":nth-child(5) > .css-0")
					.invoke("text")
					.as("priceTransaction");
				cy.get("@priceTransaction").then(($numPrice) => {
					cy.get(".css-35ezg3").should("have.text", $numPrice);
				});
			});
			it.skip(`(+)Verify that user can view the transaction detail (Settlement)`, () => {
				cy.get(".css-3pksgp")
					.children(1)
					.should("have.length.at.least", 1)
					.find("p.chakra-text")
					.and("contain", "Settlement");
			});
			it(`(+)Verify that user can view the transaction detail (Success)`, () => {
				cy.get(".css-3pksgp")
					.children()
					.should("have.length.at.least", 1);
				cy.get(
					":nth-child(2) > .css-1x6gbsm > .css-0 > .css-kb7hq2"
				).should("contain", "Success");
				cy.get(".css-3pksgp").children(":nth-child(2)").click();
				cy.get(".css-t26egv").contains("Transaksi telah Berhasil");
			});
			it(`(+)Verify that user can view the how to pay for counselling`, () => {
				cy.tombolButton().should("contain", "How to Pay");
				cy.get(".chakra-text.css-12tf880").should(
					"contain",
					"Transaction Method"
				);
				cy.get(".css-1venz01").should("be.visible");
			});
		});
		context("Partner Side", () => {});
	});
});
