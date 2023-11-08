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
 * a. HeaderNotFoundError:
 * - Descrição: Erro lançado quando não houver um cabeçalho de autorização.
 * - Código padrão: 4001
 * - Status HTTP: 401 (Unauthorized)
 * 
 * b. MalformedLoginError:
 * - Descrição: Erro lançado quando o login foi mal feito.
 * - Código padrão: 4002
 * - Status HTTP: 401 (Unauthorized)
 *
 * c. TokenBlacklistedError:
 * - Descrição: Erro lançado quando o token estiver na blacklist.
 * - Código padrão: 4003
 * - Status HTTP: 401 (Unauthorized)
 * 
 * d. InvalidTokenError:
 * - Descrição: Erro lançado quando o token não for válido.
 * - Código padrão: 4004
 * - Status HTTP: 401 (Unauthorized)
 * 
 * e. TooManyRequestsError:
 * - Descrição: Erro lançado quando houver muitas requisições.
 * - Código padrão: 4005
 * - Status HTTP: 429 (Too Many Requests)
 * 
 * Como usar:
 * - 
 * - Abaixo, exemplo em código:
 * catch(error) {
 * 
 * }
 * 
 * Observações:
 * - 
 * 
 */



// Definindo os códigos de erro como um Enum, com um código numérico para cada tipo de erro e sua mensagem correspondente
const ERROR_TYPES = {
    HEADER_NOT_FOUND: {
        code: 4001,
        message: 'Erro no envio do cabeçalho.',
        description: 'O cabeçalho de autorização não foi encontrado na solicitação.'
    },
    MALFORMED_LOGIN: {
        code: 4002,
        message: 'Erro na formatação do login.',
        description: 'O cabeçalho de autorização não está no formato correto.'
    },
    TOKEN_BLACKLISTED: {
        code: 4003,
        message: 'Token invalidado ou expirado.',
        description: 'O token fornecido está na blacklist.'
    },
    INVALID_TOKEN: {
        code: 4004,
        message: 'Token inválido ou expirado.',
        description: 'O token fornecido é inválido no contexto da rota.'
    },
    TOO_MANY_REQUESTS: {
        code: 4005,
        message: 'Muitas requisições realizadas. Tente novamente mais tarde.',
        description: 'Muitas requisições foram feitas para a mesma rota.'
    },

};

// Classe de erro personalizado para quando não houver um cabeçalho de autorização
class HeaderNotFoundError extends Error {
    constructor(message = ERROR_TYPES.HEADER_NOT_FOUND.message, errorCode = ERROR_TYPES.HEADER_NOT_FOUND.code) {
        super(message);
        this.name = 'HeaderNotFoundError';
        this.errorCode = errorCode;
        this.statusCode = 401;
    }
}

// Classe de erro personalizado para quando o login foi mal feito
class MalformedLoginError extends Error {
    constructor(message = ERROR_TYPES.MALFORMED_LOGIN.message, errorCode = ERROR_TYPES.MALFORMED_LOGIN.code) {
        super(message);
        this.name = 'MalformedLoginError';
        this.errorCode = errorCode;
        this.statusCode = 401;
    }
}

// Classe de erro personalizado para quando o token estiver na blacklist
class TokenBlacklistedError extends Error {
    constructor(message = ERROR_TYPES.TOKEN_BLACKLISTED.message, errorCode = ERROR_TYPES.TOKEN_BLACKLISTED.code) {
        super(message);
        this.name = 'TokenBlacklistedError';
        this.errorCode = errorCode;
        this.statusCode = 401;
    }
}

// Classe de erro personalizado para quando o token não for válido
class InvalidTokenError extends Error {
    constructor(message = ERROR_TYPES.INVALID_TOKEN.message, errorCode = ERROR_TYPES.INVALID_TOKEN.code) {
        super(message);
        this.name = 'InvalidTokenError';
        this.errorCode = errorCode;
        this.statusCode = 401;
    }
}

// Classe de erro personalizado para quando houver muitas requisições
class TooManyRequestsError extends Error {
    constructor(message = ERROR_TYPES.TOO_MANY_REQUESTS.message, errorCode = ERROR_TYPES.TOO_MANY_REQUESTS.code) {
        super(message);
        this.name = 'TooManyRequestsError';
        this.errorCode = errorCode;
        this.statusCode = 429; // Código de status HTTP para Too Many Requests
    }
}


// Exportando as classes de erro personalizado
module.exports = {
    HeaderNotFoundError,
    MalformedLoginError,
    TokenBlacklistedError,
    InvalidTokenError,
    TooManyRequestsError,
    ERROR_TYPES
};
