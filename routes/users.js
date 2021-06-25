const auth = require('../middleware/auth')
const express = require('express')
const router = express.Router()
const debuglogger = require('../debugLogs/debugLog')        //for logging
const {user_class,validateUser} = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

router.get('/me',auth,async (req,res)=>{
    const result=await user_class.findById(req.user._id).select('-password')
    debuglogger.info(`Get Route of Current User Loaded Successfully! `)
    res.send(result);
    
})

router.post('/',async (req,res)=>{

    const {error} = validateUser(req.body)
    if(error){

        debuglogger.error(error.details[0].message)
        return res.status(400).send(error.details[0].message)
    }
    let user = await user_class.findOne({email:req.body.email})
    if(user){
        debuglogger.error('User is Already Registered')
        return res.status(400).send('User is Already Registered')
    }
    user = new user_class(_.pick(req.body,['name','email','password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password,salt)
    await user.save()
    if(!user){
        debuglogger.error(`New user DID NOT save Successfully`)
    }
    debuglogger.info(`New user saved Successfully`)

    const token = user.generateAuthToken();

    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']))                    
})

module.exports = router