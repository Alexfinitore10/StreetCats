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
    cy.get('.bg-\\[var\\(--primary-blue\\)\\]').click();
    cy.get('#titolo').clear('Nuovo Gatto!');
    cy.get('#titolo').type('Nuovo Gatto!');
    cy.get('#description').click().type("Gatto trovato in strada!");
    cy.get('#contenuto').click().clear().type("# Gatto trovato! \n ## Se lo vedete scrivetemi un commento!");
    cy.get('#immagineCopertina').selectFile('cypress/e2e/MyTests/catimage/gatto.jpg');
    cy.get('#tags').clear('g');
    cy.get('#tags').type('gatto');
    cy.get('.max-w-3xl > .space-y-6').click();
    cy.get('.h-full').click();
    cy.get('.space-y-6 > .justify-center').click();
    /* ==== End Cypress Studio ==== */
  })
})