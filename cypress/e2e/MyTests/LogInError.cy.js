describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')

    /* ==== Generated with Cypress Studio ==== */

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.bg-\\[var\\(--primary-blue\\)\\]').click();
    cy.get(':nth-child(1) > .relative > .w-full').clear('asf');
    cy.get(':nth-child(1) > .relative > .w-full').type('asfdjnvj');
    cy.get(':nth-child(2) > .relative > .w-full').clear();
    cy.get(':nth-child(2) > .relative > .w-full').type('1223');
    cy.get('.space-y-6 > .flex').click();
    cy.get(':nth-child(1) > .relative > .w-full').click();
    cy.get(':nth-child(1) > .relative > .w-full').clear('al');
    cy.get(':nth-child(1) > .relative > .w-full').type('alexc@asda');
    cy.get('.space-y-6 > .flex').click();
    cy.get(':nth-child(1) > .relative > .w-full').clear('alexc@asda.');
    cy.get(':nth-child(1) > .relative > .w-full').type('alexc@asda.');
    cy.get('.space-y-6 > .flex').click();
    cy.get(':nth-child(1) > .relative > .w-full').clear('alexc@asda.c');
    cy.get(':nth-child(1) > .relative > .w-full').type('alexc@asda.com');
    cy.get('.space-y-6 > .flex').click();
    /* ==== End Cypress Studio ==== */
  })
})