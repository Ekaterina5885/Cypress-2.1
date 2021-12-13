const selector = require('../fixtures/selectors/selectorsBooking.json');
const selectors = require('../fixtures/selectors/selectors.json');
const hallData = require('../fixtures/testData/hallData.json');
const priceData = require('../fixtures/testData/priceData.json');

after(() => {
	cy.visit('/');
    cy.login('qamid@qamid.ru', 'qamid');
	cy.get(selectors.nameHallSale4).click();
    cy.contains('Закрыть продажу билетов').click();
});

it('Should open a session in 4 hall', () => {
    cy.visit('/');
    cy.login('qamid@qamid.ru', 'qamid');
	cy.get('.page-header__title').should('be.visible');

    cy.get(selectors.hall4).click();
    cy.get(selectors.rows).clear().type(hallData.rows);
    cy.get(selectors.places).clear().type(hallData.seats);
    cy.get(selectors.buttonSaveHall).click();

    cy.get(selectors.nameHall4Price).type(hallData.hallName);
    cy.get(selectors.priceRegular).clear().type(priceData.priceRegular);
    cy.get(selectors.priceVIP).clear().type(priceData.priceVIP);

    cy.get(selectors.nameHallSale4).click();
    cy.get(selectors.buttonOpenTicketSales).click();
    cy.contains('Продажа билетов открыта!!!').should('be.visible');
});

it('Should book a ticket', () => {
	cy.visit('http://qamid.tmweb.ru/client/index.php');
	cy.get(selector.day).click();
	cy.get(selector.time).click();
	cy.get(selector.place).click();
	cy.contains('Забронировать').click();
	cy.contains('Получить код бронирования').click();
	cy.contains('Покажите QR-код нашему контроллеру для подтверждения бронирования').should('be.visible');
});
