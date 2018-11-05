/// <reference types='Cypress'/>
import { CHECKPAGE_CONFIG } from '../../../fixtures/chackpage.constants.js';

context('Listview Page', () => {
  beforeEach(() => {
    cy.visit('https://monitoring-digital.jcdecaux.com/monitoring-ui/checkpage');
  });

  it('should all be ok', () => {
    cy.viewport(1200, 800);

    cy.server();
    cy.route('GET', CHECKPAGE_CONFIG.URL).as('getStatus');
    cy.wait('@getStatus').then(response => {
      cy.get(':nth-child(1) > .mdl-list__item-secondary-content > .mdl-list__item-secondary-action > b')
        .invoke('text')
        .should('be.equal', CHECKPAGE_CONFIG.OK_LABEL);

      cy.get(':nth-child(3) > .mdl-list__item-secondary-content > .mdl-list__item-secondary-action > b')
        .invoke('text')
        .should('be.equal', CHECKPAGE_CONFIG.OK_LABEL);

      cy.get(':nth-child(4) > .mdl-list__item-secondary-content > .mdl-list__item-secondary-action > b')
        .invoke('text')
        .should('be.equal', CHECKPAGE_CONFIG.OK_LABEL);

      cy.get(':nth-child(5) > .mdl-list__item-secondary-content > .mdl-list__item-secondary-action > b')
        .invoke('text')
        .should('be.equal', CHECKPAGE_CONFIG.OK_LABEL);

      cy.get(':nth-child(6) > .mdl-list__item-secondary-content > .mdl-list__item-secondary-action > b')
        .invoke('text')
        .should('be.equal', CHECKPAGE_CONFIG.OK_LABEL);

      cy.screenshot();
    });
  });
});
