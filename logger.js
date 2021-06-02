function logger(req,res,next){
    console.log('logging......')
    next();
}
function authenticate(req,res,next){
    console.log('authenticating......')
    next();
}
module.exports = {
    logger,authenticate
};
