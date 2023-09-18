// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

let token;

Cypress.Commands.add("login", (usernameClient, password) => {
	cy.visit("/auth/login");
	cy.get("input[placeholder='Email or username']")
		.type(usernameClient)
		.should("have.value", usernameClient);
	cy.get("input[placeholder='Password']")
		.type(password)
		.should("have.value", password);
	cy.get('button[type="submit"]').click();
});

Cypress.Commands.add("logoTulisan", () => {
	cy.get("img[alt='logo_wool']").should("be.visible");
});

Cypress.Commands.add("logoW", () => {
	cy.get("img[alt=wool-logo").should("be.visible");
});

Cypress.Commands.add("skipEnneagram", (enneagram, enneagramDesc) => {
	cy.get(".chakra-text")
		.should("contain", enneagramDesc)
		.should("be.visible")
		.and("exist");
	cy.get(".chakra-heading")
		.should("contain", enneagram)
		.should("be.visible")
		.and("exist");
	cy.contains("Nanti deh").click();
});

Cypress.Commands.add("clickTombolSubmit", () => {
	cy.get('button[type="submit"]').click();
});

Cypress.Commands.add("clickTombolButton", () => {
	cy.get('button[type="button"').click();
});

Cypress.Commands.add("subscribe", () => {
	cy.visit("/dashboard/client/journal");
	cy.get("span[aria-label='Go to slide 3']").click();
	cy.tombolButton().click();
	cy.get("select[name='duration']").click();
	cy.get("option[value='6']").click();
	cy.check(".chakra-checkbox__control.css-1ydjfm6");
	cy.tombolSubmit().click();
});

Cypress.Commands.add("loginBackend", ({ identifier, password }) => {
	cy.request(
		"POST",
		`${Cypress.env("api_url")}${Cypress.env("path").loginBackend_url}`,
		{
			identifier,
			password,
		}
	).then((response) => {
		const roleUser = response.body.user.role;
		token = response.body.access_token;
		cy.setCookie("access_token", token);
		const path = Cypress.env("path").homepage_url;
		const replacePath = path.replace("[roles]", roleUser);
		cy.visit(replacePath);
	});
});

Cypress.Commands.add("logoutBackend", () => {
	cy.request("POST", "http://dev2.wool.id/api/logout", {}).then(() => {
		cy.clearAll();
	});
});

Cypress.Commands.add("clearAll", () => {
	cy.clearAllCookies();
	cy.clearAllLocalStorage();
	cy.clearAllSessionStorage();
});

Cypress.Commands.add("", (width, height) => {
	cy.viewport(width, height);
});

Cypress.Commands.add("loginUIWithSession", (username, password) => {
	let cookie;
	cy.session(
		[username, password],
		() => {
			cy.visit("/auth/login");
			cy.get("input[placeholder='Email or username']")
				.type(username)
				.should("have.value", username);
			cy.get("input[placeholder='Password']")
				.type(password)
				.should("have.value", password);
			cy.get('button[type="submit"]').click();
			cy.url().should("contain", "/dashboard");
			cy.getCookie("access_token")
				.should("exist")
				.then((c) => {
					cookie = c.value;
				});
		},
		{
			validate() {
				cy.request({
					methods: "GET",
					url: `${Cypress.env("api_url")}/users/me`,
					headers: {
						authorization: `bearer ${cookie}`,
					},
				})
					.its("status")
					.should("eq", 200);
			},
		}
	);
});

Cypress.Commands.add("loginBackendWithSession", (identifier, password) => {
	cy.session({ identifier, password }, () => {
		cy.request({
			method: "POST",
			url: `${Cypress.env("api_url")}/auth/sign-in`,
			body: {
				identifier,
				password,
			},
		}).then((res) => {
			cy.setCookie("access_token", res.body.access_token);
		});
	});
});
