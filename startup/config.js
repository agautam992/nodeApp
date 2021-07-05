const config = require('config');
module.exports = function(){
    if(!config.get('jwtPrivateKey')){                   //export nodeapp_jwtPrivateKey = "yourKeyString"
        throw new Error('FATAL Error. Environment Variable (nodeapp_jwtPrivateKey) is not defined')
    }
}