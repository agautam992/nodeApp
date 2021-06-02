const debuglogger = require('./debugLogs/debugLog')
const express = require('express');
const app = express();
const uri = require('./database')
const mongoose = require('mongoose')
const genres = require('./routes/genres')
const customers = require('./routes/customers')

// DataBase Integeration
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify:false})
    .then(()=>{
        debuglogger.info('DB is Connected')
    })
    .catch(err=>{
        debuglogger.error('error is ....', err)
    })

app.use(express.json())
app.use('/api/genre',genres)        //genre routes
app.use('/api/customer',customers)  // customers routes


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

