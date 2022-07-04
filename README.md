# Biblioteca_PJ
API REST conectada com um banco de dados PostgreSQL utilizada para criar, ler, atualizar ou deletar livros do sistema.

## Instalação/Configuração
### 1 - Download 
- Copie este repositório para o seu disco local;
- Crie um banco de dados PostgreSQL (na nuvem ou localmente) e rode os comandos que estão na pasta **sql**.

### 2 - Configuração e inicialização
- Crie um arquivo **.env** no diretório principal e coloque as credenciais do banco de dados;
```
DB_User=O_USUARIO_DO_BANCO_DE_DADOS
DB_Password=A_SENHA_DO_BANCO_DE_DADOS
```
- Inicie a aplicação colocando o seguinte comando no terminal:
```bash
npm run start
```

## Utilização
Para utilizar a API, será necessário a utilização de alguma plataforma de testes de APIs (Postman, Insomnia, Thunder Client).

### Possíveis metodos de busca:
- GET - http://host:porta/ -> Rota de teste/verificação do funcionamento;
- GET - http://host:porta/livros -> Retorna todos os livros do banco de dados;
- GET - http://host:porta/livros/nome-do-livro -> Retorna livros com o mesmo nome ou iniciais;
- GET - http://host:porta/livro/uuid-do-livro -> Retorna um livro específico do banco de dados;
- POST - http://host:porta/livros -> Adiciona um livro ao banco de dados;
- PUT - http://host:porta/livro/uuid-do-livro -> Atualiza um livro no banco de dados;
- DELETE - http://host:porta/livro/uuid-do-livro -> Remove um livro do banco de dados.
