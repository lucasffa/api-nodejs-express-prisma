/**
 * src/errors/userErrors.js
 * Data: 17/10/2023
 * Autor: http://github.com/lucasffa/
 * Descrição: Arquivo que define classes de erro personalizado relacionadas a operações de usuário, 
 * fornecendo mensagens de erro mais significativas e códigos de status HTTP específicos.
 * 
 * Conteúdo:
 * 
 * 1. Enum ERROR_CODES:
 *    - Define códigos numéricos para cada tipo de erro para facilitar a identificação e tratamento dos mesmos.
 * 
 * 2. Classes de Erro Personalizado:
 * 
 *    a. IdNotFoundError:
 *       - Erro lançado quando um ID específico não é encontrado.
 *       - Código padrão: 1001
 *       - Status HTTP: 404 (Not Found)
 * 
 *    b. UserNotFoundError:
 *       - Erro lançado quando um usuário não é encontrado.
 *       - Código padrão: 1002
 *       - Status HTTP: 404 (Not Found)
 * 
 *    c. UserCreateError:
 *       - Erro lançado quando ocorre um problema na criação de um usuário.
 *       - Código padrão: 1007
 *       - Status HTTP: 404 (Not Found)
 * 
 *    d. UserCreateEmailError:
 *       - Erro lançado quando se tenta criar um usuário com um e-mail que já está registrado.
 *       - Código padrão: 1008
 *       - Status HTTP: 404 (Not Found)
 * 
 *    e. UserUpdateError:
 *       - Erro lançado quando ocorre um problema ao atualizar um usuário.
 *       - Código padrão: 1003
 *       - Status HTTP: 500 (Internal Server Error)
 * 
 *    f. UserDeleteError:
 *       - Erro lançado quando ocorre um problema ao deletar um usuário.
 *       - Código padrão: 1004
 *       - Status HTTP: 500 (Internal Server Error)
 * 
 *    g. UserInfoRetrievalError:
 *       - Erro lançado quando ocorre um problema ao buscar informações de um usuário específico.
 *       - Código padrão: 1005
 *       - Status HTTP: 500 (Internal Server Error)
 * 
 *    h. UsersInfoRetrievalError:
 *       - Erro lançado quando ocorre um problema ao buscar informações de todos os usuários.
 *       - Código padrão: 1006
 *       - Status HTTP: 500 (Internal Server Error)
 * 
 * Como usar:
 * - Importe as classes de erro personalizado necessárias em qualquer lugar do seu código.
 * - Use-as para lançar erros personalizados em qualquer lugar do seu código.
 * - Use-as para tratar erros personalizados em qualquer lugar do seu código.
 * - Abaixo, exemplo em código:
 * catch(error) {
 *    if (error instanceof IdNotFoundError) {
 *       // faça algo
 *   } else if (error instanceof UserNotFoundError) {
 *      // faça algo
 *  } else if (error instanceof UserUpdateError) {
 *     throw new UserUpdateError;
 * }
 * 
 * Observações:
 * - Cada classe de erro possui propriedades adicionais como `name`, `errorCode` e `statusCode` para melhor tratamento de erros.
 * - Os códigos de erro e os códigos de status HTTP podem ser alterados conforme a necessidade do desenvolvedor.
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
    USER_CREATE_EMAIL_ERROR: 1008,
    INCORRECT_PASSWORD_ERROR: 1009,
    UUID_NOT_FOUND: 1010
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

// Classe de erro personalizado para quando uma senha dada estiver incorreta
class UserIncorrectPasswordError extends Error {
    constructor(message = 'Senha incorreta', errorCode = ERROR_CODES.INCORRECT_PASSWORD_ERROR) {
        super(message);
        this.name = 'IncorrectPasswordError';
        this.statusCode = 400;  // Bad Request
    }
}

// Classe de erro personalizado para quando um UUID não for encontrado
class UUIDNotFoundError extends Error {
    constructor(message = 'Não conseguiu encontrar UUID', errorCode = ERROR_CODES.UUID_NOT_FOUND) {
        super(message);
        this.name = 'UUIDNotFoundError';
        this.errorCode = errorCode;
        this.statusCode = 404;  // Not Found
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
    UserIncorrectPasswordError,
    UUIDNotFoundError,
    ERROR_CODES
};
