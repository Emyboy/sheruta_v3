/// <reference types="cypress" />
import Global from "../../../src/Global";
import { user_mock } from "../../__mock__/user.mock";
beforeEach(() => {
  // cy.visit(Global.APP_URL);
  cy.viewport("macbook-16");
});

describe("Testing signup flow", () => {
  it("should signup, login, then get started", () => {
    cy.cleanup();
    cy.signup(user_mock);
    cy.login(user_mock.email, user_mock.password);
    cy.get("[data-cy=get_started_popup_btn]").click();
    cy.wait(3000);
    // get started step 1
    cy.contains("What You Should Know").should("be.visible");
    cy.get("#agree-btn").click();
    // step 2 - user gender
    cy.get("#select-card").first().click();
    cy.get("#next-btn").click();
    cy.wait(3000);
    // step 3 - user look for gender
    cy.get("#select-card").first().click();
    cy.get("#next-btn").click();
    // step 4 - user preferred location
    cy.get(".css-1hwfws3").click();
    cy.get(".css-1hwfws3").type("lagos");
    cy.wait(3000);
    cy.get("#react-select-3-option-3").click();
    cy.get("button").contains("Add").click();
    cy.wait(3000);
    cy.get("button").contains("done").click();
    // step 5 - user personal info
    cy.get("input").eq(0).type("Music Producer");
    cy.get("input").eq(1).type("Emiz Music");
    cy.get("input").eq(2).type("No 5 Place Av");
    cy.get("input").eq(3).type("Young John");
    cy.get("input").eq(4).type("Johnny Somebody");
    cy.get("input").eq(5).click();
    cy.get("#react-select-3-option-2").click();
    cy.get("input").eq(6).type("tester");
    cy.get("input").eq(7).type("testergram");
    cy.get("input").eq(8).type("tester_");
    cy.get("input").eq(9).type("www.linkme.com/in");
    cy.get('[data-cy=submit-btn').click();
    cy.wait(3000);
    // step 6 - user personal info
  });
});
