/**
 * src/config/dbConfig.js
 * Data: 17/10/2023
 * Autor: http://github.com/lucasffa/
 * Descrição: Controlador que gerencia as requisições relacionadas à entidade de usuário.
 * 
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  connectionString: process.env.DATABASE_URL
});

module.exports = prisma;
