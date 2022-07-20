describe('service is available', function () {
    it('should be available on localhost:3000 and open home page', function () {
        cy.visit('http://localhost:3000');
    });
});
