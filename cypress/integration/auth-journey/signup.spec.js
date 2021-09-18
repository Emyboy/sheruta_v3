/// <reference types="cypress" />
import Global from "../../../src/Global";
import { user_mock } from "../../__mock__/user.mock";
beforeEach(() => {
  cy.visit(Global.APP_URL);
  cy.viewport('macbook-16')
});

describe("Testing signup flow", () => {
  it("should signup a new user", () => {
    cy.get("[data-cy=sidebar-toggle").click();
    cy.contains("Login / Signup").click();
    cy.url().should("contain", "login");
    cy.get("#signup-btn").click();
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

  // it("should show activate your account message", () => {
  //   cy.visit(Global.APP_URL + "/login");
  //   cy.url().should("contain", "login");
  //   cy.get("#identifier").type(user_mock.email);
  //   cy.get("#password").type(user_mock.password);
  //   cy.get("#login-btn").click();
  //   cy.contains("Please Verify You Email").should('be.visible');
  // });
});
