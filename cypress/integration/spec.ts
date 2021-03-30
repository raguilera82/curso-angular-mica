it('main flow books', () => {
  cy.visit('/books');
  cy.get('#new').click();
  cy.get('#titulo').type('Cypress');
  cy.get('#sinopsis').type('Go away Selenium');
  cy.get('#save').click();
  cy.contains('Cypress / Go away Selenium');
  cy.get('#actionEdit').click();
  cy.get('#titulo').clear().type('Cypress 2');
  cy.get('#edit').click();
  cy.contains('Cypress 2 / Go away Selenium');
  cy.get('#actionDelete').click();
  cy.get('#delete').click();
  cy.contains('Cypress 2 / Go away Selenium').should('not.exist');
});
