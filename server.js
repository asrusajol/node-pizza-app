require('dotenv').config();
const express = require("express");
const { dirname } = require("path");
const app = express();
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const session=require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');
const { json } = require('express');

//Database Connection
const url='mongodb://localhost/pizza';
mongoose.connect(url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:true
});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('Database Connected....')
}).catch(err =>{
    console.log('Connection Failed')
})

//session configuration  & Session Store
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store:MongoDbStore.create(connection), //here "connections" from DB 
    saveUninitialized: false,
    cookie: {maxAge:1000*60*60*24} //25 min

}))

app.use(flash())
app.use(express.urlencoded({extended : false}))
app.use(json())
//global middleware
app.use((req,res,next)=>{
    res.locals.session = req.session
    next()
});

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

