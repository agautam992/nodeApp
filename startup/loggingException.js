require('express-async-errors')
module.exports = function(debuglogger){
    process.on('uncaughtException',(ex)=>{
        debuglogger.error(`Uncaught Exception: ${ex.stack}\n Exiting Now....`)
        setTimeout(()=>{
                process.exit(1)
            },100)
    })
    process.on('unhandledRejection', (reason, promise,ex) => {
        throw new Error(`Uncaught Rejection....Redirecting into Uncaught Exception`)
      })
    
}