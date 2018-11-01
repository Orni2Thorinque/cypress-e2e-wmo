/// <reference types='Cypress'/>

const LOGIN_CONFIG = {
  INPUT: {
    USERNAME: {
      REQUIRED: "Idenfiant requis"
    },
    PASSWORD: {
      REQUIRED: "Mot de passe requis"
    }
  },
  DOMAIN: {
    FIRST_LABEL: "ADJCDCORP",
    LAST_LABEL: "UNKNOWN",
    LENGTH: 31,
    FRANCE: {
      LABEL: "ADJCDFRANCE",
      VALUE: "fr.jcdecaux.org"
    }
  },
  REQUEST: {
    USERNAME: "royant",
    PASSWORD: "xxxxxx",
    URL_LOGIN: "**/authentication/login",
    URL_ENV: "**/rights/environments"
  }
};

context("Login Page", () => {
  beforeEach(() => {
    cy.visit("https://monitoring-digital.jcdecaux.com/monitoring-ui/");

    cy.get("input[type=email]").as("usernameInput");
    cy.get("input[type=password]").as("passwordInput");
    cy.get("input[type=checkbox]").as("externalUserInput");
    cy.get(".mat-select-value").as("domainSelect");
    cy.get("button").as("submitButton");
  });

  describe("Load Properly", () => {
    it("should display properly", () => {
      cy.get(".background-logo")
        .find("img")
        .should("be.visible");

      cy.get("@usernameInput")
        .should("have.attr", "type", "email")
        .and("have.value", "");

      cy.get("@passwordInput")
        .should("have.attr", "type", "password")
        .and("have.value", "");

      cy.get("@domainSelect")
        .children()
        .should("contain", LOGIN_CONFIG.DOMAIN.FIRST_LABEL);

      cy.get("@domainSelect").click();
      cy.get("mat-option").then(options => {
        expect(options).to.have.length(LOGIN_CONFIG.DOMAIN.LENGTH);
        expect(options.eq(options.length - 1)).to.contain(
          LOGIN_CONFIG.DOMAIN.LAST_LABEL
        );
      });
    });

    it("should handle input properly", () => {
      cy.get("@usernameInput")
        .type("username")
        .should("have.value", "username");

      cy.get("@passwordInput")
        .type("password", { delay: 100 })
        .should("have.value", "password");

      cy.get("@domainSelect").click();
      cy.get(".mat-select-panel-done-animating")
        .contains(LOGIN_CONFIG.DOMAIN.FRANCE.LABEL)
        .click();
      cy.get(".username-suffix", { log: true }).should(
        "contain",
        LOGIN_CONFIG.DOMAIN.FRANCE.VALUE
      );
    });
  });

  describe("Validation", () => {
    it("should set error on username", () => {
      cy.get("@usernameInput")
        .type("random text", { delay: 100 })
        .type("{del}{selectall}{backspace}", { delay: 100 });
      cy.root().click();
      cy.get("mat-error").should(
        "have.text",
        LOGIN_CONFIG.INPUT.USERNAME.REQUIRED
      );
    });

    it("should set error on password", () => {
      cy.get("@passwordInput")
        .type("random text", { delay: 100 })
        .type("{del}{selectall}{backspace}");
      cy.root().click();

      cy.get("mat-error").should(
        "have.text",
        LOGIN_CONFIG.INPUT.PASSWORD.REQUIRED
      );
    });
  });

  describe("Log in app", () => {
    it("should get a token and envs", () => {
      cy.server();
      cy.route("GET", LOGIN_CONFIG.REQUEST.URL_LOGIN).as("getToken");
      cy.route("GET", LOGIN_CONFIG.REQUEST.URL_ENV).as("getEnv");

      cy.get("@usernameInput").type(LOGIN_CONFIG.REQUEST.USERNAME, {
        delay: 100
      });
      cy.get("@passwordInput").type(LOGIN_CONFIG.REQUEST.PASSWORD, {
        delay: 100
      });
      cy.get("@domainSelect").click();
      cy.get(".mat-select-panel-done-animating")
        .contains(LOGIN_CONFIG.DOMAIN.FRANCE.LABEL)
        .click();
      cy.get("@submitButton").click({ force: true });

      cy.wait("@getToken")
        .its("status")
        .should("eq", 200);
      cy.wait("@getEnv", { timeout: 60000 })
        .its("status")
        .should("eq", 200);
    });
  });
});
