var db = require('../models/db');

exports.index = function(req, res, next){
    var admin = {
        admin: (req.session.admin),
        name: (req.session.user),
        super: (req.session.super)
    }

    res.render('index', {admin: admin});
};

exports.about = function(req, res, next){
    var admin = {
        admin: (req.session.admin),
        name: (req.session.user),
        super: (req.session.super)
    }

    res.render('about', {admin: admin});
};

exports.metalmod = function(req, res, next){
    var admin = {
        admin: (req.session.admin),
        name: (req.session.user),
        super: (req.session.super)
    }

    res.render('metalmod', {admin: admin});
};

exports.odyssey = function(req, res, next){
    var admin = {
        admin: (req.session.admin),
        name: (req.session.user),
        super: (req.session.super)
    }

    res.render('odyssey', {admin: admin});
};

exports.controller = function(req, res, next){
    var admin = {
        admin: (req.session.admin),
        name: (req.session.user),
        super: (req.session.super)
    }

    res.render('controller', {admin: admin});
};

exports.download = function(req, res, next){
    var admin = {
        admin: (req.session.admin),
        name: (req.session.user),
        super: (req.session.super)
    }

    var releases = null;
    var download = 1;

    db.getDownloads(1, function(num) {
        download = (num || 1);
        db.getReleases(1, function(release) {
            releases = (release || null);
            res.render('download', {downloads: releases, admin: admin, numDownloads: download});
        });
    });
   
};

exports.guides = function(req, res, next){
    var admin = {
        admin: (req.session.admin),
        name: (req.session.user),
        super: (req.session.super)
    }

    res.render('guides', {admin: admin});
};

exports.contact = function(req, res, next){
    var admin = {
        admin: (req.session.admin),
        name: (req.session.user),
        super: (req.session.super)
    }

    res.render('contact', {admin: admin});
};

exports.admin = function(req, res, next){
    var releases = null;

    var admin = {
        admin: (req.session.admin),
        name: (req.session.user),
        super: (req.session.super)
    }

    db.getReleases(1, function(release) {
        releases = (release || null);
        db.Admin.find(function(err, accounts) {
            res.render('admin', {admin: admin, downloads: releases, accounts: accounts});
        });
    });
};

exports.logout = function(req, res, next) {
    if (req.session) {
        if (req.session.user) {
            console.log('Admin ' + req.session.user + ' is logging out');
            delete req.session.user;
            req.session.admin = false;
        }
    }

    res.redirect('/');
};

exports.create = function(req, res, next) {
    res.render('create');
};

exports.bug = function(req, res, next) {
    var admin = {
        admin: (req.session.admin),
        name: (req.session.user),
        super: (req.session.super)
    }

    res.render('bug', {admin: admin});
}