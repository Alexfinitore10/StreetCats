describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')

    /* ==== Generated with Cypress Studio ==== */

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.bg-\\[var\\(--primary-blue\\)\\]').click();
    cy.get(':nth-child(1) > .relative > .w-full').click();
    cy.get(':nth-child(1) > .relative > .w-full').clear('a');
    cy.get(':nth-child(1) > .relative > .w-full').type('alexciacciarella@gmail.com');
    cy.get(':nth-child(2) > .relative > .w-full').clear();
    cy.get(':nth-child(2) > .relative > .w-full').type('123');
    cy.get('.space-y-6 > .flex').click();
    cy.get('.text-\\[var\\(--text-light\\)\\]').click();
    cy.get('#newPassword').clear('1');
    cy.get('#newPassword').type('124');
    cy.get('.bg-gradient-to-r').click();
    cy.get('.bg-red-500').click();
    cy.get(':nth-child(1) > .relative > .w-full').clear('a');
    cy.get(':nth-child(1) > .relative > .w-full').type('alexciacciarella@gmail.com');
    cy.get(':nth-child(2) > .relative > .w-full').clear();
    cy.get(':nth-child(2) > .relative > .w-full').type('124');
    cy.get('.space-y-6 > .flex').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.text-\\[var\\(--text-light\\)\\]').click();
    cy.get('#newPassword').clear('1');
    cy.get('#newPassword').type('123');
    cy.get('.bg-gradient-to-r').click();
    cy.get('.bg-red-500').click();
    /* ==== End Cypress Studio ==== */
  })
})