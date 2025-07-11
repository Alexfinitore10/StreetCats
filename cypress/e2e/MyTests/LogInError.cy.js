describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.justify-between > .flex > a').click();
    cy.get(':nth-child(2) > .rounded-sm').clear('al');
    cy.get(':nth-child(2) > .rounded-sm').type('alexciacciarella2024381@gmail.com');
    cy.get(':nth-child(4) > .rounded-sm').clear();
    cy.get(':nth-child(4) > .rounded-sm').type('21313238');
    cy.get('.hover\\:bg-slate-500').click();
    /* ==== End Cypress Studio ==== */
  })
})