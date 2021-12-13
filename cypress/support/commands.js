Cypress.Commands.add("login", (login, password) => {
    cy.get('[for="email"] > .login__input').type(login);
    cy.get('[for="pwd"] > .login__input').type(password);
    cy.contains('Авторизоваться').click();
});

import 'cypress-file-upload';
import "@4tw/cypress-drag-drop";
