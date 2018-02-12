const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

var db = require('../data/loginDal.js');

var util = require('../helper/util.js');

const authenticationMiddleware = require('./middleware')

function findUser (username, callback) {
 db.getUserFromDb(username, function(err, user){
   
  if (user) {
    return callback(null, user)
  }
  else if (err)
    return callback(null)
 });
  
  
}

passport.serializeUser(function (user, cb) {
  console.log('seriallising..%s',JSON.stringify(user));
  
  cb(null, user);
  
})

passport.deserializeUser(function (username, cb) {
  console.log('deseriallising..')
  console.log('deseriallising..%s',JSON.stringify(username));
  
  findUser(username, cb);
})

function initPassport () {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      
      findUser(username, function (err, user) {
        
      
        
        
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false)
        }
        
        var base64 = util.encrypt(password);
        
        if (user.password != base64){
          return done(null, false)
        }
        
        console.log("found user %s", user.username);
        return done(null, username)
      })
    }
  ))

  passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport