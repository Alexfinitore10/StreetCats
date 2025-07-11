describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.justify-between > .flex > a').click();
    cy.get('.text-red-700').click();
    cy.get(':nth-child(2) > .w-full').clear('P');
    cy.get(':nth-child(2) > .w-full').type('Prova');
    cy.get(':nth-child(3) > .w-full').clear();
    cy.get(':nth-child(3) > .w-full').type('Test');
    cy.get(':nth-child(4) > .w-full').clear();
    cy.get(':nth-child(4) > .w-full').type('prova@mail.com');
    cy.get(':nth-child(5) > .w-full').clear();
    cy.get('.px-4').click();
    cy.get(':nth-child(2) > .w-full').clear('P');
    cy.get(':nth-child(2) > .w-full').type('Prova');
    cy.get('.px-4').click();
    cy.get(':nth-child(4) > .w-full').clear('al');
    cy.get(':nth-child(4) > .w-full').type('alex');
    cy.get('.px-4').click();
    cy.get('.px-4').click();
    cy.get(':nth-child(4) > .w-full').clear('alex@');
    cy.get(':nth-child(4) > .w-full').type('alex@');
    cy.get('.px-4').click();
    cy.get(':nth-child(4) > .w-full').clear('alex@l');
    cy.get(':nth-child(4) > .w-full').type('alex@live.');
    cy.get(':nth-child(4) > .w-full').click();
    cy.get(':nth-child(5) > .w-full').clear('c');
    cy.get(':nth-child(5) > .w-full').type('123');
    cy.get('.px-4').click();
    cy.get(':nth-child(4) > .w-full').clear('alex@live.c');
    cy.get(':nth-child(4) > .w-full').type('alex@live.com');
    cy.get('.px-4').click();
    cy.get('.justify-between > .flex > a').click();
    cy.get(':nth-child(2) > .rounded-sm').clear('al');
    cy.get(':nth-child(2) > .rounded-sm').type('alex@live.com');
    cy.get(':nth-child(4) > .rounded-sm').clear('1');
    cy.get(':nth-child(4) > .rounded-sm').type('123');
    cy.get('.hover\\:bg-slate-500').click();
    cy.get('.text-red-600').click();
    /* ==== End Cypress Studio ==== */
  })
})