const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.userInput = page.getByRole('textbox', { name: 'Username' });
        this.passInput = page.getByRole('textbox', { name: 'Password' });
        this.submitBtn = page.getByRole('button', { name: 'Login' });
        this.alertError = page.locator('.oxd-alert-content');
        this.pageHeader = page.getByRole('heading', { name: 'Dashboard' });
    }

    async navegar() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async realizarLogin(usuario, senha) {
        await this.userInput.fill(usuario);
        await this.passInput.fill(senha);
        await this.submitBtn.click();
    }

    async validarLoginSucesso() {
        await expect(this.pageHeader).toBeVisible();
        await expect(this.page).toHaveURL(/.*dashboard/);
    }

    async validarMensagemErro() {
        await expect(this.alertError).toBeVisible();
        await expect(this.alertError).toContainText('Invalid credentials');
    }
}

module.exports = { LoginPage };