var db = require('../models/db');

exports.release = function(req, res, next) 
{
    var mod = req.param('mod');
    var version = req.param('version');
    var minecraftVersion = req.param('minecraftVersion');
    var info = req.param('info');
    var link = req.param('link');
    var release = req.param('release');

    db.createRelease(mod, version, minecraftVersion, info, link, release);
    res.json(200, null);
}

exports.delete_release = function(req, res) {
    var id = req.param('_id');

    db.Releases.findById(id).remove();
    res.json(200, null);
}

exports.login = function(req, res, next)
{
    var user = unescape(req.param('user'));
    var pass = unescape(req.param('pass'));

    db.checkForAdmin();

    db.Admin.findOne({ user: user, pass: pass}, function(err, admin) {
        if(admin) {
            console.log('Admin ' + admin.name + ' logged in.');

            if (!req.session) {
                req.session = {};
            }

            req.session['user'] =  admin.name;
            req.session['admin'] =  true;
            req.session['super'] =  admin.super;

            var admin = {
                admin: (req.session.admin),
                name: (req.session.user),
                super: (req.session.super)
            }

            res.contentType('json');
            res.json({user: admin});

        } else {
            console.log('User tried to log in: ' + user);
            res.json(401, {user: null});
        }
    });
}

exports.download = function(req, res) {
    var modID = req.param('mod');

    db.onDownload(modID);

    var downloads;
    db.getDownloads(1, function(num){
        downloads = num;
        
        var data = {
            numDownloads: downloads
        };

        res.contentType('json');
        res.json(data);
    });
}

exports.create_admin = function(req, res) {
    var name = req.param('name');
    var user = req.param('user');
    var pass = req.param('pass');

    db.createAdmin(name, user, pass);

    res.json(200, null);
}