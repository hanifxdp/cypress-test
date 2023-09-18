let userId;
let access_token;
let resumeId = 0;

const identifier = "tfs123";
const password = "T@fs123";

const option = {
	method: "POST",
	url: `${Cypress.env("api_url")}/auth/sign-in`,
	body: {
		identifier,
		password,
	},
};

before(() => {
	cy.request(option).then((res) => {
		userId = res.body.user.id;
		access_token = res.body.access_token;
	});
	cy.request({
		method: "PUT",
		url: `${Cypress.env(
			"back_url"
		)}/resumes/${resumeId}/personalInformation`,
		headers: {
			authorization: `bearer ${access_token}`,
		},
		body: {
			firstName: "testCoach",
			lastName: "Baru",
			phoneNumber: "089123456789",
			email: "client@wool.id",
			linkedInUrl: "https://www.linkedin.com/in/rifqi-finaldy/",
			portofolioUrl: "https://www.linkedin.com/in/rifqi-finaldy/",
			address: "bandung",
			summary: "apa aja lah yang penting senang",
			photoUrl: undefined,
		},
	}).then((res) => {
		cy.log(res.body.id);
		resumeId = res.body.id;
	});

	describe(`Resume-endpoint`, () => {
		it(`resume-get`, () => {
			cy.request({
				method: "GET",
				url: `${Cypress.env("back_url")}/resumes/${resumeId}`,
				headers: {
					authorization: `bearer ${access_token}`,
				},
			}).then((res) => {
				cy.log(res);
			});
		});
		it(`experience`, () => {
			cy.request({
				method: "PUT",
				url: `${Cypress.env(
					"api_url"
				)}/resumes/${resumeId}/experiences`,
				headers: {
					authorization: `bearer ${access_token}`,
				},
				body: {
					experiences: [
						{
							companyName: "string",
							companyLocation: "string",
							role: "string",
							startDate: "2023-09-14T00:00:00.000Z",
							endDate: "2023-09-14T00:00:00.000Z",
							isCurrent: true,
							industry: "string",
							description: "string",
							docUrl: "string",
						},
					],
				},
			});
		});
		it(`education-endpoint`, () => {
			cy.request({
				method: "PUT",
				url: `${Cypress.env("api_url")}/resumes/${resumeId}/educations`,
				headers: {
					authorization: `bearer ${access_token}`,
				},
				body: {
					educations: [
						{
							name: "string",
							level: "string",
							major: "string",
							startDate: "2023-09-14T00:00:00.000Z",
							endDate: "2023-09-14T00:00:00.000Z",
							isCurrent: true,
							gpa: "3.00",
							description: "string",
							docUrl: "string",
						},
					],
				},
			});
		});
		it(`organization-endpoint`, () => {
			cy.request({
				method: "PUT",
				url: `${Cypress.env(
					"api_url"
				)}/resumes/${resumeId}/organizations`,
				headers: {
					authorization: `bearer ${access_token}`,
				},
				body: {
					organizations: [
						{
							name: "string",
							position: "string",
							startDate: "2023-09-14T00:00:00.000Z",
							endDate: "2023-09-14T00:00:00.000Z",
							description: "string",
							docUrl: "string",
						},
					],
				},
			});
		});
		it(`additional data`, () => {
			cy.request({
				method: "PUT",
				url: `${Cypress.env(
					"api_url"
				)}/resumes/${resumeId}/additionalData`,
				headers: {
					authorization: `bearer ${access_token}`,
				},
				body: {
					additionalData: [
						{
							name: "string",
							category: "string",
							docUrl: "string",
						},
					],
				},
			});
		});
		it(`delelte`, () => {
			cy.request({
				method: "DELETE",
				url: `${Cypress.env("back_url")}/resumes/${resumeId}`,
				headers: {
					authorization: `bearer ${access_token}`,
				},
			}).then((res) => {
				cy.log(res.statusCode);
			});
		});
	});
});
