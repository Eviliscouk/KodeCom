function authenticationMiddleware () {
  
  
  return function (req, res, next) {
    return next();
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  }
}

module.exports = authenticationMiddleware