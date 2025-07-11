describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[style="margin-left: -12px; margin-top: -41px; width: 25px; height: 41px; transform: translate3d(480px, 274px, 0px); z-index: 274;"]').click();
    cy.get('.text-center > .font-bold').click();
    cy.get('.mt-8 > .mt-4').should('contain', "Effettua il login per commentare.");
    cy.get('.justify-between > .flex > a').click();
    cy.get(':nth-child(2) > .rounded-sm').clear('al');
    cy.get(':nth-child(2) > .rounded-sm').type('alexciacciarella@gmail.com');
    cy.get(':nth-child(4) > .rounded-sm').clear();
    cy.get(':nth-child(4) > .rounded-sm').type('123');
    cy.get('.hover\\:bg-slate-500').click();
    cy.get('[href="/home"]').click();
    cy.get('[style="margin-left: -12px; margin-top: -41px; width: 25px; height: 41px; transform: translate3d(480px, 274px, 0px); z-index: 274;"]').click();
    cy.get('.text-center > .font-bold').click();
    cy.get('.mt-8 > .mt-4').should('not.contain', "Effettua il login per commentare.");
  })
})