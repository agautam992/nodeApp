//isAdmin OR not
const debuglogger = require('../debugLogs/debugLog') 
function admin(req,res,next){
    debuglogger.info(`Routing Path-- ${req.headers.host}${req.baseUrl}${req.url}\tRouting Type-- ${req.route.stack[0].method}`)
    if(!req.user.isAdmin){
        debuglogger.warn('Access Denied')
        return res.status(403).send('Access Denied');
    }
    next()
}

module.exports = admin