describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')


    /* ==== Generated with Cypress Studio ==== */
    cy.get('[style="margin-left: -12px; margin-top: -41px; width: 25px; height: 41px; transform: translate3d(503px, 246px, 0px); z-index: 246;"]').click();
    cy.get('.leaflet-popup-content > .text-center > .font-bold').click();
    cy.get('.mt-12 > .mt-4').should('contain', "Effettua il login per commentare.");
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.bg-\\[var\\(--primary-blue\\)\\]').click();
    cy.get(':nth-child(1) > .relative > .w-full').clear('a');
    cy.get(':nth-child(1) > .relative > .w-full').type('alexciacciarella@gmail.com');
    cy.get(':nth-child(2) > .relative > .w-full').clear();
    cy.get(':nth-child(2) > .relative > .w-full').type('123');
    cy.get('.space-y-6 > .flex').click();
    cy.get('.text-2xl').click();
    cy.get('[style="margin-left: -12px; margin-top: -41px; width: 25px; height: 41px; transform: translate3d(503px, 246px, 0px); z-index: 246;"]').click();
    cy.get('.leaflet-popup-content > .text-center > .font-bold').click();

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.mt-12 > .flex > .w-full').should('exist').and('have.attr', 'placeholder', 'Scrivi un commento...');
    cy.get('.mt-12 > .flex > .bg-gradient-to-r').should('exist', "Invia commento");
    /* ==== End Cypress Studio ==== */
  })
})