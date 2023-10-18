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
const UserValidations = require('../validations/userValidations');
const validationErrorHandler = require('../middlewares/validationErrorHandler');

const router = express.Router();

// Rotas de usuário
router.post('/create/', UserValidations.create(), validationErrorHandler, UserController.createUser);
router.get('/get/:id', UserValidations.getById(), validationErrorHandler, UserController.getUserById);
router.get('/get/', UserValidations.getAll(), validationErrorHandler, UserController.getAllUsers);
router.put('/update/:id', UserValidations.update(), validationErrorHandler, UserController.updateUser);
router.delete('/delete/:id', UserValidations.delete(), validationErrorHandler, UserController.deleteUser);

module.exports = router;
