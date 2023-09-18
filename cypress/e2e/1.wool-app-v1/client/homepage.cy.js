describe(`Homepage Feature`, () => {
	context(`Desktop 1080p`, () => {
		context(`Client Side`, () => {
			beforeEach(() => {
				cy.viewport(1920, 1080);
				cy.loginBackend({
					identifier: "harambe",
					password: "H@rambe123",
				});
			});
			it(`(+)Verify that user can access the homepage`, () => {
				cy.log("At Homepage");
				cy.get(".css-12tf880").should("have.text", "Home");
				cy.get(".css-2us6ol")
					.children()
					.should(($lis) => {
						expect($lis, "7 items").to.have.length(7);
						expect($lis.eq(0), "First item").to.have.text("Home");
						expect($lis.eq(1), "Second item").to.contain("Journal");
						expect($lis.eq(2), "Thrid item").to.contain(
							"Enneagram"
						);
						expect($lis.eq(3), "Fourth item").to.contain(
							"Counseling"
						);
						expect($lis.eq(4), "Fifth item").to.contain(
							"Transaction"
						);
						expect($lis.eq(5), "Sixth item").to.contain("DMHP");
						expect($lis.eq(6), "Seventh item").to.contain(
							"CV Builder"
						);
					});
				cy.log("sidebar Active");
				cy.get(".css-2us6ol > :nth-child(1)").should(
					"have.class",
					"css-1f8k0bu"
				);
				cy.log("sidebar not Active");
				cy.get(".css-2us6ol > :nth-child(2)").should(
					"have.class",
					"css-1kyqmic"
				);
				cy.get(".css-msg37p").children().should("have.length", 3);
			});
			it(`(+)Verify that user can view the enneagram test result`, () => {
				cy.get(".css-6d9wsb").children().should("have.length", 2);
				cy.get(".chakra-heading.css-165wpki")
					.invoke("text")
					.as("enneagramHomepage");
				cy.log();
				cy.contains("Lihat detail").click();
				cy.get("@enneagramHomepage").then((text2) => {
					cy.get(".css-x9o02n > .chakra-heading").should(
						"have.text",
						text2
					);
				});
			});
			it(`(+)Verify that user can add journal from shortcut on the homepage`, () => {});
			it.only(`(+)Verify that user can view user's coach`, () => {
				cy.log("Asserting My Coach text");
				cy.get(".css-156an2u")
					.children()
					.invoke("text")
					.as("myCoach")
					.then((text1) => {
						cy.log(text1);
					});

				cy.log("Asserting Coach info");
				cy.get(".css-156an2u").click();
				cy.get(".css-hvq8w2").should("contain", "Arif Samil");
				cy.get(".css-bco1gb > .css-di2piv").should(
					"contain",
					"Life Coach"
				);
				cy.get(".chakra-modal__close-btn").click();
			});
			it(`(+)Verify that user can access shortcut to the profile from homepage`, () => {
				cy.get(".css-af88zl").click();
				cy.contains("My Profile").click();
				cy.get(".css-dfdtq4").should("contain", "Profile");
			});
			it(`(+)Verify that user can access shortcut to the journal from homepage`, () => {});
			it.skip(`(+)Verify that user can take enneagram test`, () => {});
			it.skip(`(+)Verify that user can skip the enneagram test`, () => {});
			it.skip(`(-)Verify that user cannot add journal from shortcut on the homepage`, () => {});
			it.skip(`(-)Verify that user cannot view user's coach`, () => {});
		});
		context(`Partner Side`, () => {
			beforeEach(() => {
				cy.viewport(1920, 1080);
				cy.loginBackend({
					identifier: `${Cypress.env("user").usernameCoachArif}`,
					password: `${Cypress.env("user").passwordCoachArif}`,
				});
			});
			it(`View Homepage and it's card on that`, () => {
				let respBody;
				cy.get(".css-12tf880").should("have.text", "Home");
				cy.intercept(
					"GET",
					`${Cypress.env("api_url")}${
						Cypress.env("api").dashboardAdmin
					}`
				).as("dashboardAdmin");
				cy.wait("@dashboardAdmin").then(({ response }) => {
					expect(response.statusCode).eq(200);
					expect(response.body.totalClient).to.eq(210);
					expect(response.body.totalJournal).to.eq(2);
					respBody = response.body;
					console.log(respBody);
				});
				cy.wait(2000);
				cy.get(".css-6pd4e3").contains("Saldo").should("be.visible");
				cy.get(
					":nth-child(2) > .css-efki4q > .css-f2ohnt > .css-0 > .chakra-text"
				).should("have.text", "210");
				cy.get(".css-6pd4e3")
					.contains("Total Client")
					.should("be.visible");
				cy.get(".css-6pd4e3")
					.contains("Total Journal")
					.should("be.visible");
				cy.get(".css-d9qeg").should("have.text", "Upcoming Counseling");
				cy.get(".css-1e8vzpo");
			});
		});
	});
});
