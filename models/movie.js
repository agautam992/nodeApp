const Joi = require('joi');
const mongoose = require('mongoose')
const {genre_schema}=require('./genre')

const Movie_schema = mongoose.Schema({
    title:{
    type:String,
    required:true,
    trim:true,
    min:5,
    max:255
    },
    genre :{
        type:genre_schema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    dailyRental:{
        type:Number,
        required:true,
        min:0,
        max:255
    }
})

const Movie_schema_class = mongoose.model('movie_coll',Movie_schema)

function validateMovie(movie) {

    const schema = Joi.object({
        title:Joi.string().min(5).max(50).required(),
        numberInStock:Joi.number().min(0).max(255).required(),
        dailyRental:Joi.number().min(0).max(255).required(),
        genreID:Joi.string().required()             //important!
    })
    return schema.validate(movie)
}

module.exports.validateMovie = validateMovie
module.exports.Movie_schema_class = Movie_schema_class