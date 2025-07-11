describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.justify-between > .flex > a').click();
    cy.get(':nth-child(2) > .rounded-sm').clear('a');
    cy.get(':nth-child(2) > .rounded-sm').type('alexfint@gmail.com');
    cy.get(':nth-child(4) > .rounded-sm').clear();
    cy.get(':nth-child(4) > .rounded-sm').type('alex');
    cy.get('.hover\\:bg-slate-500').click();
    cy.get('[href="/home"]').click();
    cy.get('.text-red-600').click();
    cy.get(':nth-child(2) > .rounded-sm').click();
    /* ==== End Cypress Studio ==== */
  })
})