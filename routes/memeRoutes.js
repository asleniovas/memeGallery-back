var MemeHandler = require(process.cwd() + '/controllers/memeHandler.js');

module.exports = function (app) {
   
    var memeHandler = new MemeHandler();
    
    //GET all memes
    app.route('/api/memes')
        .get(memeHandler.getAllMemes)
        .post(memeHandler.insertMeme)

    app.route('/')
        .get(memeHandler.getIndexView)
 
};