describe('drag element tests', function () {
    it('Should visit home page', function () {
        cy.visit('http://localhost:3000');
    });
    it('Move ingredients to constructor', function () {
        cy.get("[class^='ingredient-list_cardContainer']")
            .first()
            .trigger('dragstart')
            .trigger('dragleave');
        cy.get("[class^='burger-constructor_orderDropnDrag']")
            .trigger('dragenter')
            .trigger('dragover')
            .trigger('drop')
            .trigger('dragend');
        cy.get('Button').contains('Оформить заказ').click();
        cy.get('input[type*="email"]').click().type('ppr123@mail.ru');
        cy.get('input[type*="password"]').click().type('123456789');
        cy.get('Button').contains('Войти').click();
        // cy.wait(1000);
        cy.get('Button')
            .contains('Оформить заказ')
            .click()
            .contains('Формируем номер');
        // cy.wait(16000);
        it('Close order modal', function () {
            cy.get("[class^='modal-styles_logoDiv']").trigger('click');
        });
        // cy.get("[class^='burger-constructor_order']")
        //     .last()
        //     .contains('Краторная булка N-200i');
        // cy.get("[class^='ingredient-list_cardContainer']")
        //     .first()
        //     .trigger('dragstart');
        // cy.get("[class^='burger-constructor_order']").first().trigger('drop');
    });
});
