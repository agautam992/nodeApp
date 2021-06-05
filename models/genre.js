const Joi = require('joi');
const mongoose = require('mongoose')

const genre_schema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:5,
        max:50
    }
})

const genre_schema_class = mongoose.model('genre_schema_coll',genre_schema)

function validateGenre(genre) {

    const schema = Joi.object({
        name:Joi.string().min(5).max(50).required()
    })
    return schema.validate(genre)
}

module.exports.validateGenre = validateGenre
module.exports.genre_schema_class = genre_schema_class
module.exports.genre_schema = genre_schema