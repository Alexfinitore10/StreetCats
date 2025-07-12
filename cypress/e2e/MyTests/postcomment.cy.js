describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
    /* ==== Generated with Cypress Studio ==== */

    /* ==== End Cypress Studio ==== */
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
    cy.get('[style="margin-left: -12px; margin-top: -41px; width: 25px; height: 41px; transform: translate3d(408px, 121px, 0px); z-index: 121;"]').click();
    cy.get('.leaflet-popup-content > .text-center > .font-bold').click();
    cy.get('.mt-12 > .flex > .w-full').type("Bello!");
    cy.get('.bg-gradient-to-r').click();
    cy.get('.mb-3').should('exist').and('contain', 'Bello!');
    /* ==== End Cypress Studio ==== */
  })
})