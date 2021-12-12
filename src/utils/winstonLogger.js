/**
 * @namespace winstonLogger
 * @description configuring winston logger.
 * @author vinod khetade
 */

 const fs = require('fs');

var winston = require('winston');
var DailyRotateFile = require('winston-daily-rotate-file');
var logConfig =  {
    logLevel: "info",
    errorLogPath: "./logs/error",
    infoLogPath: "./logs"
};

// winston.emitErrs = true;

var infoFilename =  './logs/info.log';
var errorFilename = './logs/error.log';

//region create log folder if doesn't exits
if (!fs.existsSync(logConfig.infoLogPath)) {

    try {
        console.log("Logging folder for 'info log' does not exist. Creating new folder... ");
        fs.mkdirSync(logConfig.infoLogPath);
    }
    catch(e)
    {
        console.log("Error while creating new folder for 'info log', error::");
        console.log(e);
    }
}
if (!fs.existsSync(logConfig.errorLogPath)) {

    try {
        console.log("Logging folder for 'error log' does not exist. Creating new folder... ");
        fs.mkdirSync(logConfig.errorLogPath);
    }
    catch(e)
    {
        console.log("Error while creating new folder for 'error log', error::");
        console.log(e);
    }
}
//endregion

var transports = [
    new DailyRotateFile({
        name: 'info-file',
        level: 'info',
        localTime:true,
        datePattern: logConfig.datePattern,
        filename: infoFilename,
        handleExceptions: true,
        json: true,
        colorize: false
    }),
    new DailyRotateFile({
        level: 'error',
        localTime:true,
        datePattern: logConfig.datePattern,
        filename: errorFilename,
        handleExceptions: true,
        json: true,
        colorize: false
    })
];

transports.push(new winston.transports.Console({
    level: logConfig.logLevel,
    handleExceptions: true,
    json: false,
    colorize: true
}));

var logger =  winston.createLogger({
    transports: transports,
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};
