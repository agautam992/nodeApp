const Joi = require('joi')
const mongoose = require('mongoose')

const rental_schema = new mongoose.Schema({
    customer: { 
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50
        },
        isGold: {
          type: Boolean,
          default: false
        },
        phone: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50
        }      
      }),  
      required: true
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true, 
          minlength: 5,
          maxlength: 255
        },
        dailyRentalRate: { 
          type: Number, 
          required: true,
          min: 0,
          max: 255
        }   
      }),
      required: true
    },
    dateOut: { 
      type: Date, 
      required: true,
      default: Date.now
    },
    dateReturned: { 
      type: Date
    },
    rentalFee: { 
      type: Number, 
      min: 0
    }
  })
const rental_class = mongoose.model('rental_coll',rental_schema);

function validateRental(rental) {

    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    })
    return schema.validate(rental)
}
module.exports.rental_class = rental_class
module.exports.validateRental = validateRental