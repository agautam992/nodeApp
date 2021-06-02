const Joi = require('joi');
const mongoose = require('mongoose')
const express = require('express')
const debuglogger = require('../debugLogs/debugLog')
const uri = require('../database')
const router = express.Router()

// DataBase Integeration
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify:false})
    .then(()=>{
        // debuglogger.info('DB is Connected')
        console.log('DB is connected')
    })
    .catch(err=>{
        debuglogger.error('error is ....', err)
    })

const db_schema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:5,
        max:200
    }
})

const db_schema_class = mongoose.model('db_schema_coll',db_schema)
router.get('/',async (req,res)=>{
    const result=await db_schema_class.find().sort('genre')
    res.send(result);
    
})

router.get('/:id',async (req,res)=>{

    const movie = await db_schema_class.findById(req.params.id)
    // const course = courses.find(obj=>            //watchout syntax of find function!!!!!
        // obj.id===parseInt(req.params.id)
// );
    if(!movie)
    {
        debuglogger.error(`Result not found for given ID = ${req.params.id}`)
        return res.status(404).send(`Result not found for given ID = ${req.params.id}`)
    }
    debuglogger.info(`Result found for given ID = ${req.params.id}`)
    return res.status(200).send(movie);
})


router.post('/',async (req,res)=>{

    const {error} = validateCourse(req.body)
    if(error) 
    {
        debuglogger.error(`error.details[0].message`)
        return res.status(400).send(error.details[0].message)
    }
        let movie = new db_schema_class({                      //creating new object 
        // id:courses.length+1,
        name: req.body.name             //getting name from the body of req
    })
    movie = await movie.save()      //inserting in database
    // db_schema_class.push(movie);               //inserting in array
    debuglogger.info(`New Object Inserted Successfully`)
    res.send(movie)                    //returnig back newly created object to client
})

router.put('/:id',async (req,res)=>{

     //validate the movie parameters
     const {error} = validateCourse(req.body)
     if(error) 
     {
        return res.status(400).send(error.details[0].message)
     }
    const movie = await db_schema_class.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})
    // const course = courses.find(obj=> obj.id===parseInt(req.params.id));
    if(!movie) 
    {
        return res.status(404).send(`Result not found for given ID = ${req.params.id}`)
    }
    res.send(movie);        
})

//Delete the entry 

router.delete('/:id',async (req,res)=>{
//first check whether it exists or not
    const movie = await db_schema_class.findByIdAndDelete(req.params.id)
    // const course = courses.find(obj=>obj.id===parseInt(req.params.id));
    if(!movie) 
    {
        return res.status(404).send(`Result not found for given ID = ${req.params.id}`)
    }

    // const index = courses.indexOf(course);
    // console.log(index)
    // courses.splice(index,1)
    return res.send(movie);
    
})


function validateCourse(course) {

    const schema = Joi.object({
        name:Joi.string().min(3).max(10).required()
    })
    return schema.validate(course)
}


module.exports = router