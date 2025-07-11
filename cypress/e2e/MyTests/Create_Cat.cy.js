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
    cy.get('[href="/pubblica-post"]').click();
    cy.get('#titolo').clear('P');
    cy.get('#titolo').type('Nuovo Gatto!');
    cy.get('.space-y-4 > :nth-child(2)').click();
    cy.get('#description').click().type('Questo è un gatto di prova');
    cy.get('#contenuto').click().type('Questo è un gatto di prova, è molto carino e affettuoso. Puoi vederlo nella mappa qui sotto.');
    cy.get('#immagineCopertina').selectFile('cypress/fixtures/gatto.jpg', { force: true });
    cy.get('#publishedDate').click();
    cy.get('#contenuto').click();
    cy.get('#contenuto').click();
    cy.get('#immagineCopertina').click();
    cy.get('#tags').clear('g');
    cy.get('#tags').type('gatto, aiuto');
    cy.get('.leaflet-container').click();
    cy.get('.space-y-4').click();
    cy.get('.leaflet-container').click();
    cy.get('.leaflet-container').click();
    cy.get(':nth-child(8) > .w-full').click();
    /* ==== End Cypress Studio ==== */
  })
})