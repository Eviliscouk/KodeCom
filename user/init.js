const passport = require('passport')

function initUser (app) {
  
  
  app.get('/logout', function(req, res) 
  {
      console.log("logging out ......");
      req.session.destroy();
      req.logout();
      res.redirect('/');
      
  });
  
  app.get('/', renderWelcome)
  
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/home/',
    failureRedirect: '/'
    
  }));
  
    
}

function renderWelcome (req, res) {
  if (req.isAuthenticated())
    res.redirect('/home/');
  else
    res.render("login",{title:"Login"});
}

function renderProfile (req, res) {
  res.render('user/profile', {
    username: req.user.username
  })
}

module.exports = initUser