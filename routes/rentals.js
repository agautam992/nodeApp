const {rental_class,validateRental} = require('../models/rental') 
const {Movie_schema_class} = require('../models/movie')
const {customer_schema_class} = require('../models/customer') 
const mongoose = require('mongoose')
const express = require('express')
const debuglogger = require('../debugLogs/debugLog')
const router = express.Router()

const Fawn = require('fawn')      //for adding 2 instances in DB collectively
Fawn.init(mongoose)

router.get('/', async (req, res) => {
  const result = await rental_class.find().sort('-dateOut')
  debuglogger.info(`Get Route of Rentals Loaded Successfully! `)
  res.send(result);
})

router.post('/', async (req, res) => {
  const { error } = validateRental(req.body)
  if (error) {
        debuglogger.error(`Error in Validation:- ${error.details[0].message}`)
        return res.status(400).send(`Error in Validation:- ${error.details[0].message}`)
  }
  const customer = await customer_schema_class.findById(req.body.customerId)
  if (!customer) {
        debuglogger.error(`Invalid Customer`)
        return res.status(400).send('Invalid customer.')
  }
  const movie = await Movie_schema_class.findById(req.body.movieId)
  if (!movie) {
        debuglogger.error(`Invalid Movie`)
        return res.status(400).send('Invalid movie.')
  }
  if (movie.numberInStock === 0){

        debuglogger.info(`Movie not in Stock`)
        return res.status(400).send('Movie not in stock.')
  } 

  let rental = new rental_class({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  try{
    new Fawn.Task()
        .save('rental_colls',rental)
        .update('movie_colls',{_id:movie._id},{
            $inc:{
                numberInStock:-1
            }
        })
        .run()
        debuglogger.info(`Rental Saved successfully! (FAWN Worked)`)
    res.send(rental)
  }
  catch(ex){
        debuglogger.error(`Fawn Failed on saving rental and movie together!!`)
        res.status(500).send('Fawn Failed on saving rental and movie together!!')
  }
});

router.get('/:id', async (req, res) => {
  const rental = await rental_class.findById(req.params.id);

  if (!rental) {
      debuglogger.error(`Fawn Failed on saving rental and movie together!!`)
      return res.status(404).send('The rental with the given ID was not found.');
  }
  res.send(rental);
});

module.exports = router; 