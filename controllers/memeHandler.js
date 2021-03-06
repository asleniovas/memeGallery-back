function memeHandler() {

    //Heroku PG DB connection variables
    const {Pool} = require('pg');

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true
    })

    //GET all memes
    this.getAllMemes = async (req, res) => {

        try {

            //open connection and execute SQL query
            const client = await pool.connect()
            const queryResult = await client.query('SELECT * FROM meme_URLs');
            const results = queryResult ? queryResult.rows : null;

            //return an array of JSON objects
            res.status(200).json(results);

            //end connection
            client.release();
          
        } 
        catch (err) {

            console.error(err);
            res.status(500).send("Error " + err);
        }
    }

    //POST new meme
    this.insertMeme = async (req, res) => {

        try {

            //fetch memeURL from request body
            var memeURL = req.body.memeURL

            //open connection and execute SQL query
            const client = await pool.connect()
            const queryResult = await client.query('INSERT INTO meme_URLs (url) VALUES ($1)', [memeURL]);

            //second query to fetch created meme for reactive UI updates
            const queryResult2 = await client.query('SELECT * FROM meme_URLs WHERE url = $1 ORDER BY id DESC LIMIT 1', [memeURL]);
            
            //return query response
            res.status(201).json(queryResult2.rows);

            //end connection
            client.release();
          
        } 
        catch (err) {

            console.error(err);
            res.status(500).send("Error " + err);
        }

    }

    //DELETE meme by id
    this.deleteMeme = async (req, res) => {

        try {

            //fetch meme id
            var memeId = req.params.memeId;

            //open connection and execute SQL query
            const client = await pool.connect();
            const queryResult = await client.query('DELETE FROM meme_URLs WHERE id = $1', [memeId]);
            const results = queryResult;

            //return query response
            res.status(200).json(results);

            //end connection
            client.release();
        }
        catch (err) {

            console.error(err);
            res.status(500).send("Error " + err);
        }

    }

    //GET index View
    this.getIndexView = async (req, res) => {

        try {

            res.render('index.html')

        }
        catch (err) {

            console.error(err);
            res.status(500).send("Error " + err);
        }
    }


}

module.exports = memeHandler;