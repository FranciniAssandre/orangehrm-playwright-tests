const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test.describe('Testes de Login no OrangeHRM', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navegar();
    });

    test('Login com credenciais corretas', async () => {
        await loginPage.realizarLogin('Admin', 'admin123');
        await loginPage.validarLoginSucesso();
    });

    test('Login com senha errada', async () => {
        await loginPage.realizarLogin('Admin', 'senhaInvalida');
        await loginPage.validarMensagemErro();
    });
});