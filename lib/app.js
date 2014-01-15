var express = require('express')
  , http = require('http')
  , path = require('path')
  , partials = require('express-partials')
  , env = require('./var')
  , db = require('./models/db')
  , pages = require('./routes/pages')
  , api = require('./routes/api');

var app = express();

exports.start = function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/../views');
    app.set('view engine', 'ejs');
    app.use(partials());
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(express.cookieParser(env.SECRET));
    app.use(express.cookieSession(env.SECRET));

    app.use(app.router);
    app.use(express.static(path.join(__dirname, env.PUBLIC)));

    //Pages
    app.get('/', pages.index);
    app.get('/about', pages.about);
    app.get('/metalmod', pages.metalmod);
    app.get('/odyssey', pages.odyssey);
    app.get('/controller', pages.controller);
    app.get('/download', pages.download);
    app.get('/guides', pages.guides);
    app.get('/contact', pages.contact);
    app.get('/6982', pages.admin);
    app.get('/logout', pages.logout);
    app.get('/043019982013', pages.create);
    app.get('/bug', pages.bug);

    //API
    app.post('/api/add_release', api.release);
    app.post('/api/delete_release', api.delete_release);
    app.post('/api/login', api.login);
    app.post('/api/download', api.download);
    app.post('/api/admin', api.create_admin);

    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
    });
}