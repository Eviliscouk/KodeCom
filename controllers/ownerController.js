(function(ownerController){

    var db = require('../data/ownerDal.js')
    const passport = require('passport');

    ownerController.init= function(app){
         setupRoutes(app);    
    };
    

var setupRoutes=function(app){
    
       console.log("setting up contractors route");
   
        
        app.get("/api/getOwner/",passport.authenticationMiddleware(),function(req,res){
           
           db.getOwner({},function(err,data){
               
               if(err)
               res.send(err)
               else

                res.send(data);
    
        });
           
        });
        
       app.post("/api/owner/save/",passport.authenticationMiddleware(),function(req,res){
           console.log('saving..');
            db.saveOwner(req.body,function(err,data){
               
               if(err)
               res.send(err)
               else

                res.send(data);
    
        });
    });
    
}

})(module.exports);