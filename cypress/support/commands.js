import { NGRX_STORE_LOGIN } from '../fixtures/local-storage-login.constants';
import { _HTTP_AUTH_PRD } from '../fixtures/_prv_data.constants';

// Get token from OpsAuth and set in local storage
Cypress.Commands.add('setTokenInStorage', () => {
  cy.request({
    method: 'GET',
    url: 'https://monitoring-digital.jcdecaux.com/monitoring/api/v1/authentication/login',
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
Cypress.Commands.add('login', (username, password, domain) => {
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
