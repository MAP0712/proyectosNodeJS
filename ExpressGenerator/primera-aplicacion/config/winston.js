const winston = require('winston');
const appRoot =require('app-root-path');

let options = {
    file: {
        level: 'info',
        handleExceptions: true,
        filename: `${appRoot}/logs/app.log`,
        format: winston.format.json(),
        maxsize: 5242880, //5mb
        maxfiles: 5
    },
    console: {
        level: 'silly',
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }
};

let logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
});

logger.stream ={
    write: function (message,encoding){
        logger.info(message);
    }
}

module.exports = logger;
