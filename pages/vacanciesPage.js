const { expect } = require('@playwright/test');

class VacanciesPage {
    constructor(page) {
        this.page = page;
        this.menuRecruitment = page.getByRole('link', { name: 'Recruitment', exact: true });
        this.tabVacancies = page.getByRole('link', { name: 'Vacancies', exact: true });

        this.btnAdd = page.getByRole('button', { name: 'Add' });
        this.btnSave = page.getByRole('button', { name: 'Save' });
        this.btnSearch = page.getByRole('button', { name: 'Search' });
        this.btnConfirmDelete = page.getByRole('button', { name: 'Yes, Delete' });

        this.vacancyInput = page.locator('.oxd-input-group').filter({ hasText: 'Vacancy Name' }).locator('input');
        this.jobTitleSelect = page.locator('.oxd-input-group').filter({ hasText: 'Job Title' }).locator('.oxd-select-wrapper');
        this.managerInput = page.locator('.oxd-input-group').filter({ hasText: 'Hiring Manager' }).locator('input');
    }

    async irParaVacancies() {
        await this.menuRecruitment.click();
        await this.tabVacancies.click();
        await expect(this.btnAdd).toBeVisible({ timeout: 15000 });
    }

    async cadastrarVaga(nomeVaga, cargo) {
        await this.btnAdd.click();
        await this.vacancyInput.fill(nomeVaga);

        await this.jobTitleSelect.click();
        await this.page.locator('.oxd-select-option').filter({ hasText: cargo }).first().click();

        await this.managerInput.fill('a');
        const opcao = this.page.locator('.oxd-autocomplete-option').first();
        if (await opcao.isVisible({ timeout: 3000 }).catch(() => false)) {
            await opcao.click();
        }

        await this.btnSave.click();
        await this.page.waitForTimeout(2000);
    }

    async pesquisarVagaPorNome(nomeVaga) {
        const filtroVacancy = this.page.locator('.oxd-input-group').filter({ hasText: 'Vacancy' }).locator('.oxd-select-wrapper');
        if (await filtroVacancy.isVisible({ timeout: 3000 }).catch(() => false)) {
            await filtroVacancy.click();
            const opcao = this.page.locator('.oxd-select-option').filter({ hasText: nomeVaga }).first();
            if (await opcao.isVisible({ timeout: 3000 }).catch(() => false)) {
                await opcao.click();
            }
        }
        await this.btnSearch.click();
        await this.page.waitForTimeout(1500);
    }

    async editarPrimeiraVaga(novoNome) {
        const primeiraLinha = this.page.locator('.oxd-table-card').first();
        await primeiraLinha.locator('.bi-pencil-fill').click();

        await this.vacancyInput.clear();
        await this.vacancyInput.fill(novoNome);
        await this.btnSave.click();
        await this.page.waitForTimeout(2000);
    }

    async deletarVagaExistente(nomeVaga) {
        const linha = this.page.locator('.oxd-table-card').filter({ hasText: nomeVaga }).first();
        if (await linha.isVisible({ timeout: 3000 }).catch(() => false)) {
            await linha.locator('.bi-trash').click();
            await this.btnConfirmDelete.click();
            await this.page.waitForTimeout(1500);
        }
    }

    async validarListaNaoVazia() {
        const linhas = this.page.locator('.oxd-table-card');
        await expect(linhas.first()).toBeVisible({ timeout: 15000 });
    }

    async checarVagaNaLista(nomeVaga) {
        const registro = this.page.locator('.oxd-table-card').filter({ hasText: nomeVaga });
        await expect(registro.first()).toBeVisible({ timeout: 10000 });
    }

    async checarVagaRemovida(nomeVaga) {
        const registro = this.page.locator('.oxd-table-card').filter({ hasText: nomeVaga });
        await expect(registro).toHaveCount(0, { timeout: 10000 });
    }
}

module.exports = { VacanciesPage };