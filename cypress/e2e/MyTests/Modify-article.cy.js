describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.justify-between > .flex > a').click();
    cy.get(':nth-child(2) > .rounded-sm').clear('al');
    cy.get(':nth-child(2) > .rounded-sm').type('alexciacciarella@gmail.com');
    cy.get(':nth-child(4) > .rounded-sm').clear();
    cy.get(':nth-child(4) > .rounded-sm').type('123');
    cy.get('.hover\\:bg-slate-500').click();
    cy.get('[href="/home"]').click();
    cy.get('[style="margin-left: -12px; margin-top: -41px; width: 25px; height: 41px; transform: translate3d(480px, 274px, 0px); z-index: 274;"]').click();
    cy.get('.text-center > .font-bold').click();
    cy.get('.p-6 > :nth-child(8)').click();
    cy.get('#contenuto').clear().type('##Modifica articolo di prova test');
    cy.get(':nth-child(7) > .w-full').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[style="margin-left: -12px; margin-top: -41px; width: 25px; height: 41px; transform: translate3d(480px, 274px, 0px); z-index: 274;"]').click();
    cy.get('.text-center > .font-bold').click();
    cy.get('.p-6 > :nth-child(8)').click();
    cy.get('#contenuto').click();
    cy.get(':nth-child(7) > .w-full').click();
    /* ==== End Cypress Studio ==== */
  })
})