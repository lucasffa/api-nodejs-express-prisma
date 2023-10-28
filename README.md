# Projeto API Node.js com Express e Prisma

Este projeto representa uma API construída com o Node.js usando o framework Express e a ORM Prisma para gerenciar o banco de dados.

## 📌 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Características Recentes](#características-recentes)
- [Tecnologias Usadas](#tecnologias-usadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Segurança e Autenticação](#segurança-e-autenticação)
- [Tratamento de Erros](#tratamento-de-erros)
- [Validações](#validações)
- [Contribuições](#contribuições)
- [Licença](#licença)
- [Autor](#autor)

## Sobre o Projeto

O projeto é uma API RESTful designada para gerenciar usuários, oferecendo operações CRUD básicas. Utiliza-se o Prisma como ORM, facilitando o gerenciamento do banco de dados e as operações realizadas nele.

### Características

- **Configuração do servidor**: O arquivo `server.js` é o ponto de entrada principal da aplicação. Ele configura e inicia o servidor Express.

- **Modelo Prisma**: O projeto utiliza o Prisma como ORM, com um modelo de usuário definido em `prisma/schema.prisma`.

- **Erros Personalizados**: Há uma série de classes de erros personalizados em `userErrors.js` que ajudam no tratamento e na identificação específica de problemas relacionados ao usuário.

- **Middleware de tratamento de erros**: O projeto conta com um middleware centralizado para tratamento de erros (`errorHandlerMiddleware.js`), que responde a requisições com detalhes de erro apropriados.

- **Validações**: As validações para criação e atualização de usuários estão definidas em `userValidations.js` usando `express-validator`.

- **Rotas de Usuário**: As rotas relacionadas ao gerenciamento de usuários estão definidas em `userRoutes.js`.

### Características Recentes

- **Autenticação e Autorização**: Introduzimos middlewares de autenticação (`authMiddleware.js`) e verificação de role (`roleMiddleware.js`) para aprimorar a segurança na gestão dos usuários.

- **Middleware UUID e ID**: Adicionamos um novo middleware (`uuidAndIdMiddleware.js`) que verifica o UUID e ID do usuário ao realizar determinadas ações, garantindo que a ação seja executada por usuários autorizados.

- **Controle de Roles**: Estabelecemos um controle de roles que permite que somente usuários com determinados roles (MOD e ADMIN) tenham acesso a rotas sensíveis, como a de deleção de usuários.

## Tecnologias Usadas

- Node.js
- Express.js
- Prisma
- JWT (JSON Web Tokens) para autenticação
- MySQL (como banco de dados escolhido para o Prisma)
- `node-cache` para implementação de mecanismos de cache.
- `express-rate-limit` para proteção contra ataques de força bruta.
- `bcrypt` para hash e verificação de senhas.
- `cors` para habilitar CORS na aplicação.
- `dotenv` para gerenciamento de variáveis de ambiente.


## Pré-requisitos

- Node.js v20.4.0 ou superior.
- MySQL instalado e configurado.

## Instalação

1. Clone este repositório:
```bash
git clone https://github.com/lucasffa/api-nodejs-express-prisma.git
```

2. Entre no diretório do projeto:
```bash
cd api-nodejs-express-prisma
```

3. Instale as dependências:
```bash
npm install
```

4. Configure sua URL de banco de dados no arquivo `.env`.

5. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

## Estrutura de Diretórios

```
.
├───prisma
├───src
│   ├───config
│   ├───controllers
│   ├───errors
│   ├───logs
│   ├───middlewares
│   ├───repositories
│   ├───routes
│   ├───services
│   ├───tests
│   ├───utils
│   └───validations
└── server.js
```

## Uso

Para iniciar o servidor, execute:

```bash
node server.js
```

O servidor será iniciado na porta definida no seu arquivo `.env` ou, caso não esteja definida, na porta 3000.

Incorporando as rotas fornecidas ao README.md, a seção **Endpoints** ficaria assim:

---

## Endpoints

### User Routes

- **POST** `/create/`: Cria um novo usuário.
- **GET** `/get/:id`: Retorna um usuário específico baseado no ID. (Acesso restrito a MOD e ADMIN)
- **GET** `/get-uuid/`: Retorna um usuário específico pelo UUID. (Autenticação requerida)
- **GET** `/get/`: Retorna todos os usuários. (Autenticação requerida)
- **PUT** `/update/:id`: Atualiza informações de um usuário pelo ID. (Acesso restrito a MOD e ADMIN)
- **PUT** `/update-uuid/`: Atualiza informações de um usuário pelo UUID. (Autenticação requerida e verificação de UUID/ID)
- **DELETE** `/delete/:id`: Deleta um usuário pelo ID. (Acesso restrito a MOD e ADMIN)
- **DELETE** `/delete-uuid/`: Deleta um usuário pelo UUID. (Acesso restrito a MOD e ADMIN)
- **PATCH** `/toggle/useractivity/:id`: Altera o status de atividade de um usuário pelo ID. (Acesso restrito a MOD e ADMIN)
- **PATCH** `/toggle-uuid/useractivity/`: Altera o status de atividade de um usuário pelo UUID. (Acesso restrito a MOD e ADMIN)

### Login/Logout Routes

- **POST** `/login`: Autentica um usuário e retorna um token JWT. (Protegido contra força bruta utilizando express-rate-limit)

## Segurança e Autenticação

- **JWT Autenticação**: Utilizamos tokens JWT para autenticação de usuários e proteção de rotas.

- **Middleware de Autenticação**: Assegura que apenas usuários autenticados e com a role correta tenham acesso a determinados endpoints.

## Tratamento de Erros

O projeto utiliza um middleware centralizado para tratamento de erros. As classes de erro customizado permitem uma resposta consistente e estruturada para os clientes da API.

## Validações

O projeto faz uso da biblioteca `express-validator` para validar os dados de entrada dos usuários nas rotas.

## Contribuições

1. Faça um Fork do projeto.
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`).
4. Faça Push para a Branch (`git push origin feature/AmazingFeature`).
5. Abra um Pull Request.

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## Autor

Lucas de Almeida
- Github: [lucasffa](http://github.com/lucasffa/)
- LinkedIn: [Lucas de Almeida](https://www.linkedin.com/in/lucasffa/)
