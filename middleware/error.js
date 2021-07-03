const debuglogger = require('../debugLogs/debugLog')
module.exports = function(err, req,res,next){
    //Logging Middleware Errors
    debuglogger.error(`Something Failed----> ${err}`)
    return res.status(500).send('Something Failed')
}