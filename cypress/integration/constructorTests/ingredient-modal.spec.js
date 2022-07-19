describe('ingredient-modal tests', function () {
    it('Should visit home page', function () {
        cy.visit('http://localhost:3000');
    });

    it('Operations with ingredient modal', function () {
        cy.contains('Краторная булка N-200i')
            .get("[class^='ingredient-list_cardContainer']")
            .first()
            .click();
    });

    it('Check contains name in modal', function () {
        cy.get('h2').contains('Краторная булка N-200i');
    });

    it('Close ingredient modal', function () {
        cy.get("[class^='modal-styles_logoDiv']").trigger('click');
    });
});
