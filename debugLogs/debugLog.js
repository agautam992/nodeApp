const { createLogger, format, transports } = require('winston');
const winston = require('winston')
const debuglogger = createLogger({
    format: format.combine(format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),format.simple()),
    level:'info',
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({ filename:'debugLogs/Logs.log' })
    ]
},{
    format: format.combine(format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),format.simple()),
    level:'error',
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'debugLogs/Logs.log' })
    ]
},{
    format: format.combine(format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),format.simple()),
    level:'warn',
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'debugLogs/Logs.log' })
    ]
})
// added a comment
module.exports = debuglogger
