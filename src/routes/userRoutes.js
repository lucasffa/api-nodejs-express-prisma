/**
 * src/routes/userRoutes.js
 * Data: 17/10/2023
 * Autor: http://github.com/lucasffa/
 * Descrição: Define as rotas relacionadas à entidade de usuário.
 * 
 * Dependências:
 * - express: Framework web para a definição e gerenciamento de rotas.
 * - UserController: Controller que contém os handlers para cada rota de usuário.
 * 
 * Rotas Definidas:
 * 
 * 1. POST /users/create/
 *    - Descrição: Cria um novo usuário.
 *    - Controller Handler: `UserController.createUser`
 * 
 * 2. GET /users/get/:id
 *    - Descrição: Retorna os detalhes de um usuário com base no ID fornecido.
 *    - Controller Handler: `UserController.getUserById`
 *    - Parâmetros:
 *      - id: ID do usuário.
 * 
 * 3. GET /users/get/
 *    - Descrição: Retorna todos os usuários.
 *    - Controller Handler: `UserController.getAllUsers`
 * 
 * 4. PUT /users/update/:id
 *    - Descrição: Atualiza os detalhes de um usuário com base no ID fornecido.
 *    - Controller Handler: `UserController.updateUser`
 *    - Parâmetros:
 *      - id: ID do usuário.
 * 
 * 5. DELETE /users/delete/:id
 *    - Descrição: Exclui um usuário com base no ID fornecido.
 *    - Controller Handler: `UserController.deleteUser`
 *    - Parâmetros:
 *      - id: ID do usuário.
 * 
 * 6. PATCH /users/toggle/useractivity/:id
 *   - Descrição: Atualiza o status de atividade de um usuário com base no ID fornecido.
 *   - Controller Handler: `UserController.toggleUserActivity`
 *   - Parâmetros:
 *     - id: ID do usuário.
 * 
 * 7. GET /users/get-uuid/:uuid
 *   - Descrição: Retorna os detalhes de um usuário com base no UUID fornecido.
 *   - Controller Handler: `UserController.getUserByUUID`
 *   - Parâmetros:
 *     - uuid: UUID do usuário.
 * 
 * 8. PUT /users/update-uuid/:uuid
 *   - Descrição: Atualiza os detalhes de um usuário com base no UUID fornecido.
 *   - Controller Handler: `UserController.updateUserByUUID`
 *   - Parâmetros:
 *     - uuid: UUID do usuário.
 *     
 * 9. PATCH /users/toggle-uuid/useractivity/:uuid
 *   - Descrição: Atualiza o status de atividade de um usuário com base no UUID fornecido.
 *   - Controller Handler: `UserController.toggleUserActivityByUUID`
 *   - Parâmetros:
 *     - uuid: UUID do usuário.
 * 
 * 10. DELETE /users/delete-uuid/:uuid
 *   - Descrição: Exclui um usuário com base no UUID fornecido.
 *   - Controller Handler: `UserController.deleteUserByUUID`
 *   - Parâmetros:
 *     - uuid: UUID do usuário.
 * 
 * 11. POST /users/login
 *   - Descrição: Autentica um usuário e retorna um token JWT.
 *   - Controller Handler: `AuthController.login`
 *   - Parâmetros:
 *     - email: E-mail do usuário.
 *     - password: Senha do usuário (sofrerá bcrypt posteriormente)
 * 
 * 12. POST /users/logout
 *   - A ser feito.
 * 
 * Observações:
 * - As rotas são anexadas ao endpoint base '/users'. Portanto, por exemplo, a rota POST /create/ completa seria POST /users/create/.
 * 
 * Exemplo de Uso:
 * Para integrar estas rotas em um servidor Express, importe este módulo e use-o como middleware:
 * ```javascript
 * const userRoutes = require('./src/routes/userRoutes');
 * app.use('/users', userRoutes);
 * ```
 */

const express = require('express');
const UserController = require('../controllers/userController');
const AuthController = require('../controllers/authController');
const UserValidations = require('../validations/userValidations');
const AuthValidations = require('../validations/authValidations');
const validationErrorHandler = require('../middlewares/validationErrorHandler');
const rateLimit = require("express-rate-limit");
const AuthMiddleware = require('../middlewares/authMiddleware');
const UUIDAndIdMiddleware = require('../middlewares/uuidAndIdMiddleware');
const RoleMiddleware = require('../middlewares/roleMiddleware');
const logger = require('../logs/logger');
const { v4: uuidv4 } = require('uuid');
const uuidToBase62 = require('../utils/functions').uuidToBase62;
const { RequestLogger, ResponseLogger} = require('../middlewares/logMiddleware');
const { LoginLimiter, ApiLimiter } = require('../middlewares/limiterMiddleware');

const router = express.Router();





// Aplique para todas as rotas
router.use((req, res, next) => {
    
  const originalUuid = uuidv4();
  const shortenedUuid = uuidToBase62(originalUuid);
  req.rId = shortenedUuid;

  next();
});
router.use((new ApiLimiter).middleware());

router.use((new RequestLogger()).middleware());
router.use((new ResponseLogger()).middleware());

// User routes
router.post('/create/', UserValidations.create(), validationErrorHandler, UserController.createUser);
router.get('/get/:id', AuthMiddleware.verifyToken, RoleMiddleware.requireRole([1, 2]), UserValidations.getById(), validationErrorHandler, UserController.getUserById);
router.get('/get-uuid/', AuthMiddleware.verifyToken, UserValidations.getByUUID(), validationErrorHandler, UserController.getUserByUUID);
router.get('/get/', AuthMiddleware.verifyToken, UserValidations.getAll(), validationErrorHandler, UserController.getAllUsers);
router.put('/update/:id', AuthMiddleware.verifyToken, RoleMiddleware.requireRole([1, 2]), UserValidations.update(), validationErrorHandler, UserController.updateUser);
router.put('/update-uuid/', AuthMiddleware.verifyToken, UUIDAndIdMiddleware.verifyUUIDandID, UserValidations.updateByUUID(), validationErrorHandler, UserController.updateUserByUUID);
router.delete('/delete/:id', AuthMiddleware.verifyToken, RoleMiddleware.requireRole([1, 2]), UserValidations.delete(), validationErrorHandler, UserController.deleteUser);
router.delete('/delete-uuid/', AuthMiddleware.verifyToken, RoleMiddleware.requireRole([1, 2]), UserValidations.deleteByUUID(), validationErrorHandler, UserController.deleteUserByUUID);
router.patch('/toggle/useractivity/:id', AuthMiddleware.verifyToken, RoleMiddleware.requireRole([1, 2]), UserValidations.toggleUserActivity(), validationErrorHandler, UserController.toggleUserActivity);
router.patch('/toggle-uuid/useractivity/', AuthMiddleware.verifyToken, RoleMiddleware.requireRole([1, 2]), UserValidations.toggleUserActivityByUUID(), validationErrorHandler, UserController.toggleUserActivityByUUID);
    // Login/Logout routes
    router.post('/login', (new LoginLimiter).middleware(), AuthValidations.login(), validationErrorHandler, AuthController.login);

// Middleware 404
router.use((req, res, next) => {
    const errorResponse = {
        status: 'error',
        errorCode: 404,
        message: 'Rota não encontrada',
        path: req.originalUrl
    };
    res.status(404).json(errorResponse);
});


module.exports = router;
