describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')

    /* ==== Generated with Cypress Studio ==== */

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.bg-\\[var\\(--primary-blue\\)\\]').click();
    cy.get(':nth-child(1) > .relative > .w-full').clear('a');
    cy.get(':nth-child(1) > .relative > .w-full').type('alexciacciarella@gmail.com');
    cy.get(':nth-child(2) > .relative > .w-full').clear();
    cy.get(':nth-child(2) > .relative > .w-full').type('123');
    cy.get('.space-y-6 > .flex').click();
    cy.get('.text-2xl').click();

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[style="margin-left: -12px; margin-top: -41px; width: 25px; height: 41px; transform: translate3d(503px, 246px, 0px); z-index: 246;"]').click();
    cy.get('.leaflet-popup-content > .text-center > .font-bold').click();
    cy.get('.flex-1 > :nth-child(8)').click();
    cy.get('#contenuto').click().clear().type("# Il gatto piu fiero del web! \n ## Si chiama Mish!");
    cy.get('#tags').clear('prova,');
    cy.get('#tags').type('prova, zeb');
    cy.get('.space-y-6 > .justify-center').click();
    /* ==== End Cypress Studio ==== */
  })
})