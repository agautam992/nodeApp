const debuglogger = require('./debugLogs/debugLog')
const config = require('config')                             //export DEBUG=app:startup
const morgan=require('morgan')
const helmet=require('helmet')
const {logger,authenticate} = require('./logger')
const Joi = require('joi');
const express = require('express');
const { urlencoded, static } = require('express');
const app = express();
const router = require('./courses/courses')

app.use(express.json())
app.use(urlencoded({extended:true}))    //for things like key=1&name=course
app.use(static('public'))   //for css and non changing things, public is folder here
app.use(helmet())   //for security purposes

app.use('/api/movie',router)      //routers baby

//Configuration
// console.log(`Application Name : ${config.get('name')}`)
// console.log(`Mail Server Name : ${config.get('mail.host')}`)
// console.log(`Mail Password is : ${config.get('mail.password')}`)  //export app_password=1234567 before nodemon

app.get('/',(req,res)=>{

    debuglogger.info('Home Route Successfully Loaded')
    res.send('homeroute');

})

if(app.get('env')==='development'){         //export NODE_ENV=development
    app.use(morgan('dev'))                  //for logging details of session
    console.log('Morgan is Enabled')
}
app.use(logger);




const port = process.env.PORT||3000;
app.listen(port,()=>{
    // debuglogger.info(`***********NEW SESSION*************`)
    console.log("*****************NEW SESSION****************")
    // debuglogger.info(`App is Listening at ${port}`)
    console.log(`App is listening at ${port}`)
})

