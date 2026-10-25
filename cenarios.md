# Cenários de Teste - OrangeHRM (Recruitment & Login)

## Funcionalidade: Login

Cenário: Login efetuado com sucesso
Dado que o usuário está na tela de login
Quando preenche o usuário "Admin" e a senha "admin123"
E clica no botão de login
Então deve ser redirecionado para a página do Dashboard

Cenário: Tentativa de login com dados inválidos
Dado que o usuário está na tela de login
Quando preenche o usuário "Admin" e a senha "senhaIncorreta"
E clica no botão de login
Então deve visualizar a mensagem "Invalid credentials"

## Funcionalidade: Recruitment - Vacancies

Cenário: Cadastro de nova vaga com sucesso
Dado que o usuário está autenticado e na aba de Vacancies
Quando clica em "Add" e preenche os campos obrigatórios da vaga
E clica em salvar
Então a vaga deve aparecer na listagem de vagas

Cenário: Consulta de vaga existente
Dado que o usuário está na tela de Vacancies
Quando insere o nome da vaga no campo de busca e clica em "Search"
Então a tabela deve filtrar e exibir apenas a vaga buscada

Cenário: Edição dos dados de uma vaga
Dado que existe uma vaga cadastrada na listagem
Quando o usuário clica no ícone de editar da vaga
E altera o nome da vaga e clica em salvar
Então os novos dados da vaga devem ser atualizados na tabela

Cenário: Exclusão de uma vaga
Dado que existe uma vaga cadastrada na listagem
Quando o usuário clica no ícone de lixeira da vaga
E confirma a exclusão na caixa de diálogo
Então a vaga não deve mais ser exibida na listagem