const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

//routes modules
var vehicleRoutes = require('./routes/memeRoutes.js');

/*const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})*/

var app = express()

app
  .use(express.static(path.join(__dirname, 'public')))
  .use('/controllers', express.static(process.cwd() + '/controllers'))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

  //.get('/', (req, res) => res.render('pages/index'))

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

vehicleRoutes(app)
