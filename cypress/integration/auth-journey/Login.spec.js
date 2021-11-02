/// <reference types="cypress" />
import Global from "../../../src/Global";
import { user_mock } from "../../__mock__/user.mock";
beforeEach(() => {
  cy.viewport('macbook-16')
  cy.visit(Global.APP_URL + "/login");
});

describe("Testing signup flow", () => {
  it("should signup a new user", () => {;
    cy.url().should("contain", "login");
    cy.get("#identifier").type(user_mock.email);
    cy.get("#password").type(user_mock.password);
    cy.get("#login-btn").click();
    cy.wait(4000);
    cy.contains("Configure ").should('be.visible');
    cy.get("[data-cy=looking_for]").click();
    cy.contains('Change').click();
    cy.get("small").should("contain", "Get access to verified flat mates.");
  });
});
