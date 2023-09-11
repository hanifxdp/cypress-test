import akun from "../../../fixtures/akunTest.json";

describe(`Counseling Feature`, () => {
	context("Desktop 1080p", () => {
		beforeEach(() => {
			cy.viewport(1920, 1080);
			cy.loginBackend({ identifier: "harambe", password: "H@rambe123" });
			cy.get(".css-2us6ol > :nth-child(4)").click();
		});
		it(`Empty Counseling`, () => {
			cy.get(".css-12tf880").should("contain", "Counseling");
			cy.get(".chakra-text.css-1fclo06").should(
				"contain",
				"Belum ada jadwal konsultasi nih"
			);
			cy.get(".chakra-text.css-11h840c").should(
				"contain",
				"yuk buat jadwal kosultasi pertamamu, dengan klik button dibawah ini!"
			);
		});
		it(`Assert the dropdown list of counseling type`, () => {
			cy.get(":nth-child(2) > .chakra-button").click();
			cy.get("select[name='type']")
				.children()
				.should(($lis) => {
					expect($lis, "8 items").to.have.length(8);
					expect($lis.eq(0), "first item").to.have.text("Select type");
					expect($lis.eq(1), "second item").to.contain(
						"Professional Development"
					);
					expect($lis.eq(2), "thrid item").to.contain("Academic Development");
					expect($lis.eq(3), "fourth item").to.contain("Personal Development");
					expect($lis.eq(4), "fifth item").to.contain(
						"Mental Health Awareness"
					);
					expect($lis.eq(5), "sixth item").to.contain("Relationship");
					expect($lis.eq(6), "seventh item").to.contain("Family");
					expect($lis.eq(7), "eight item").to.contain("Parenting");
				});
		});
		it.only(`(+)Verify that user can view list of counselling schedule`, () => {
			cy.wait(1000);
			cy.get(".css-a3wiak").children().should("have.length.at.least", 1);
		});
		it.skip(`(-)Verify that user cannot view list of counseling page`, () => {});
		it(`(+)Verify that user can view list of the previous counselling schedule`, () => {
			cy.get("select[name='orderBy']").select(3);
			cy.get(".css-a3wiak").children().should("have.length.at.least", 1);
		});
		it(`(+)Verify that user can request for new schedule for counselling`, () => {
			cy.wait(1000);
			cy.get(":nth-child(2) > .chakra-button").click();
			cy.get(`input[name='date']`).type("2023-10-01");
			cy.get(`select[name='time']`)
				.children(2)
				.should(($list) => {
					expect($list, "10 items").to.have.length(10);
				});
			cy.get(`select[name='time']`).select(3);
			cy.get("select[name='type']").select(2);
			cy.get("select[name='method']").select(1);
			cy.request("GET", `${Cypress.env("jsonPlaceholder_url")}/posts/1`).then(
				(response) => {
					const resBody = response.body;
					cy.get("#notes").type(resBody.body);
				}
			);
			cy.get(".css-p3acq4 > .css-186k2hk").click();
			cy.get(".css-l1ymkf > .css-186k2hk");
		});
		it.skip(`(+)Verify that user can get invoice in their email after making a schedule`, () => {});
		it.skip(`(+)Verify that user can give a feedback about the counselling`, () => {});
		it.skip(`(-)Verify that user cannot leave the rating star empty`, () => {});
		it.skip(`(-)Verify that user can leave empty the desc box`, () => {});
		it.skip(`(+)Verify that user can give report about the counselling`, () => {});
	});
});
