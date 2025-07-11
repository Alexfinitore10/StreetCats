describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.justify-between > .flex > a').click();
    cy.get(':nth-child(2) > .rounded-sm').clear('a');
    cy.get(':nth-child(2) > .rounded-sm').type('alexciacciarella@gmail.com');
    cy.get(':nth-child(4) > .rounded-sm').clear();
    cy.get(':nth-child(4) > .rounded-sm').type('123');
    cy.get('.hover\\:bg-slate-500').click();
    cy.get('.text-blue-700').click();
    cy.get('#newPassword').clear('1');
    cy.get('#newPassword').type('124');
    cy.get('.bg-gray-500').click();
    cy.get('.flex > .text-red-600').click();
    cy.get(':nth-child(2) > .rounded-sm').clear('a');
    cy.get(':nth-child(2) > .rounded-sm').type('alexciacciarella@gmail.com');
    cy.get(':nth-child(4) > .rounded-sm').clear();
    cy.get(':nth-child(4) > .rounded-sm').type('124');
    cy.get('.hover\\:bg-slate-500').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.text-blue-700').click();
    cy.get('#newPassword').clear('12');
    cy.get('#newPassword').type('123');
    cy.get('.bg-gray-500').click();
    cy.get('.flex > .text-red-600').click();
    /* ==== End Cypress Studio ==== */
  })
})