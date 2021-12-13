it('Should log in to the page', () => {
	cy.visit('/');
	cy.login('qamid@qamid.ru', 'qamid');
});
