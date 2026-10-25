const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { VacanciesPage } = require('../pages/vacanciesPage');

test.describe('Gerenciamento de Vacancies no Recruitment', () => {
    let loginPage;
    let vacanciesPage;

    const nomeNovaVaga = `QA_Test_${Date.now()}`;
    const nomeEditado = `QA_Editada_${Date.now()}`;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        vacanciesPage = new VacanciesPage(page);

        await loginPage.navegar();
        await loginPage.realizarLogin('Admin', 'admin123');
        await vacanciesPage.irParaVacancies();
    });

    test('Fluxo completo: Cadastrar, pesquisar, editar e deletar vaga', async () => {
        test.setTimeout(60000);

        await vacanciesPage.cadastrarVaga(nomeNovaVaga, 'Account Assistant');
        await vacanciesPage.irParaVacancies();

        await vacanciesPage.pesquisarVagaPorNome(nomeNovaVaga);
        await vacanciesPage.validarListaNaoVazia();

        await vacanciesPage.editarPrimeiraVaga(nomeEditado);
        await vacanciesPage.irParaVacancies();
        await vacanciesPage.validarListaNaoVazia();

        await vacanciesPage.deletarVagaExistente(nomeEditado);
        await vacanciesPage.checarVagaRemovida(nomeEditado);
    });
});