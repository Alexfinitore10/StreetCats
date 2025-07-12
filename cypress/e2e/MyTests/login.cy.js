describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
    /* ==== Generated with Cypress Studio ==== */

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.bg-\\[var\\(--primary-blue\\)\\]').click();
    cy.get(':nth-child(1) > .relative > .w-full').clear('al');
    cy.get(':nth-child(1) > .relative > .w-full').type('alexciacciarella@gmail.com');
    cy.get(':nth-child(2) > .relative > .w-full').clear();
    cy.get(':nth-child(2) > .relative > .w-full').type('123');
    cy.get('.space-y-6 > .flex').click();
    /* ==== End Cypress Studio ==== */
  })
})