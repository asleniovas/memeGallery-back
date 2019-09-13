function memeHandler() {

    //Heroku PG DB connection variables
    const {Pool} = require('pg');

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true
    })

    //GET all memes
    this.getAll = function (req, res) {

        try {

            //connect to db and execute query
            const client = await pool.connect()
            const queryResult = await client.query('SELECT * FROM meme_URLs');
            const results = { 'results': (queryResult) ? queryResult.rows : null};

            //return a results array with JSON objects
            res.status(200).json(results);

            //end connection
            client.release();
          
        } 
        catch (err) {

            console.error(err);
            res.status(500).send("Error " + err);
        }
    }

}

module.exports = memeHandler;