const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})
const DB = process.env.DATABASE.replace('<password>',process.env.PASSWORD)


mongoose.connect(DB).then(()=>{
    console.log('Connection with database successful');
})

app.listen(process.env.PORT,()=>{
    console.log('server running on port '+ process.env.PORT)
});



