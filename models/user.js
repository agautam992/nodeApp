const Joi = require('joi');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config');

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
    ,
    isAdmin:{
        type:Boolean,
        default:false
    }
})

user_schema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'))
    return token
}
const user_class = mongoose.model('user_coll',user_schema)

function validateUser(user) {

    const schema = Joi.object({
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(255).email().required(),
        password:Joi.string().min(5).max(255).required(),
        isAdmin:Joi.boolean()
        
    })
    return schema.validate(user)
}

module.exports.user_class = user_class
module.exports.validateUser = validateUser