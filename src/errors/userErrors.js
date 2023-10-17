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

class IdNotFoundError extends Error {
    constructor(message = 'Não conseguiu encontrar id', errorCode = ERROR_CODES.ID_NOT_FOUND) {
        super(message);
        this.name = 'IdNotFoundError';
        this.errorCode = errorCode;
        this.statusCode = 404;  // Not Found
    }
}

class UserCreateError extends Error {
    constructor(message = 'Não conseguiu criar usuário', errorCode = ERROR_CODES.USER_CREATE_ERROR) {
        super(message);
        this.name = 'IdNotFoundError';
        this.errorCode = errorCode;
        this.statusCode = 404;  // Not Found
    }
}

class UserCreateEmailError extends Error {
    constructor(message = 'Este e-mail já está registrado', errorCode = ERROR_CODES.USER_CREATE_EMAIL_ERROR) {
        super(message);
        this.name = 'IdNotFoundError';
        this.errorCode = errorCode;
        this.statusCode = 404;  // Not Found
    }
}

class UserNotFoundError extends Error {
    constructor(message = 'Não conseguiu encontrar usuário', errorCode = ERROR_CODES.USER_NOT_FOUND) {
        super(message);
        this.name = 'UserNotFoundError';
        this.errorCode = errorCode;
        this.statusCode = 404;  // Not Found
    }
}

class UserUpdateError extends Error {
    constructor(message = 'Não conseguiu atualizar usuário', errorCode = ERROR_CODES.USER_UPDATE_ERROR) {
        super(message);
        this.name = 'UserUpdateError';
        this.errorCode = errorCode;
        this.statusCode = 500;  // Internal Server Error
    }
}

class UserDeleteError extends Error {
    constructor(message = 'Não conseguiu deletar usuário', errorCode = ERROR_CODES.USER_DELETE_ERROR) {
        super(message);
        this.name = 'UserDeleteError';
        this.errorCode = errorCode;
        this.statusCode = 500;  // Internal Server Error
    }
}

class UserInfoRetrievalError extends Error {
    constructor(message = 'Não conseguiu trazer informações do usuário', errorCode = ERROR_CODES.USER_INFO_RETRIEVAL_ERROR) {
        super(message);
        this.name = 'UserInfoRetrievalError';
        this.errorCode = errorCode;
        this.statusCode = 500;  // Internal Server Error
    }
}

class UsersInfoRetrievalError extends Error {
    constructor(message = 'Não conseguiu trazer informações dos usuários', errorCode = ERROR_CODES.USERS_INFO_RETRIEVAL_ERROR) {
        super(message);
        this.name = 'UsersInfoRetrievalError';
        this.errorCode = errorCode;
        this.statusCode = 500;  // Internal Server Error
    }
}

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
