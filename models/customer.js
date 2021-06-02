const Joi = require('joi');
const mongoose = require('mongoose')

const customer_schema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:5,
        max:50
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phone:{
        type:String,
        required:true,
        min:5,
        max:50
    }
})

const customer_schema_class = mongoose.model('customer_schema_coll',customer_schema)

function validateCustomer(customer) {

    const schema = Joi.object({
        name:Joi.string().min(5).max(50).required(),
        isGold:Joi.boolean(),
        phone:Joi.string().min(5).max(50).required()
        
    })
    return schema.validate(customer)
}

module.exports.customer_schema_class = customer_schema_class
module.exports.validateCustomer = validateCustomer