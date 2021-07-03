require('express-async-errors')
const debuglogger = require('./debugLogs/debugLog')
const express = require('express');
const app = express();
const uri = require('./database')
const mongoose = require('mongoose')
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const auths = require('./routes/auth')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi) 
const bcrypt = require('bcrypt')
const config = require('config')
// const error = require('./middleware/error')

if(!config.get('jwtPrivateKey')){                   //export nodeapp_jwtPrivateKey = "yourKeyString"
    debuglogger.error('FATAL Error. Environment Variable is not set')
    console.log('FATAL Error. Environment Variable is not set')
    process.exit(1)
}
// DataBase Integeration
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify:false, useCreateIndex: true})
    .then(()=>{
        debuglogger.info('DB is Connected')
    })
    .catch(err=>{
        debuglogger.error('error is ....', err)
    })

app.use(express.json())
app.use('/api/genre',genres)        //genre routes
app.use('/api/customer',customers)  // customers routes
app.use('/api/movie',movies)        //movies router
app.use('/api/rental',rentals)      //rental routes
app.use('/api/user',users)          //users routes
app.use('/api/auth',auths)          //authentication
// app.use(error)

app.get('/',(req,res)=>{
    
    debuglogger.info('Home Route Successfully Loaded')
    res.send('homeroute');

})
const port = process.env.PORT||3000;
app.listen(port,()=>{
    debuglogger.info(`************************NEW SESSION*********************`)
    debuglogger.info(`________________________________________________________`)
    debuglogger.info(`App is Listening at ${port}`)
    
})

