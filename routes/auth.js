const express = require('express')
const router = express.Router()
const debuglogger = require('../debugLogs/debugLog')        //for logging
const {user_class} = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const Joi = require('joi');


router.get('/',async (req,res)=>{
    const result=await user_class.find().sort('genre')
    debuglogger.info(`Get Route of Users Loaded Successfully! `)
    res.send(result);
    
})

router.post('/',async (req,res)=>{

    const {error} = validate(req.body)
    if(error){

        debuglogger.error(error.details[0].message)
        return res.status(400).send(error.details[0].message)
    }
    let user = await user_class.findOne({email:req.body.email})
    if(!user){
        debuglogger.error('Invalid User or Password')
        return res.status(400).send('Invalid User or Password')
    }

    const validate_user = await bcrypt.compare(req.body.password,user.password)

    if(!validate_user){
        debuglogger.error('Invalid User or Password')
        return res.status(400).send('Invalid User or Password')
    }
    const token = user.generateAuthToken();
    res.send(token)
})


function validate(req) {

    const schema = Joi.object({
        email:Joi.string().min(5).max(255).email().required(),
        password:Joi.string().min(5).max(255).required()
        
    })
    return schema.validate(req)
}
module.exports = router