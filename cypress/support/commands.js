import { NGRX_STORE_LOGIN } from '../fixtures/local-storage-login.constants';
import { _HTTP_AUTH_PRD } from '../fixtures/_prv_data.constants';
import { LOGIN_CONFIG } from '../fixtures/login.constants';
import { ROUTES_URL } from '../fixtures/route-url.constants';

// Get token from OpsAuth and set in local storage
Cypress.Commands.add('setTokenInStorage', () => {
  cy.request({
    method: 'GET',
    url: ROUTES_URL.LOGIN_VIEW,
    headers: {
      'X-UserId': _HTTP_AUTH_PRD.LOGIN,
      Authorization: _HTTP_AUTH_PRD.CRYPT_PASS,
      'Content-Type': 'application/json',
      'X-ExternalUser': false,
      'X-App-Trigramme': 'MONITORING',
    },
  }).then(resp => {
    const storeLoginKey = 'login';
    let storeLoginValue = NGRX_STORE_LOGIN;

    storeLoginValue.token.content = resp.body;
    storeLoginValue = JSON.stringify(storeLoginValue);

    window.localStorage.setItem(storeLoginKey, storeLoginValue);
  });
});

// Get token from OpsAuth and set in local storage
Cypress.Commands.add('doLogin', (username, password, domain) => {
  cy.visit(ROUTES_URL.LOGIN_VIEW);

  cy.get('input[type=email]').as('usernameInput');
  cy.get('input[type=password]').as('passwordInput');
  cy.get('input[type=checkbox]').as('externalUserInput');
  cy.get('.mat-select-value').as('domainSelect');
  cy.get('button').as('submitButton');

  cy.get('@usernameInput').type(username);
  cy.get('@passwordInput').type(password);
  cy.get('@domainSelect').click();
  cy.get('.mat-select-panel-done-animating')
    .contains(domain)
    .click();
  cy.get('@submitButton').click({ force: true });
});

Cypress.Commands.add('stubLogin', () => {
  cy.server();
  cy.fixture('http-response/environment.http-response.json').as('httpEnvJSON');
  cy.route({
    method: 'GET',
    url: ROUTES_URL.ENVIRONMENTS,
    response: '@httpEnvJSON',
  });

  cy.fixture('http-response/overload-config.http-response.json').as('httpOverloadConfigJSON');
  cy.route({
    method: 'GET',
    url: ROUTES_URL.OVERLOAD_CONFIG,
    response: '@httpOverloadConfigJSON',
  });

  cy.fixture('http-response/preference-perimeter.http-response.json').as('httpPerimeterJSON');
  cy.route({
    method: 'GET',
    url: ROUTES_URL.PREFERENCE_PERIMETER,
    response: '@httpPerimeterJSON',
  });

  const username = _HTTP_AUTH_PRD.USERNAME;
  const password = _HTTP_AUTH_PRD.PASS;
  const domain = _HTTP_AUTH_PRD.DOMAIN;

  cy.visit(ROUTES_URL.LOGIN_VIEW);

  cy.get('input[type=email]').as('usernameInput');
  cy.get('input[type=password]').as('passwordInput');
  cy.get('input[type=checkbox]').as('externalUserInput');
  cy.get('.mat-select-value').as('domainSelect');
  cy.get('button').as('submitButton');

  cy.get('@usernameInput').type(username);
  cy.get('@passwordInput').type(password);
  cy.get('@domainSelect').click();
  cy.get('.mat-select-panel-done-animating')
    .contains(domain)
    .click();
  cy.get('@submitButton').click({ force: true });
});
