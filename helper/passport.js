(function(passport){

var login = require('../data/loginDal.js');

passport.init = function(app)
{
    // Configuring Passport
    var passport = require('passport');
    var expressSession = require('express-session');
    //var MySQLStore = require('express-mysql-session')(expressSession);
    
    // var options = {
    // 	host: 'localhost',
    // 	user: 'kerrjp',
    // 	password: "",
    // 	database: 'KodeCom'
    // };
    //var sessionStore = new MySQLStore(options);
    
    require('../authentication').init(app)
    //app.use(expressSession({secret: 'mySecretKey', store: sessionStore, resave: false, saveUninitialized: false}));
    app.use(expressSession({secret: 'kodecom', cookie:{_expires : 30000000},}));
    app.use(passport.initialize());
    app.use(passport.session());
    
    require('../user').init(app)


    
}

}

(module.exports));