const mongoose = require('mongoose')
const uri = require('../database')
module.exports = function(debuglogger){
    // DataBase Integeration
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify:false, useCreateIndex: true})
    .then(()=>{
        debuglogger.info('DB is Connected')
    })
}
