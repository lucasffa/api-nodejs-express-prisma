/**
 * limiterMiddleware.js
 *
 * Base class for rate limiting middleware. This class can be extended to create
 * specific rate limiting functionalities such as login limiting or API call limiting.
 *
 * Usage:
 * app.use('/login', new LoginLimiter().middleware());
 * app.use('/api', new ApiLimiter().middleware());
 *
 * Example:
 * ```javascript
 * const express = require('express');
 * const { LoginLimiter, ApiLimiter } = require('./limiterMiddleware');
 *
 * const app = express();
 *
 * app.use('/login', new LoginLimiter().middleware());
 * app.use('/api', new ApiLimiter().middleware());
 * ```
 *
 * @module limiterMiddleware
 */

const rateLimit = require('express-rate-limit');
const { LogMiddleware } = require('./logMiddleware'); // Assuming this is the logging middleware
const {
  TooManyRequestsError
} = require('../errors/authErrors.js');  // ajuste o caminho conforme necessário



class LimiterMiddleware {
  constructor(options) {
      this.limiter = rateLimit({
          ...options,
          handler: (req, res, next) => {
              next(new TooManyRequestsError()); // Passando o erro para o próximo middleware
          }
      });
  }

  middleware() {
      return this.limiter;
  }
}

class LoginLimiter extends LimiterMiddleware {
  constructor() {
    super({
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 3, // Limit each IP to 3 attempts per `window` (here, per hour)
      //message: "Too many login attempts. Please try again later.",
      headers: true
    });
  }
}

class ApiLimiter extends LimiterMiddleware {
  constructor() {
    super({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
      //message: "Too many requests from this IP, please try again after 15 minutes."
    });
  }
}

module.exports = {
  LoginLimiter,
  ApiLimiter
};
