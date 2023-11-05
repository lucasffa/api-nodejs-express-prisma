
const baseX = require('base-x');

// Definindo a codificação base62
const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base62 = baseX(BASE62);

function uuidToBase62(uuidString) {
  // Remove os hífens do UUID e converte para um Buffer
  const buffer = Buffer.from(uuidString.replace(/-/g, ''), 'hex');
  
  // Converte o Buffer para base62
  return base62.encode(buffer);
}

module.exports = {
    uuidToBase62
    };