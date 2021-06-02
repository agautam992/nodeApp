const {genre_schema_class,validateGenre}=require('../models/genre')
const express = require('express')
const router = express.Router()
const debuglogger = require('../debugLogs/debugLog')

router.get('/',async (req,res)=>{
    const result=await genre_schema_class.find().sort('genre')
    res.send(result);
    
})

router.get('/:id',async (req,res)=>{

    const genre = await genre_schema_class.findById(req.params.id)
    if(!genre)
    {
        debuglogger.error(`Result NOT found for given ID = ${req.params.id}`)
        return res.status(404).send(`Result NOT found for given ID = ${req.params.id}`)
    }
    debuglogger.info(`Result found for given ID = ${req.params.id}`)
    return res.status(200).send(genre);
})


router.post('/',async (req,res)=>{

    const {error} = validateGenre(req.body)
    if(error) 
    {
        debuglogger.error(`error.details[0].message`)
        return res.status(400).send(error.details[0].message)
    }
        let genre = new genre_schema_class({                      //creating new object 
        name: req.body.name            
    })
    genre = await genre.save()      
    debuglogger.info(`New Object Inserted Successfully`)
    res.send(genre)                   
})

router.put('/:id',async (req,res)=>{

     //validate the genre parameters
     const {error} = validateGenre(req.body)
     if(error) 
     {
        return res.status(400).send(error.details[0].message)
     }
    const genre = await genre_schema_class.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})
    if(!genre) 
    {
        return res.status(404).send(`Result NOT found for given ID = ${req.params.id}`)
    }
    res.send(genre);        
})

router.delete('/:id',async (req,res)=>{

    const genre = await genre_schema_class.findByIdAndDelete(req.params.id)
    if(!genre) 
    {
        return res.status(404).send(`Result NOT found for given ID = ${req.params.id}`)
    }
    return res.send(genre);
    
})

module.exports = router