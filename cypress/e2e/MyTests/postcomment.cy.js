describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
    /* ==== Generated with Cypress Studio ==== */

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.justify-between > .flex > a').click();
    cy.get('.p-10 > :nth-child(1)').click();
    cy.get(':nth-child(2) > .rounded-sm').clear('a');
    cy.get(':nth-child(2) > .rounded-sm').type('alexciacciarella@gmail.com');
    cy.get(':nth-child(4) > .rounded-sm').clear();
    cy.get(':nth-child(4) > .rounded-sm').type('123');
    cy.get('.hover\\:bg-slate-500').click();
    cy.get('[href="/home"]').click();
    cy.get('[style="margin-left: -12px; margin-top: -41px; width: 25px; height: 41px; transform: translate3d(370px, 175px, 0px); z-index: 175;"]').click();
    cy.get('.text-center > img').click();
    cy.get('.border').click().type('Test Commento');
    cy.get('.bg-blue-500').click();
    /* ==== End Cypress Studio ==== */
  })
})