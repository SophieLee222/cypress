describe('booksApp authorization tests', () => {

  beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });

  it('successfull authorization', () => {
    cy.login('test@test.com', 'test');
    cy
      .contains('Добро пожаловать test@test.com')
      .should('be.visible');
    cy
      .contains('Log out')
      .should('be.visible');
  });

  it('unsuccessfull authorization', () => {
    cy.login('ygj', '123');
    cy
      .get('#mail')
      .then(($el) => $el[0].checkValidity())
      .should('be.false')
  });

});

describe('booksApp Favorites tests', () => {

  beforeEach(() => {
      cy.visit('http://localhost:3000/');
      cy.login('test@test.com', 'test');
    });

  it('checking Favorites tab', () => {
  cy.visit('http://localhost:3000/favorites');

  cy.contains('Please add some book to favorit on home page!')
    .should('be.visible')
    .click({ force: true });

  cy.url().should('eq', 'http://localhost:3000/');
});

  it('adding book to Favorites', () => {
    const bookName = 'Harry Potter';
    const description = 'The book about the boy who lived'
    const author = 'J.K. Rowling';

    cy.addToFavorite(bookName, description, author);

    cy.get('.card-title').last().should('have.text', 'Harry Potter');
    cy.get('.card-text').last().should('have.text', 'J.K. Rowling');
    cy.get('.card-footer').last().should('have.text', 'Delete from favorite');
  });

  it('deleting book from Favorites', () => {
    const bookName = 'Lord of the Ring';
    const description = 'The book about the advenures and courage'
    const author = 'J.R. Tolkien';

    cy.addToFavorite(bookName, description, author);
    cy.contains('Delete from favorite').last().click();
    cy.contains('Add to favorite').last().should('exist');
  });

});