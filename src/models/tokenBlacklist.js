// models/TokenBlacklist.js
class TokenBlacklist {
    constructor(collection) {
      this.collection = collection;
    }
  
    async addTokenToBlacklist(token, reason) {
      const timestamp = new Date();
      const doc = { token, timestamp, reason };
      return await this.collection.insertOne(doc);
    }
  
    async isTokenBlacklisted(token) {
      const result = await this.collection.findOne({ token });
      return !!result;
    }
  
    // Aqui você pode adicionar mais métodos conforme necessário
  }
  
  module.exports = TokenBlacklist;
  