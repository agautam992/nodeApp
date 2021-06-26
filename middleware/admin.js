//isAdmin OR not
const debuglogger = require('../debugLogs/debugLog') 
function admin(req,res,next){

    if(!req.user.isAdmin){
        debuglogger.warn('Access Denied')
        return res.status(403).send('Access Denied');
    }
    next()
}

module.exports = admin