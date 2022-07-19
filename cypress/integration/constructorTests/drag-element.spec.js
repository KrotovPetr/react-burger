describe('drag element tests', function () {
    it('Should visit home page', function () {
        cy.visit('http://localhost:3000');
    });
    it('Move ingredients to constructor', function () {
        cy.get("[data-cy='ing']").first().trigger('drag');
        cy.get("[data-cy='drop']").trigger('drop');

        cy.get('Button').contains('Оформить заказ').click();
        cy.get('Input').first().click().type('ppr123@mail.ru');
        cy.get('Input').last().click().type('123456789');
        cy.get('Button').click();
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(10000);
        cy.get('Button').contains('Оформить заказ').click();
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(17000);
        cy.get("[class^='modal-styles_logoDiv']").trigger('click');
    });
});
