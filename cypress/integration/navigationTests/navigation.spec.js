describe('service navigation tests', function () {
    it('should be available on localhost:3000 and open home page', function () {
        cy.visit('http://localhost:3000');
    });
    it('should open registration page on http://localhost:3000/register', function () {
        cy.visit('http://localhost:3000/register');
    });
    it('should open forgot-password page on http://localhost:3000/forgot-password', function () {
        cy.visit('http://localhost:3000/forgot-password');
    });
    it('should open feed page with all orders on http://localhost:3000/feed', function () {
        cy.visit('http://localhost:3000/feed');
    });
    it('should open reset-password page on http://localhost:3000/reset-password', function () {
        cy.visit('http://localhost:3000/reset-password');
    });
    it('should open feed page with a list of orders on http://localhost:3000/login', function () {
        cy.visit('http://localhost:3000/login');
    });
    it('should open profile page on http://localhost:3000/profile', function () {
        cy.visit('http://localhost:3000/profile');
    });
    it('should open profile-orders page on http://localhost:3000/profile/orders', function () {
        cy.visit('http://localhost:3000/profile-orders');
    });
});
