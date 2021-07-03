const auth = require('../middleware/auth')
const admin =require('../middleware/admin')
const {genre_schema_class,validateGenre}=require('../models/genre')
const express = require('express')
const router = express.Router()
const debuglogger = require('../debugLogs/debugLog')


router.get('/',async (req,res,next)=>{
    debuglogger.info(`Routing Path-- ${req.headers.host}${req.baseUrl}${req.url}\tRouting Type-- ${req.route.stack[0].method}`)
    const result=await genre_schema_class.find().sort('genre')
    debuglogger.info(`Get Route of Genre Loaded Successfully! `)
    res.send(result)
})

router.get('/:id',async (req,res)=>{
    debuglogger.info(`Routing Path-- ${req.headers.host}${req.baseUrl}${req.url}\tRouting Type-- ${req.route.stack[0].method}`)
    const genre = await genre_schema_class.findById(req.params.id)
    if(!genre){

        debuglogger.error(`Result NOT found for given ID = ${req.params.id}`)
        return res.status(404).send(`Result NOT found for given ID = ${req.params.id}`)
    }
    debuglogger.info(`Result found for given ID = ${req.params.id}`)
    return res.status(200).send(genre);
})


router.post('/',auth,async (req,res)=>{
    debuglogger.info(`Routing Path-- ${req.headers.host}${req.baseUrl}${req.url}\tRouting Type-- ${req.route.stack[0].method}`)
    const {error} = validateGenre(req.body)
    if(error) {

        debuglogger.error(error.details[0].message)
        return res.status(400).send(error.details[0].message)
    }
    const genre = new genre_schema_class({                      //creating new object 
        name: req.body.name            
    })
    await genre.save()     
    if(!genre){
        debuglogger.error(`New Genre DID NOT save Successfully`)
    } 
    debuglogger.info(`New Genre Saved Successfully`)
    res.send(genre)                   
})

router.put('/:id',auth,async (req,res)=>{
    debuglogger.info(`Routing Path-- ${req.headers.host}${req.baseUrl}${req.url}\tRouting Type-- ${req.route.stack[0].method}`)
    //validate the genre parameters
    const {error} = validateGenre(req.body)
    if(error){
        debuglogger.error(error.details[0].message)
        return res.status(400).send(error.details[0].message)
    }
    const genre = await genre_schema_class.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})
    if(!genre){
        debuglogger.error(`Genre not found for given ID = ${req.params.id}`)
        return res.status(404).send(`Genre NOT found for given ID = ${req.params.id}`)
    }
    debuglogger.info(`Genre Updated Successfully`)
    res.send(genre);        
})

router.delete('/:id',[auth,admin],async (req,res)=>{
    debuglogger.info(`Routing Path-- ${req.headers.host}${req.baseUrl}${req.url}\tRouting Type-- ${req.route.stack[0].method}`)
    const genre = await genre_schema_class.findByIdAndDelete(req.params.id)
    if(!genre){
        debuglogger.error(`Genre not found for given ID = ${req.params.id}`)
        return res.status(404).send(`Result NOT found for given ID = ${req.params.id}`)
    }
    debuglogger.info(`Genre Deleted Successfully`)
    return res.send(genre);
    
})

module.exports = router