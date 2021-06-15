const Joi = require('joi');
const mongoose = require('mongoose')

const user_schema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:5,
        max:50
    },
    email:{
        type:String,
        required:true,
        min:5,
        max:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:5,
        max:1024
    }
})

const user_class = mongoose.model('user_coll',user_schema)

function validateUser(user) {

    const schema = Joi.object({
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(255).email().required(),
        password:Joi.string().min(5).max(255).required()
        
    })
    return schema.validate(user)
}

module.exports.user_class = user_class
module.exports.validateUser = validateUser