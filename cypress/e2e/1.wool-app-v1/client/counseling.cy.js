// * Test passed
//? Skipped the (-) test cases

describe(`Counseling Feature`, () => {
	context("Desktop 1080p", () => {
		context(`Client Side`, () => {
			beforeEach(() => {
				cy.viewport(1920, 1080);
				cy.loginBackendWithSession(
					`${Cypress.env("user").usernameHarambe}`,
					`${Cypress.env("user").passwordHarambe}`
				);
				cy.visit("/");
				cy.get(".css-2us6ol > :nth-child(4)").click();
			});
			it(`empty state counseling`, () => {
				cy.loginBackend({
					identifier: `${Cypress.env("user").usernameAutomation}`,
					password: `${Cypress.env("user").passwordAutomation}`,
				});
				cy.get(".css-2us6ol > :nth-child(4)").click();

				cy.get(".css-188n77j > .chakra-heading").should(
					"have.text",
					"Counseling"
				);
				cy.get(".swiper-button-prev").click();
				cy.get(".css-2eq333 > :nth-child(1)").should(
					"have.text",
					"Pricing"
				);
				cy.get(".swiper-button-prev").click();
				cy.get(".css-jwor03 > .chakra-heading").should(
					"have.text",
					"Features"
				);
			});
			it(`(+)Verify that user can view list of counselling schedule`, () => {
				cy.wait(1000);
				cy.get(".css-a3wiak")
					.children()
					.should("have.length.at.least", 1);
			});
			it(`Assert the dropdown list of counseling type`, () => {
				cy.wait(2000);
				cy.get(":nth-child(2) > .chakra-button").click();
				cy.get("select[name='type']")
					.children()
					.should(($lis) => {
						expect($lis, "8 items").to.have.length(8);
						expect($lis.eq(0), "first item").to.have.text(
							"Select type"
						);
						expect($lis.eq(1), "second item").to.contain(
							"Professional Development"
						);
						expect($lis.eq(2), "thrid item").to.contain(
							"Academic Development"
						);
						expect($lis.eq(3), "fourth item").to.contain(
							"Personal Development"
						);
						expect($lis.eq(4), "fifth item").to.contain(
							"Mental Health Awareness"
						);
						expect($lis.eq(5), "sixth item").to.contain(
							"Relationship"
						);
						expect($lis.eq(6), "seventh item").to.contain("Family");
						expect($lis.eq(7), "eight item").to.contain(
							"Parenting"
						);
					});
			});
			it(`(+)Verify that user can view list of the previous counselling schedule`, () => {
				cy.get("select[name='sortBy']").select(1);
				cy.get("select[name='orderBy']").select(3);
				cy.get(".css-a3wiak")
					.children()
					.should("have.length.at.least", 1);
			});
			it(`(+)Verify that user can request for new schedule for counselling`, () => {
				cy.wait(1000);
				cy.get(":nth-child(2) > .chakra-button").click();
				cy.get(`input[name='date']`).type("2023-10-31");
				cy.get(`select[name='time']`).children(2);
				cy.get(`select[name='time']`).select(1);
				cy.get("select[name='type']").select(2);
				cy.get("select[name='method']").select(1);
				cy.request(
					"GET",
					`${Cypress.env("jsonPlaceholder_url")}/posts/1`
				).then((response) => {
					const resBody = response.body;
					cy.get("#notes").type("test counseling - " + resBody.body);
				});
				cy.get(".css-p3acq4 > .css-186k2hk").click();
				cy.get(".css-l1ymkf > .css-186k2hk").click();
				cy.get(".css-12tf880").should(
					"have.text",
					"Counseling Created"
				);
				cy.get("#toast-1-title").should("contain", "Success");
				cy.get("#toast-1-description").should(
					"contain",
					"Schedule Created"
				);
			});
			it.skip(`(-)Verify that user cannot view list of counseling page`, () => {});
			it.skip(`(+)Verify that user can get invoice in their email after making a schedule`, () => {}); // hard to test
			it.skip(`(+)Verify that user can give a feedback about the counselling`, () => {}); // undeveloped
			it.skip(`(-)Verify that user cannot leave the rating star empty`, () => {}); // undeveloped
			it.skip(`(-)Verify that user can leave empty the desc box`, () => {});
			it.skip(`(+)Verify that user can give report about the counselling`, () => {}); // undeveloped
		});
		context(`Partner Side`, () => {
			beforeEach(() => {
				cy.viewport(1920, 1080);
				cy.loginBackendWithSession(
					`${Cypress.env("user").usernameHanif}`,
					`${Cypress.env("user").passwordHanif}`
				);
				cy.visit("/");
				cy.get(".css-2us6ol > :nth-child(4)").click();
			});
			it(`(+)Verify that coach can view list of counselling schedule`, () => {
				cy.wait(1000);
				cy.get(".css-a3wiak")
					.children()
					.should("have.length.at.least", 1);
			});
			it(`See the counseling detail`, () => {
				cy.wait(1000);
				cy.get(".css-a3wiak > :nth-child(1)").click();
				cy.get(".css-9tf9ac")
					.children()
					.should("have.length.at.least", 9)
					.should(($list) => {
						expect($list.eq(0), "first item").to.contain(
							"Personal Data Information"
						);
						expect($list.eq(2), "third item").to.contain("Journal");
						expect($list.eq(4), "fourth item").to.contain(
							"Enneagram Result"
						);
						expect($list.eq(6), "seventh item").to.contain(
							"Schedule List"
						);
						// expect($list.eq(8), "ninth item").to.contain(
						// 	"Counseling Type"
						// );
					});
			});
			it(`See the client detail from counseling detail`, () => {
				cy.wait(1000);
				cy.get(".css-a3wiak > :nth-child(1)").click();
				cy.get(".css-9q6az3")
					.should("have.text", "Detail User")
					.click();
			});
		});
		context(`Admin Side`, () => {
			// undeveloped
		});
	});
});
