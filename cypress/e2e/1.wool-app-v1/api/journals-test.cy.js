// * Test Passed

import { faker } from "@faker-js/faker";

const titleJournal = faker.lorem.sentence({ min: 3, max: 5 });
const descJournal = faker.lorem.paragraph({ min: 1, max: 3 });

let journalId;
let accessToken;
let identifier;
let password;
let feedbackId;

const option = {
	method: "POST",
	url: `${Cypress.env("api_url")}/auth/sign-in`,
	body: {
		identifier,
		password,
	},
};

describe(`journal-client-endpoint`, () => {
	context(`Client area`, () => {
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
		it.only(`client-journal-post`, () => {
			console.log(accessToken);
			cy.request({
				method: "POST",
				url: `${Cypress.env("back_url")}/journals`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
				body: {
					title: titleJournal,
					description: descJournal,
					isPrivate: false,
					category: "daily",
				},
			}).then((res) => {
				let respBody = res.body;
				journalId = respBody.id;
				expect(respBody.category).contain("daily");
			});
		});
		it.only(`comment-as-client`, () => {
			cy.request({
				method: "POST",
				url: `${Cypress.env(
					"back_url"
				)}/journals/${journalId}/feedbacks`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
				body: {
					description: faker.lorem.sentence(5),
				},
			}).then((res) => {
				expect(res.body.description).is.not.null;
				expect(res.body.journalId).is.eq(journalId);
			});
		});
	});
	context(`Coach Area`, () => {
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
		it.only(`coach-journal-get`, () => {
			cy.request({
				method: "get",
				url: `${Cypress.env("back_url")}/journals/${journalId}`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
				qs: {
					includeFeedbacks: true,
				},
			}).then((res) => {
				let respBody = res.body;
				journalId = respBody.id;
				expect(respBody.category).contain("daily");
			});
		});
		it.only(`comment-as-coach`, () => {
			cy.request({
				method: "POST",
				url: `${Cypress.env(
					"back_url"
				)}/journals/${journalId}/feedbacks`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
				body: {
					description: faker.lorem.sentence(5),
				},
			}).then((res) => {
				expect(res.body.description).is.not.null;
				expect(res.body.journalId).is.eq(journalId);

				feedbackId = res.body.id;
			});
		});
		it.skip(`delete-comment-on-journal-by-coach`, () => {
			cy.request({
				method: "DELETE",
				url: `http://back.wool.id/journals/${journalId}/feedbacks/${feedbackId}`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			});
		});
	});
});
