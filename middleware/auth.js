const debuglogger = require('../debugLogs/debugLog') 
const jwt = require('jsonwebtoken')
const config = require('config')

function auth(req,res,next){
    const token = req.header('x-auth-token')
    if(!token){
        debuglogger.warn('Access Denied. No token Provided')
        return res.status(401).send('Access Denied. No token Provided')
    }
    try{
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'))       //return decoded payload
        req.user = decoded              //will be used in protected APIs
        next()
    }
    catch(ex){
        debuglogger.warn('Invalid Token')
        res.status(401).send('Invalid Token')
    }
}
module.exports = auth