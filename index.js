//routes modules
var vehicleRoutes = require('./routes/memeRoutes.js');

//key modules
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser');

var app = express()

//express initialisation
app

  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(path.join(__dirname, 'views/pages')))
  .use('/controllers', express.static(process.cwd() + '/controllers'))
  .use(bodyParser.urlencoded({extended: false}))
  .use(bodyParser.json())

  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


//route initialisation
vehicleRoutes(app)
