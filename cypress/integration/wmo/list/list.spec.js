/// <reference types='Cypress'/>

context('Listview Page', () => {
  before(() => {
	  cy.setTokenInStorage();
  });

  beforeEach(() => {
    cy.visit('https://monitoring-digital.jcdecaux.com/monitoring-ui/#/home/list');
  });

  it('should load properly', () => {
	  cy.screenshot();
  })
});
