/// <reference types="cypress" />
import loginPage from '../support/page_objects_model/loginPage';

describe('Login Tests with Fixtures', () => {
    let loginUsers;

    // Load fixture data sebelum semua test
    before(() => {
        cy.fixture('login-users').then((data) => {
            loginUsers = data;
        });
    });

    beforeEach(() => {
        loginPage.visit();
    });

    it('should login successfully with valid credentials', () => {
        const { username, password } = loginUsers.validUser;

        loginPage
            .fillUsername(username)
            .fillPassword(password)
            .clickLoginButton()
            .verifyDashboardContainsText('Dashboard');
    });

    it('should show error message with invalid credentials', () => {
        const { username, password } = loginUsers.invalidUser;

        loginPage
            .fillUsername(username)
            .fillPassword(password)
            .clickLoginButton()
            .verifyInvalidCredentialsMessage();
    });

    it('should show required message when username is empty', () => {
        const { password } = loginUsers.emptyUsername;

        loginPage
            .fillUsername('')
            .fillPassword(password)
            .clickLoginButton()
            .verifyRequiredMessage();
    });

    it('should show required message when password is empty', () => {
        const { username } = loginUsers.emptyPassword;

        loginPage
            .fillUsername(username)
            .fillPassword('')
            .clickLoginButton()
            .verifyRequiredMessage();
    });
});
