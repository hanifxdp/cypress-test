import { faker } from "@faker-js/faker";

let scheduleId;
let transactionId;
let questionnaireQuestion;
let accessToken;

describe("schedule-test", () => {
	context(`client area (initialization)`, () => {
		before(() => {
			cy.loginBackendWithSession(
				`${Cypress.env("user").usernameHarambe}`,
				`${Cypress.env("user").passwordHarambe}`
			);
			cy.getCookie("access_token")
				.should("exist")
				.then((c) => {
					accessToken = c.value;
				});
		});
		it(`get-Schedule-client`, () => {
			cy.request({
				method: "GET",
				url: `${Cypress.env("back_url")}/schedules`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			}).then((res) => {
				expect(res.body.data).not.to.be.null;
				expect(res.body.total).is.a("number");
				expect(res.body.isEmpty).eq(false);
			});
		});
		it(`post-Schedule-client`, () => {
			cy.request({
				method: "POST",
				url: `${Cypress.env("back_url")}/schedules`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
				body: {
					notes: "test-counseling",
					time: faker.date.between({
						from: "2023-09-30T01:00:00.000Z",
						to: "2023-09-30T08:00:00.000Z",
					}),
					method: "online",
					type: "professional development",
				},
			}).then((res) => {
				scheduleId = res.body.id;
				transactionId = res.body.transactionId;
				expect(res.body).is.not.null;
				expect(res.body.notes).is.a("string");
				expect(res.body.status).eq(0);
			});
		});
		it(`change-status-payment-to-settlement`, () => {
			cy.request({
				method: "PUT",
				url: `${Cypress.env(
					"back_url"
				)}/transactions/${transactionId}/payment`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			});
		});
	});
	context(`admin role`, () => {
		before(() => {
			cy.loginBackendWithSession(
				`${Cypress.env("user").usernameAdmin}`,
				`${Cypress.env("user").passwordAdmin}`
			);
			cy.getCookie("access_token").then((e) => {
				accessToken = e.value;
			});
		});
		it(`acc the payment`, () => {
			cy.request({
				method: "PUT",
				url: `${Cypress.env(
					"back_url"
				)}/transactions/${transactionId}/approved`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			});
		});
	});
	context(`Coach area (Approving the schedule)`, () => {
		before(() => {
			cy.loginBackendWithSession(
				`${Cypress.env("user").usernameHanif}`,
				`${Cypress.env("user").passwordHanif}`
			);
			cy.getCookie("access_token")
				.should("exist")
				.then((c) => {
					accessToken = c.value;
				});
		});
		it(`get-Schedule-coach`, () => {
			cy.request({
				method: "GET",
				url: `${Cypress.env("back_url")}/schedules`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			});
		});
		it("acc-schedule", () => {
			cy.request({
				method: "PUT",
				url: `${Cypress.env(
					"back_url"
				)}/schedules/${scheduleId}/confirmation`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
				body: {
					isApproved: true,
				},
			});
		});
	});
	context(`Client answer assessment`, () => {
		before(() => {
			cy.loginBackendWithSession(
				`${Cypress.env("user").usernameHarambe}`,
				`${Cypress.env("user").passwordHarambe}`
			);
			cy.getCookie("access_token")
				.should("exist")
				.then((c) => {
					accessToken = c.value;
				});
		});
		it(`get-questionnaire`, () => {
			cy.request({
				method: "GET",
				url: `${Cypress.env("back_url")}/questionnaires`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			}).then((res) => {
				questionnaireQuestion = res.body;
			});
		});
		it(`answer the assessment`, () => {
			const questionnaireAnswers = questionnaireQuestion.map((v) => {
				return {
					questionnaireId: v.id,
					answer: faker.number.int({ min: 1, max: 9 }),
				};
			});
			cy.request({
				method: "PUT",
				url: `${Cypress.env(
					"back_url"
				)}/schedules/${scheduleId}/questionnaire-answer`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
				body: {
					questionnaireAnswers,
				},
			});
		});
	});
});
