/**
 * userErrors.js
 * Autor: http://github.com/lucasffa/
 * Descrição: Define erros personalizados para o gerenciamento de usuários.
 * Objetivo: Tratar erros de forma adequada e consistente em todo o projeto.
 * Dependências: Nenhuma.
 * 
 * Exemplo de Uso:
 * 
 * try {
 *     throw new UserNotFoundError();
 * } catch (error) {
 *     if (error instanceof UserNotFoundError) {
 *         console.error(error.message);
 *     }
 * }
 *
 */



// Definindo os códigos de erro como um Enum
const ERROR_CODES = {
    ID_NOT_FOUND: 1001,
    USER_NOT_FOUND: 1002,
    USER_UPDATE_ERROR: 1003,
    USER_DELETE_ERROR: 1004,
    USER_INFO_RETRIEVAL_ERROR: 1005,
    USERS_INFO_RETRIEVAL_ERROR: 1006,
    USER_CREATE_ERROR: 1007,
    USER_CREATE_EMAIL_ERROR: 1008
};

// Classe de erro personalizado para quando um ID não for encontrado
class IdNotFoundError extends Error {
    constructor(message = 'Não conseguiu encontrar id', errorCode = ERROR_CODES.ID_NOT_FOUND) {
        super(message);
        this.name = 'IdNotFoundError';
        this.errorCode = errorCode;
        this.statusCode = 404;  // Not Found
    }
}

// Classe de erro personalizado para quando um usuário não for encontrado
class UserCreateError extends Error {
    constructor(message = 'Não conseguiu criar usuário', errorCode = ERROR_CODES.USER_CREATE_ERROR) {
        super(message);
        this.name = 'IdNotFoundError';
        this.errorCode = errorCode;
        this.statusCode = 404;  // Not Found
    }
}

// Classe de erro personalizado para quando um email de usuário não for encontrado
class UserCreateEmailError extends Error {
    constructor(message = 'Este e-mail já está registrado', errorCode = ERROR_CODES.USER_CREATE_EMAIL_ERROR) {
        super(message);
        this.name = 'IdNotFoundError';
        this.errorCode = errorCode;
        this.statusCode = 404;  // Not Found
    }
}

// Classe de erro personalizado para quando um usuário não for encontrado
class UserNotFoundError extends Error {
    constructor(message = 'Não conseguiu encontrar usuário', errorCode = ERROR_CODES.USER_NOT_FOUND) {
        super(message);
        this.name = 'UserNotFoundError';
        this.errorCode = errorCode;
        this.statusCode = 404;  // Not Found
    }
}

// Classe de erro personalizado para quando um usuário não for atualizado
class UserUpdateError extends Error {
    constructor(message = 'Não conseguiu atualizar usuário', errorCode = ERROR_CODES.USER_UPDATE_ERROR) {
        super(message);
        this.name = 'UserUpdateError';
        this.errorCode = errorCode;
        this.statusCode = 500;  // Internal Server Error
    }
}

// Classe de erro personalizado para quando um usuário não for deletado
class UserDeleteError extends Error {
    constructor(message = 'Não conseguiu deletar usuário', errorCode = ERROR_CODES.USER_DELETE_ERROR) {
        super(message);
        this.name = 'UserDeleteError';
        this.errorCode = errorCode;
        this.statusCode = 500;  // Internal Server Error
    }
}

// Classe de erro personalizado para quando não conseguir trazer informações de um usuário
class UserInfoRetrievalError extends Error {
    constructor(message = 'Não conseguiu trazer informações do usuário', errorCode = ERROR_CODES.USER_INFO_RETRIEVAL_ERROR) {
        super(message);
        this.name = 'UserInfoRetrievalError';
        this.errorCode = errorCode;
        this.statusCode = 500;  // Internal Server Error
    }
}

// Classe de erro personalizado para quando não conseguir trazer informações de todos os usuários
class UsersInfoRetrievalError extends Error {
    constructor(message = 'Não conseguiu trazer informações dos usuários', errorCode = ERROR_CODES.USERS_INFO_RETRIEVAL_ERROR) {
        super(message);
        this.name = 'UsersInfoRetrievalError';
        this.errorCode = errorCode;
        this.statusCode = 500;  // Internal Server Error
    }
}

// Exportando as classes de erro personalizado
module.exports = {
    IdNotFoundError,
    UserNotFoundError,
    UserUpdateError,
    UserDeleteError,
    UserInfoRetrievalError,
    UsersInfoRetrievalError,
    UserCreateError,
    UserCreateEmailError,
    ERROR_CODES
};
