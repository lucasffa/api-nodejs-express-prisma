const fs = require('fs');
const { createLogger, format, transports } = require('winston');
const Transport = require('winston-transport');
const { combine, timestamp, printf, colorize, json } = format;

// Criar um formato personalizado para o console
const consoleFormat = printf(({ level, msg, timestamp, reqId }) => {
  return `${timestamp} [${level}]: ${msg} | reqId: [${reqId}]`;
});

class TreeTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.filename = opts.filename;
    this.logData = { logs: [] }; // Estrutura inicial do objeto pai
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });
    const logEntry = { ...info, reqId: info.reqId };
    // Ler o arquivo atual e adicionar o log ao objeto pai
    fs.readFile(this.filename, (err, data) => {
        if (err) {
          if (err.code === 'ENOENT') {
            // Se o arquivo não existir, inicialize um novo objeto de log
            this.logData.logs.push(logEntry);
          } else {
            // Se houver outro erro, logue-o e execute o callback com erro
            console.error('Erro ao ler o arquivo de log:', err);
            return callback(err);
          }
        } else {
          // Certifique-se de que 'data' não é uma string vazia
          if (data.length) {
            try {
              // Tente parse o JSON apenas se houver dados para parse
              let existingLogs = JSON.parse(data);
              existingLogs.logs.push(info);
              this.logData = existingLogs;
            } catch (parseErr) {
              // Se houver erro de parse, logue-o e execute o callback com erro
              console.error('Erro ao fazer parse do JSON do arquivo de log:', parseErr);

              // O return abaixo 
              return new Error('Erro ao fazer parse do JSON do arquivo de log:', parseErr);
            }
          } else {
            // Se o arquivo estiver vazio, inicialize um novo objeto de log
            this.logData.logs.push(info);
          }
        }
      
        // Escrever de volta ao arquivo com um formato bonito
        fs.writeFile(this.filename, JSON.stringify(this.logData, null, 2), (writeErr) => {
          if (writeErr) {
            console.error('Erro ao escrever no arquivo de log:', writeErr);
            return callback(writeErr);
          }
          callback();
        });
    });
      


  }
}

const logger = createLogger({
  level: 'debug', // Nível mais baixo para capturar todos os logs
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    // Transporte personalizado para a saída de arquivo em estrutura de árvore
    new TreeTransport({ filename: 'tree-structured-logs.json' }),

    // Transporte de console com formatos coloridos e personalizados
    new transports.Console({
      level: 'debug', // Altere conforme necessário para filtrar os níveis de log
      format: combine(
        colorize(),
        timestamp(),
        consoleFormat // Usar o formato personalizado para o console
      )
    })
  ]
});

module.exports = logger;
