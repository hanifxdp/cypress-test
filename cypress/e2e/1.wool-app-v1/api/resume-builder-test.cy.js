// * Test Passed

let userId;
let accessToken;
let resumeId = 0;

const identifier = `${Cypress.env("user").usernameGelos}`;
const password = `${Cypress.env("user").passwrodGelos}`;

const option = {
	method: "POST",
	// url: `${Cypress.env("api_url")}/auth/sign-in`,
	url: "http://back.wool.id/auth/sign-in",
	body: {
		identifier,
		password,
	},
};

before(() => {
	cy.request(option).then((res) => {
		console.log();
		userId = res.body.user.id;
		accessToken = res.body.access_token;
	});
});
describe(`Resume-endpoint`, () => {
	it(`initialize`, () => {
		cy.request({
			method: "PUT",
			url: `${Cypress.env(
				"back_url"
			)}/resumes/${resumeId}/personalInformation`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
			body: {
				firstName: "gelos",
				lastName: "Account",
				phoneNumber: "089123456789",
				email: "gelosaccount@wool.id",
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
	});
	it(`resume-get`, () => {
		cy.request({
			method: "GET",
			url: `${Cypress.env("back_url")}/resumes/${resumeId}`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
		}).then((res) => {
			cy.log(res);
		});
	});
	it(`experience`, () => {
		cy.request({
			method: "PUT",
			url: `${Cypress.env("back_url")}/resumes/28/experiences`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
			body: {
				experiences: [
					{
						companyName: "wool.id",
						companyLocation: "kota Bandung",
						role: "product analyst",
						startDate: "2023-07-19",
						endDate: "",
						isCurrent: true,
						industry: "software house",
						description: "wool app is a mental health app",
					},
				],
			},
		});
	});
	it(`education-endpoint`, () => {
		cy.request({
			method: "PUT",
			url: `${Cypress.env("back_url")}/resumes/${resumeId}/educations`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
			body: {
				educations: [
					{
						name: "unpad",
						level: "bachelor degree",
						major: "computer science",
						startDate: "2018-08-27",
						endDate: "2022-08-31",
						isCurrent: false,
						gpa: "3.99",
						description: "unpad jatinangor, bukan bandung",
					},
				],
			},
		});
	});
	it(`organization-endpoint`, () => {
		cy.request({
			method: "PUT",
			url: `${Cypress.env("back_url")}/resumes/${resumeId}/organizations`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
			body: {
				organizations: [
					{
						name: "mafia tanah",
						position: "Collector",
						startDate: "2021-08-14T00:00:00.000Z",
						endDate: "2023-09-14T00:00:00.000Z",
						description: "gitu weh kerjanya",
					},
				],
			},
		});
	});
	it(`additional data`, () => {
		cy.request({
			method: "PUT",
			url: `${Cypress.env(
				"back_url"
			)}/resumes/${resumeId}/additionalData`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
			body: {
				additionalData: [
					{
						name: "latihan kepalan tangan dengan sangat kuat",
						category: "tinju",
					},
				],
			},
		});
	});
	it(`look at the cv`, () => {
		cy.request({
			method: "GET",
			url: `http://back.wool.id/resumes/${resumeId}
				`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
			qs: {
				includeUser: true,
				includePersonalInformation: true,
				includeExperiences: true,
				includeEducations: true,
				includeOrganizations: true,
				includeAdditionalData: true,
				includePercentage: true,
			},
		}).then((res) => {
			console.log(res);
		});
	});
	it(`get many`, () => {
		cy.request({
			method: "GET",
			url: `${Cypress.env("back_url")}/resumes`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
			qs: {
				page: 1,
				take: 10,
				orderBy: "createdAt",
				sortBy: "desc",
				searchBy: "name",
				includeUser: true,
				includePersonalInformation: true,
			},
		}).then((res) => {
			expect(res.body.data).is.not.null;
			expect(res.body.data).have.length.above(1);
			expect(res.body.total).is.a("number");
			resumeId = res.body.data[0].id;
			cy.log(res);
		});
	});
	it.skip(`delelte`, () => {
		cy.request({
			method: "DELETE",
			url: `${Cypress.env("back_url")}/resumes/${resumeId}`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
		}).then((res) => {
			cy.log(res.statusCode);
		});
	});
	it(`get-relation`, () => {
		cy.request({
			method: "GET",
			url: `${Cypress.env("back_url")}/resumes/${resumeId}/experiences`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
		}).then((res) => {
			expect(res.body[0]).is.not.null;
			expect(res.body[0].id).is.a("number");
			expect(res.body[0].resumeId).is.a("number");
			expect(res.body[0].companyName).is.a("string");
		});
	});
	it(`get-percentage`, () => {
		cy.request({
			method: "GET",
			url: `${Cypress.env("back_url")}/resumes/${resumeId}/percentage`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
		}).then((res) => {
			expect(res.body.percentage).is.a("number");
			expect(res.body.percentage).is.above(20);
		});
	});
	it(`change-name`, () => {
		cy.request({
			method: "PUT",
			url: `${Cypress.env("back_url")}/resumes/${resumeId}`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
			body: {
				name: "Harambe Akatsuki",
			},
		}).then((res) => {
			expect(res.body.name).is.a("string");
			expect(res.body.id).is.eq(resumeId);
		});
	});
});
