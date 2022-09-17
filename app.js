const express = require('express');
const storeRouter = require('./routes/storeRoutes')


const app= express();
app.use(express.json());
require('express-async-errors') 

const notFound= require('./errorHandlers/not-found')
const errorHandler= require('./errorHandlers/error-handler')


app.use('/api/v1/store',storeRouter)

// app.use(notFound)
// app.use(errorHandler)

module.exports=app;