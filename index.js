const express = require('express');
const app = express();
const debuglogger = require('./debugLogs/debugLog')

require('./startup/loggingException')(debuglogger)
require('./startup/routes')(app)
require('./startup/db')(debuglogger)
require('./startup/config')()
require('./startup/validation')()

const port = process.env.PORT||3000;
app.listen(port,()=>{
    debuglogger.info(`******NEWSESSION******\n_________________________________`)
    debuglogger.info(`App is Listening at Port ${port}`)
})

