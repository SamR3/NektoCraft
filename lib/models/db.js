var db = {};

var mongoose = require('mongoose');
var env = require('../var');

mongoose.connect(env.DATABASE);

var db_connection = mongoose.connection;
db_connection.on('error', console.error.bind(console, 'connection error:'));
db_connection.once('open', function callback () {});

var adminSchema = mongoose.Schema({
  name: String,
  user: String,
  pass: String,
  super: Boolean
});

var releaseSchema = mongoose.Schema({
  mod: Number,
  version: String,
  link: String,
  info: String,
  minecraftVersion: String,
  release: String
});

var bugSchema = mongoose.Schema({
  name: String,
  email: String,
  date: Date,
  bug: String,
  version: Number
});

var downloadSchema = mongoose.Schema({
  mod: Number,
  downloads: Number
});

exports.Admin = mongoose.model(env.ADMIN_COLLECTION, adminSchema);
exports.Releases = mongoose.model(env.RELEASE_COLLECTION, releaseSchema);
exports.Bug = mongoose.model(env.BUGS_COLLECTION, bugSchema);
exports.Downloads = mongoose.model(env.DOWNLOADS_COLLECTION, downloadSchema);

exports.createBug = function(name, email, date, bug, version, mod) {
  console.log('Logging new bug.');

  var tempBug = new Bug({name: name, email: email, date: date, bug: bug, version: version, mod: mod})

  exports.Bug.findOne({ bug: tempBug.bug }, function(err, exists) { 
    if (exists == null) { 
        tempBug.save(function(err) {
          if (err) throw err;
        }); 
    } else { 
        console.log('Bug by ' + tempBug.name + ' already exists.');
    }
  });
};

exports.getBugs = function(callback) {
  exports.Bug.find(function(err, bugs) {
    if (err) return handleError(err);

    callback(bugs);
  });
}

exports.createAdmin = function(name, user, pass) {

  console.log('Creating new Admin!');

  var tempAdmin = new exports.Admin({name: name, user: user, pass: pass, super: false});

  exports.Admin.findOne({ name: tempAdmin.name }, function(err, exists) { 
    if (exists == null) { 
        tempAdmin.save(function(err) {
          if (err) throw err;
        }); 
    } else { 
        console.log('Admin ' + tempAdmin.name + ' already exists.');
    }
  });
};

exports.checkForAdmin = function() {
  exports.Admin.findOne(function(err, exists) { 
    if (exists == null) { 
      var tempAdmin = new exports.Admin({ name: 'Sam', user: 'Sam6982', pass: 'samrules3', super: true});

      tempAdmin.save(function(err) {
        if (err) throw err;
      }); 
    }
  });
};

exports.createRelease = function(mod, version, minecraftVersion, info, link, release) {

  console.log('Creating Release!');

  var tempRelease = new exports.Releases({mod: mod, version: version, link: link, info: info, minecraftVersion: minecraftVersion, release: release});

  exports.Releases.findOne({ version: tempRelease.version }, function(err, exists) { 
    if (exists == null) { 
        tempRelease.save(function(err) {
          if (err) throw err;
        }); 
    } else { 
        console.log('Release version ' + tempRelease.version + ' already exists.');
    }
  });
};

exports.getReleases = function(modID, callback) {
  exports.Releases.find({ 'mod': modID }, function(err, release) {
    if (err) return handleError(err);

    callback(release);
  });
}

exports.onDownload = function(modID) {
  checkForDownload(modID);

  var mod;

  switch(modID){
    case -1:
      mod = 'Metal Mod';
      break;

    case 0:
      mod = 'Odyssey Mod';
      break;

    case 1:
      mod = 'Controller Block Mod';
      break;
  }

  console.log(mod + ' downloaded.');

  exports.Downloads.update({ 'mod': modID }, { $inc: {'downloads': 1}}, function(err) {
    if(err) throw err;
  });
}

exports.getDownloads = function(modID, callback) {
  checkForDownload(modID);

  exports.Downloads.findOne({ 'mod': modID }, function(err, mod) {
    callback((mod.downloads || 1));
  });
}

function checkForDownload(modID) {
  exports.Downloads.findOne({ 'mod': modID }, function(err, exists) { 
    if (exists == null) { 
      var tempDL = new exports.Downloads({ mod: modID, downloads: 1 });

      tempDL.save(function(err) {
        if (err) throw err;
      }); 
    }
  });
}