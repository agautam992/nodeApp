const genres = require('../routes/genres')
const customers = require('../routes/customers')
const movies = require('../routes/movies')
const rentals = require('../routes/rentals')
const users = require('../routes/users')
const auths = require('../routes/auth')
const express= require('express')

module.exports = function(app){
    app.use(express.json())
    app.use('/api/genre',genres)        //genre routes
    app.use('/api/customer',customers)  // customers routes
    app.use('/api/movie',movies)        //movies router
    app.use('/api/rental',rentals)      //rental routes
    app.use('/api/user',users)          //users routes
    app.use('/api/auth',auths)          //authentication
}