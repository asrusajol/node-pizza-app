const mysql = require('mysql');
const express = require("express")
const { dirname } = require("path")
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')


//Database Connection


//Asseet
app.use(express.static('public'))

//set Template Engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine', 'ejs')

//Routes call
require('./routes/web.js')(app)

//server run
const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> {
    console.log(`Listen on port ${PORT}`)
    console.log('Server run Success !!!')
})

