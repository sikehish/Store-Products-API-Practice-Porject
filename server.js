const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'./.env'})
const app=require('./app')
 
const DB = process.env.DB_CONNECTION.replace('<PASSWORD>', process.env.PASSWORD)

mongoose.connect(DB, {
   useUnifiedTopology: true,
  useNewUrlParser: true 
}).then(()=> console.log('Connection Successful!'));

const PORT = process.env.PORT;
app.listen(PORT, ()=> console.log(`APP RUNNING ON PORT ${PORT}`))
