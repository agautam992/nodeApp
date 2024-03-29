const express = require('express')
const router = express.Router()
const debuglogger = require('../debugLogs/debugLog')        //for logging
const {customer_schema_class,validateCustomer} = require('../models/customer')
const _ = require('lodash')


router.get('/',async (req,res)=>{
    debuglogger.info(`Routing Path-- ${req.headers.host}${req.baseUrl}${req.url}\tRouting Type-- ${req.route.stack[0].method}`)
    const customers=await customer_schema_class.find().sort('name')
    debuglogger.info(`Get Route of Customer Loaded Successfully! `)
    res.send(customers);
    
})

router.get('/:id',async (req,res)=>{
    debuglogger.info(`Routing Path-- ${req.headers.host}${req.baseUrl}${req.url}\tRouting Type-- ${req.route.stack[0].method}`)
    const customer = await customer_schema_class.findById(req.params.id)
    if(!customer)
    {
        debuglogger.error(`Result not found for given ID = ${req.params.id}`)
        return res.status(404).send(`Result not found for given ID = ${req.params.id}`)
    }
    debuglogger.info(`Result found for given ID = ${req.params.id}`)
    return res.status(200).send(customer);
})

router.post('/',async (req,res)=>{
    debuglogger.info(`Routing Path-- ${req.headers.host}${req.baseUrl}${req.url}\tRouting Type-- ${req.route.stack[0].method}`)
    const {error} = validateCustomer(req.body)
    if(error){

        debuglogger.error(`Error in Validation:- ${error.details[0].message}`)
        return res.status(400).send(`Error in Validation:- ${error.details[0].message}`)
    }
    const customer = new customer_schema_class(_.pick(req.body,['name','isGold','phone']))
    await customer.save()
    if(!customer){
        debuglogger.error(`New Customer DID NOT save Successfully`)
    }
    debuglogger.info(`New Customer saved Successfully`)
    res.send(customer)                    
})


router.put('/:id',async (req,res)=>{
    debuglogger.info(`Routing Path-- ${req.headers.host}${req.baseUrl}${req.url}\tRouting Type-- ${req.route.stack[0].method}`)
    //validate the customer parameters
    const {error} = validateCustomer(req.body)

    if(error) {
        debuglogger.error(`Error in Validation:- ${error.details[0].message}`)
        return res.status(400).send(`Error in Validation:- ${error.details[0].message}`)
    }
    
    const customer = await customer_schema_class.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})
    if(!customer) {
        debuglogger.error(`Result not found for given ID = ${req.params.id}`)
        return res.status(404).send(`Result not found for given ID = ${req.params.id}`)
    }
    debuglogger.info(`Customer Updated Successfully`)
    res.send(customer);        
})


router.delete('/:id',async (req,res)=>{
    debuglogger.info(`Routing Path-- ${req.headers.host}${req.baseUrl}${req.url}\tRouting Type-- ${req.route.stack[0].method}`)
    const customer = await customer_schema_class.findByIdAndDelete(req.params.id)
        if(!customer) 
        {
            debuglogger.error(`Result not found for given ID = ${req.params.id}`)
            return res.status(404).send(`Result not found for given ID = ${req.params.id}`)
        }
        debuglogger.info(`Customer Deleted Successfully`)
        return res.send(customer);
        
    })

module.exports = router