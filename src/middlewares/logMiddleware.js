/**
 * logMiddleware.js
 *
 * Base class for logging middleware. This class can be extended to create
 * specific logging functionalities such as request logging, response time logging, etc.
 *
 * Usage:
 * app.use(new RequestLogger().middleware());
 * app.use(new ResponseLogger().middleware());
 *
 * Example:
 * ```javascript
 * const express = require('express');
 * const { RequestLogger, ResponseLogger } = require('./logMiddleware');
 *
 * const app = express();
 *
 * app.use(new RequestLogger().middleware());
 * app.use(new ResponseLogger().middleware());
 * ```
 *
 * @module logMiddleware
 */

const logger = require('../logs/logger');

class LogMiddleware {
  constructor() {
    if (new.target === LogMiddleware) {
      throw new TypeError("Cannot construct LogMiddleware instances directly");
    }
  }

  log(info) {
    logger.log(info);
  }

  middleware() {
    return (req, res, next) => {
      throw new Error('You have to implement the method middleware!');
    };
  }
}

class RequestLogger extends LogMiddleware {
  sanitizeBody(body) {
    const sanitized = { ...body };
    delete sanitized.name;
    delete sanitized.password;
    return sanitized;
  }

  middleware() {
    return (req, res, next) => {
      const sanitizedBody = this.sanitizeBody(req.body);
      const logObject = {
        level: 'debug',
        msg: 'Received HTTP request.',
        mthd: req.method,
        url: req.url,
        ip: req.ip,
        reqId: req.rId,
      };

      if (Object.keys(sanitizedBody).length > 0) logObject.body = sanitizedBody;
      if (Object.keys(req.params).length > 0) logObject.params = req.params;
      if (Object.keys(req.query).length > 0) logObject.query = req.query;

      this.log(logObject);
      next();
    };
  }
}

class ResponseLogger extends LogMiddleware {
  middleware() {
    return (req, res, next) => {
      const startHrTime = process.hrtime();

      res.on('finish', () => {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs = (elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6).toFixed(3);
        req.responseTime = `${elapsedTimeInMs}ms`;
        this.log({
          level: 'debug',
          msg: 'HTTP response sent.',
          sttsC: res.statusCode,
          resT: req.responseTime,
          reqId: req.rId,
          reqMsg: req.message,
        });
      });

      next();
    };
  }
}

module.exports = {
  RequestLogger,
  ResponseLogger,
  LogMiddleware
};
