var env = {};

//app.js
env.PUBLIC = '/../public';
env.SECRET = 'nekto-craft';

//db.js
env.DATABASE = 'mongodb://localhost/release';
env.ADMIN_COLLECTION = 'admins';
env.RELEASE_COLLECTION = 'releases';
env.BUGS_COLLECTION = 'bugs';
env.DOWNLOADS_COLLECTION = 'downloads';

module.exports = env;