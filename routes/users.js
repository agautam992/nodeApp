const express = require('express')
const router = express.Router()
const debuglogger = require('../debugLogs/debugLog')        //for logging
const {user_class,validateUser} = require('../models/user')


router.get('/',async (req,res)=>{
    const result=await user_class.find().sort('genre')
    debuglogger.info(`Get Route of Users Loaded Successfully! `)
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
    user = new user_class({                      
        name: req.body.name,
        email:req.body.email,
        password:req.body.password             
    })
    await user.save()
    if(!user){
        debuglogger.error(`New user DID NOT save Successfully`)
    }
    debuglogger.info(`New user saved Successfully`)
    res.send(user)                    
})

module.exports = router