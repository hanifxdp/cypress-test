// * Test Passed

const categoryType = [
	"enlightenment",
	"peace",
	"joy",
	"love",
	"reason",
	"acceptance",
	"willingness",
	"neutrality",
	"courage",
	"pride",
	"anger",
	"desire",
	"fear",
	"grief",
	"apathy",
	"guilt",
];

let accessToken;
let userID;
let dmhpId;

describe("dmhp-test", () => {
	context(`client side`, () => {
		before(() => {
			cy.loginBackendWithSession(
				`${Cypress.env("user").usernameHarambe}`,
				`${Cypress.env("user").passwordHarambe}`
			);
			cy.getCookie("access_token").then((e) => {
				accessToken = e.value;
			});
			cy.getCookie("id").then((e) => {
				userID = e.value;
			});
		});
		it(`dmhp-chart-test`, () => {
			cy.request({
				method: "GET",
				url: `http://back.wool.id/dmhps/chart`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			}).then((res) => {
				expect(res.body[0].y[0]).below(res.body[0].y[1]);
				expect(res.body[0].y[1]).above(res.body[0].y[0]);
			});
		});
		it(`latest`, () => {
			cy.request({
				method: "GET",
				url: `http://back.wool.id/dmhps/latest`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			}).then((res) => {
				expect(res.body.id).to.be.a("string");
				expect(res.body.minScore).is.above(0);
				expect(res.body.maxScore).is.above(res.body.minScore);
			});
		});
		it(`dmhp-list-test`, () => {
			cy.request({
				method: "GET",
				url: `http://back.wool.id/dmhps`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
			}).then((res) => {
				expect(res.body.total).is.not.null;
				expect(res.body.data).is.not.null;
			});
		});
	});
	context(`coach side`, () => {
		before(() => {
			cy.loginBackendWithSession(
				`${Cypress.env("user").usernameHanif}`,
				`${Cypress.env("user").passwordHanif}`
			);
			cy.getCookie("access_token").then((e) => {
				accessToken = e.value;
			});
		});
		it(`dmhp-chart-test`, () => {
			cy.request({
				method: "GET",
				url: `http://back.wool.id/dmhps/chart`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
				qs: {
					userId: userID,
				},
			}).then((res) => {
				expect(res.body).to.have.length.above(1);
				expect(res.body[0].y[0]).below(res.body[0].y[1]);
				expect(res.body[0].y[1]).above(res.body[0].y[0]);
			});
		});
		it(`latest`, () => {
			cy.request({
				method: "GET",
				url: `http://back.wool.id/dmhps/latest`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
				qs: {
					userId: userID,
				},
			}).then((res) => {
				dmhpId = res.body.id;
				expect(res.body.id).to.be.a("string");
				expect(res.body.minScore).is.above(0);
				expect(res.body.maxScore).is.above(res.body.minScore);
			});
		});
		it(`dmhp-list-test`, () => {
			cy.request({
				method: "GET",
				url: `http://back.wool.id/dmhps/${dmhpId}`,
				headers: {
					authorization: `bearer ${accessToken}`,
				},
				qs: {
					userId: userID,
				},
			}).then((res) => {
				expect(res.body.name).to.be.oneOf(categoryType);
				expect(res.body.total).is.not.null;
				expect(res.body.data).is.not.null;
			});
		});
	});
});
