require("dotenv").config()
const express = require('express')
const app = express()
const router = require('./app/router')
const cors = require('cors')
const GlobalErrorHandler = require('./app/middlewares/GlobalErrorHandler')
app.use(cors())
app.use(express.json())
app.use("/api",router)
app.get('/',(req,res,next) => {
    try {
        return res.status(200).json({status:true,Response:"Welcome vehicle management"})
    }
    catch(err) {
        next(err)
    }
})

app.use(GlobalErrorHandler)
app.listen(5000,()=> {
    console.log('Server is listening on 5000')
})

module.exports = app