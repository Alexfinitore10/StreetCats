describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.bg-\\[var\\(--primary-blue\\)\\]').click();
    cy.get('.text-blue-300').click();
    cy.get(':nth-child(1) > .relative > .w-full').clear('a');
    cy.get(':nth-child(1) > .relative > .w-full').type('alex');
    cy.get(':nth-child(2) > .relative > .w-full').click();
    cy.get(':nth-child(3) > .relative > .w-full').clear('p');
    cy.get(':nth-child(3) > .relative > .w-full').type('prova@g.com');
    cy.get(':nth-child(4) > .relative > .w-full').clear();
    cy.get(':nth-child(4) > .relative > .w-full').type('123');
    cy.get('.space-y-6 > .justify-center').click();
    cy.get('.swal2-confirm').click();
    cy.get(':nth-child(1) > .relative > .w-full').clear('pr');
    cy.get(':nth-child(1) > .relative > .w-full').type('prova@g.com');
    cy.get(':nth-child(2) > .relative > .w-full').clear();
    cy.get(':nth-child(2) > .relative > .w-full').type('123');
    cy.get('.space-y-6 > .flex').click();
    /* ==== End Cypress Studio ==== */
  })
})