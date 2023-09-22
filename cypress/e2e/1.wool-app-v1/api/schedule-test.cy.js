let scheduleId;
let accessToken;

describe("schedule-test", () => {
	const client = (usernameClient) => {
		cy.loginBackendWithSession(usernameClient, "K@mbing123");
		cy.getCookie("access_token").then((e) => {
			accessToken = e.value;
		});
	};
	const partner = (usernamePartner) => {
		cy.loginBackendWithSession(usernamePartner, "password");
		cy.getCookie("access_token").then((e) => {
			accessToken = e.value;
		});
	};

	context(`Get-Schedule`, () => {
		it(`get-Schedule-client`, () => {
			client(harambe);
			cy.request({
				method: "GET",
				url: `${Cypress.env("back_url")}/schedules`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			}).then(() => {});
		});
		it(`get-Schedule-coach`, () => {
			coach(hanif);
			cy.request({
				method: "GET",
				url: `${Cypress.env("back_url")}/schedules`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			}).then(() => {});
		});
	});
	context(`Post-Schedule`, () => {
		it(`get-Schedule-client`, () => {
			client(harambe);
			cy.request({
				method: "GET",
				url: `${Cypress.env("back_url")}/schedules`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
				body: {
					notes: "string",
					time: "2023-09-20T08:00:00.000Z",
					method: "online",
					type: "professional development",
				},
			}).then(() => {});
		});
	});
});
