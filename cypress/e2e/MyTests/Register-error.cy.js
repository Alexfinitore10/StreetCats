describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.bg-\\[var\\(--primary-blue\\)\\]').click();

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.text-blue-300').click();
    cy.get(':nth-child(1) > .relative > .w-full').clear('al');
    cy.get(':nth-child(1) > .relative > .w-full').type('alex');
    cy.get(':nth-child(2) > .relative > .w-full').click();
    cy.get(':nth-child(3) > .relative > .w-full').clear('al');
    cy.get(':nth-child(3) > .relative > .w-full').type('alexnc@');
    cy.get(':nth-child(4) > .relative > .w-full').clear('12');
    cy.get(':nth-child(4) > .relative > .w-full').type('12prova');
    cy.get('.space-y-6 > .justify-center > span').click();
    cy.get('.bg-white\\/20').click();
    cy.get(':nth-child(3) > .relative > .w-full').click();
    cy.get('.bg-white\\/20').click();
    cy.get('.space-y-6 > .justify-center > span').click();
    cy.get(':nth-child(1) > .relative > .w-full').clear('a');
    cy.get(':nth-child(1) > .relative > .w-full').type('aaaaa');
    cy.get('.space-y-6 > .justify-center > span').click();
    cy.get(':nth-child(3) > .relative > .w-full').clear('p');
    cy.get('.space-y-6 > .justify-center > span').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(3) > .relative > .w-full').clear();
    cy.get(':nth-child(3) > .relative > .w-full').type('ale @.com{enter}');
    cy.get('.space-y-6 > .justify-center').click();
    cy.get(':nth-child(3) > .relative > .w-full').clear();
    cy.get(':nth-child(3) > .relative > .w-full').type('ale@slk{enter}');
    cy.get('.space-y-6 > .justify-center').click();
    cy.get('.bg-red-500\\/20 > .flex').should('exist').and('contain', 'Email non valida');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.bg-white\\/20').click();
    cy.get(':nth-child(4) > .relative > .w-full').clear();
    cy.get(':nth-child(4) > .relative > .w-full').type('alexciacciarella@gmail.com');
    cy.get('.space-y-6 > .justify-center > span').click();
    cy.get('.swal2-confirm').click();
    /* ==== End Cypress Studio ==== */
  })
})