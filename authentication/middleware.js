function authenticationMiddleware () {
  
  
  return function (req, res, next) {
    console.log("env:%s",process.params.env);
    if (process.params.env =="dev1"){
      console.log('no user - running as debug with process param as - ' + process.params.env );
        req.user = req.user||{id:1, username:"jkerr", password:"",databaseId:1,isAdmin:1}
        return next();
    }
    
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  }
}

module.exports = authenticationMiddleware