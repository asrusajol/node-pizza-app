const express = require("express")
const { dirname } = require("path")
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')

//Asseet
app.use(express.static('public'))


//Routes
app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/cart',(req,res)=>{
    res.render('customers/cart')
})

//set Template Engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine', 'ejs')


const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> {
    console.log(`Listen on port ${PORT}`)
    console.log('Server run Success !!!')
})

