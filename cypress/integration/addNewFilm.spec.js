const selectors = require('../fixtures/selectors/selectors.json');
const hallData = require('../fixtures/testData/hallData.json');
const priceData = require('../fixtures/testData/priceData.json');
const moviesData = require('../fixtures/testData/moviesData.json');
const filepath = "../../cypress/fixtures/Poster.png";

it('Should add new hall, film, ticket prices and added to the schedule', () => {
    cy.visit('/');
    cy.login('qamid@qamid.ru', 'qamid');
	cy.get('.page-header__title').should('be.visible');

    cy.get(selectors.createHall).click();
    cy.get(selectors.nameHall).type(hallData.hallName);
    cy.contains('Добавить зал').click();

    cy.get(selectors.newHall).click();
    cy.get(selectors.rows).clear().type(hallData.rows);
    cy.get(selectors.places).clear().type(hallData.seats);
    cy.get(selectors.buttonSaveHall).click();

    cy.get(selectors.nameHallPrice).type(hallData.hallName);
    cy.get(selectors.priceRegular).clear().type(priceData.priceRegular);
    cy.get(selectors.priceVIP).clear().type(priceData.priceVIP);

    cy.get(selectors.buttonAddMovie).click();
    cy.get(selectors.movieTitle).type(moviesData.movieTitle);
    cy.get(selectors.movieTime).type(moviesData.movieTime);
    cy.get(selectors.movieDescription).type(moviesData.movieDescription);
    cy.get(selectors.movieCountry).type(moviesData.movieCountry);
    cy.get(selectors.downloadMoviePoster).click().attachFile(filepath);
    cy.get(selectors.buttonSaveMovie).click();

//  Removing test data, "afterAll", "afterEach" doesn't work.
    cy.contains('Отменить').click();
    cy.get(selectors.deleteButton).click();
    cy.get(selectors.delete).click();

    cy.get(selectors.movie).drag(selectors.placeMovie).then((success) => {
        assert.isFalse(success)
      });
    cy.get(selectors.nameHallSale).click();
    cy.get(selectors.buttonOpenTicketSales).click();
    cy.contains('Продажа билетов открыта!!!').should('be.visible');
});
