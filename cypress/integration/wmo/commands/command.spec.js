/// <reference types='Cypress'/>

context('Command tests', () => {
  beforeEach(() => {});

  describe('Get token', () => {
    it('should set localstorage key for login', () => {
      cy.setTokenInStorage();
    });
  });
});
