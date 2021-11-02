// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

const Global = require("../../src/Global");
const _Global = require("../../_Global");

// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
  cy.visit(Global.APP_URL + "/login");
  cy.url().should("contain", "login");
  cy.get("#identifier").type(email);
  cy.get("#password").type(password);
  cy.get("#login-btn").click();
  cy.wait(4000);
  cy.contains("Configure ").should("be.visible");
  cy.get("[data-cy=looking_for]").click();
  cy.contains("Change").click();
  cy.get("small").should("contain", "Get access to verified flat mates.");
});
Cypress.Commands.add("signup", (user_mock) => {
  cy.visit(Global.APP_URL + "/signup");
  cy.url().should("contain", "signup");
  cy.get("#first_name").type(user_mock.first_name);
  cy.get("#last_name").type(user_mock.last_name);
  cy.get("#email").type(user_mock.email);
  cy.get("#username").type(user_mock.username);
  cy.get("#phone_no").type(user_mock.phone_number);
  cy.get("#password").type(user_mock.password);
  cy.get("#confirm_password").type(user_mock.password);
  cy.get("#signup-btn").click();
  cy.wait(7000);
  cy.url().should("contain", "success");
  cy.contains("Activate Account").should("be.visible");
  cy.contains(user_mock.email).should("be.visible");
});
Cypress.Commands.add("cleanup", (user_mock) => {
  cy.log('=============== CLEANING UP ==================')
  cy.request({
    url: _Global.API_URL + "/sheruta/cleanup",
    method: "GET",
  })
    .then(res => {
      cy.log(`CLEAN UP -- ${res}`)
    })
});



//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
