var MemeHandler = require(process.cwd() + '/controllers/memeHandler.js');

module.exports = function (app) {
   
    var memeHandler = new MemeHandler();
    
    //GET all memes and POST a new meme
    app.route('/api/memes')
        .get(memeHandler.getAllMemes)
        .post(memeHandler.insertMeme)

    //DELETE a meme
    app.route('/api/memes/:memeId')
        .delete(memeHandler.deleteMeme)

    //GET index page
    app.route('/')
        .get(memeHandler.getIndexView)

 
};