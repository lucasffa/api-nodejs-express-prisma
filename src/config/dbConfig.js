const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  connectionString: process.env.DATABASE_URL
});

module.exports = prisma;
