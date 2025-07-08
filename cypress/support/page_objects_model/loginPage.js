class loginPage {
    selectors = {
        usernameInput: () => cy.get('input[placeholder="Username"]'),
        passwordInput: () => cy.get('input[placeholder="Password"]'),
        loginButton: () => cy.get('button[type="submit"]'),
        dashboard: () => cy.get('.oxd-topbar-header'),
    };

    messages = {
        invalidCredentials: () => cy.get('.oxd-alert'),
        requiredMessage: () => cy.get('.oxd-input-group > .oxd-text'),
    };

    visit() {
        cy.visit('/');
        return this;
    }

    fillUsername(username) {
        if (username && username.trim() !== '') {
            this.selectors.usernameInput().clear().type(username);
        }
        return this;
    }

    fillPassword(password) {
        if (password && password.trim() !== '') {
            this.selectors.passwordInput().clear().type(password);
        }
        return this;
    }

    clickLoginButton() {
        this.selectors.loginButton().click();
        return this;
    }
    verifyDashboardContainsText(expectedText = 'Dashboard') {
        this.selectors.dashboard().should('be.visible').should('contain.text', expectedText);
    }
    verifyInvalidCredentialsMessage() {
        this.messages.invalidCredentials().should('be.visible').and('contain.text', 'Invalid credentials');
    }
    verifyRequiredMessage() {
        this.messages.requiredMessage().should('be.visible').and('contain.text', 'Required');
    }
}

export default new loginPage();
