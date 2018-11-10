/// <reference types='Cypress'/>
import { ROUTES_URL } from '../../../fixtures/route-url.constants';
import { LOGIN_CONFIG } from '../../../fixtures/login.constants';

context('Listview Page', () => {
  before(() => {});

  beforeEach(() => {
    cy.viewport(1600, 900);

    cy.doLogin(LOGIN_CONFIG.REQUEST.USERNAME, LOGIN_CONFIG.REQUEST.PASSWORD, LOGIN_CONFIG.REQUEST.DOMAIN);

    cy.get('[href="#/home/list"]', { timeout: 60000 }).click();
    cy.get('.sidebar-shrunk-toogle', { timeout: 60000 }).as('sidebar');
    cy.get('.datatable-body-row', { timeout: 60000 }).as('rows');
  });

  xit('should display properly', () => {
    cy.server();
    cy.fixture('http-response/assets.http-response.json').as('httpAssetsJSON');
    cy.route({
      method: 'GET',
      url: ROUTES_URL.GET_ASSETS,
      response: '@httpAssetsJSON',
    });

    cy.get('@sidebar').click();
    cy.get('@sidebar').click();

    cy.get('@rows')
      .its('length')
      .should('be.equal', 4);

    cy.get('@rows')
      .first()
      .find('.mat-icon')
      .each((icon, index, all) => {
        if (index > 0) {
          expect(icon).to.have.css('fill', 'rgb(255, 0, 0)');
        }
      });

    cy.get('@rows')
      .last()
      .find('.mat-icon')
      .each((icon, index, all) => {
        if (index > 0) {
          expect(icon).to.have.css('fill', 'rgb(0, 128, 0)');
        }
      });
  });

  it('should be up to date', () => {
    cy.get('@sidebar').click();

    cy.get('ui-active-status')
      .find('mat-button-toggle')
      .first()
      .click();
    cy.get('ui-active-status')
      .find('mat-button-toggle')
      .last()
      .click();

    cy.get('app-broadsign-name-view')
      .find('.mat-select-trigger')
      .click();
    cy.get('.mat-select-content')
      .contains('ALL_DUS')
      .click();

    cy.get('@sidebar').click({ force: true });

    cy.get('.sort-button:nth(4)').click({ force: true });
    cy.get('.sort-button:nth(4)').click({ force: true });

    cy.get('.last-update-label').each(el => {
      const now = new Date();
      const lastUpdate = new Date(el.text());
      const timeDiffMillis = now - lastUpdate;
      const timeDiffMinutes = timeDiffMillis / (1000 * 60);
      expect(timeDiffMinutes).to.lessThan(20);
    });
  });
});
