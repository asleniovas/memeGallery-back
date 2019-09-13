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

  .get('/', (req, res) => res.render('pages/index'))

  /*.get('/api/memes', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM meme_URLs');
      const results = { 'results': (result) ? result.rows : null};
      res.status(200).json(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })*/

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

vehicleRoutes(app)
