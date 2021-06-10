const {genre_schema_class}=require('../models/genre')
const {Movie_schema_class,validateMovie} = require('../models/movie')
const express = require('express')
const router = express.Router()
const debuglogger = require('../debugLogs/debugLog')

router.get('/',async (req,res)=>{
    const result=await Movie_schema_class.find().sort('title')
    debuglogger.info(`Get Route of Movie Loaded Successfully! `)
    res.send(result);
    
})

router.get('/:id',async (req,res)=>{

    const movie = await Movie_schema_class.findById(req.params.id)
    if(!movie){

        debuglogger.error(`Result NOT found for given ID = ${req.params.id}`)
        return res.status(404).send(`Result NOT found for given ID = ${req.params.id}`)
    }
    debuglogger.info(`Result found for given ID = ${req.params.id}`)
    return res.status(200).send(movie);
})


router.post('/',async (req,res)=>{

    const {error} = validateMovie(req.body)
    if(error) {

        debuglogger.error(`error.details[0].message`)
        return res.status(400).send(error.details[0].message)
    }
    const genre = await genre_schema_class.findById(req.body.genreID)
    if(!genre){
        debuglogger.error(`Invalid Genre`)
        return res.status(400).send('Invalid Genre' )
    }

    let movie = new Movie_schema_class({                      //creating new object 
        title: req.body.title,
        numberInStock:req.body.numberInStock,
        dailyRental:req.body.dailyRental,
        genre:{
            _id:genre._id,
            name:genre.name
        }            
    })
    movie = await movie.save()     
    if(!movie){
        debuglogger.error(`New movie DID NOT save Successfully`)
    } 
    debuglogger.info(`New movie Saved Successfully`)
    res.send(movie)                   
})

router.put('/:id',async (req,res)=>{

    //validate the Movie parameters
    const {error} = validateMovie(req.body)
    if(error){
        debuglogger.error(`error.details[0].message`)
        return res.status(400).send(error.details[0].message)
    }
    const genre = await genre_schema_class.findById(req.body.genreID)
    if(!genre){
        debuglogger.error(`Invalid Genre`)
        return res.status(400).send('Invalid Genre' )
    }
    const movie = await Movie_schema_class.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        numberInStocks:req.body.numberInStock,
        dailyRental:req.body.dailyRental,
        genre:{
            _id:genre._id,
            name:genre.name
        } 
    
    },{new:true})
    if(!movie){
        debuglogger.error(`Movie NOT found for given ID = ${req.params.id}`)
        return res.status(404).send(`Movie NOT found for given ID = ${req.params.id}`)
    }
    debuglogger.info(`Movie Updated Successfully`)
    res.send(movie);        
})

router.delete('/:id',async (req,res)=>{

    const movie = await Movie_schema_class.findByIdAndDelete(req.params.id)
    if(!movie){
        debuglogger.error(`Movie NOT found for given ID = ${req.params.id}`)
        return res.status(404).send(`Movie NOT found for given ID = ${req.params.id}`)
    }
    debuglogger.info(`Movie Deleted Successfully`)
    return res.send(movie);
    
})

module.exports = router