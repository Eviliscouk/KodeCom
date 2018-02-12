(function(homeController){

const passport = require('passport');
    homeController.init= function(app){
        
         setupRoutes(app);    
       
        
    };
    


var setupRoutes=function(app){
    
   const dal = require("../data/loginDal.js");
   var db = require('../data/mysqlDb.js');
           
  
            
  
     
     app.get("/home/", passport.authenticationMiddleware(), function(req,res){
         
           var user = req.user;
           console.log(JSON.stringify(user));
           
           res.render("home",{title:"home page",user:user, dblist:app.get('dblist'), env:process.params.env});
           
           
        });   
     app.get("/about/",passport.authenticationMiddleware(), function(req,res){
           
           res.render("about",[{sale:200,vat:20},{sale:200,vat:20}]);
           
           
        });   
        
     app.get("/contact/", passport.authenticationMiddleware(), function(req,res){
           
           res.render("contact",{title:"contact page"});
           
           
        });   
     
     app.get("/test/",  function(req,res){
           
           //console.log(app.get('dblist'));
           
           res.render("contact",{title:"contact page1",dblist:app.get('dblist'),user:{databaseId:2}});
           
           
        });   
         app.get("/test2/",  function(req,res){
           
           //console.log(app.get('dblist'));
           
          http.get("test2/",function(req,res){
              res.write("hi");
              
          });
           
           
        }); 
        // api
        
     app.get("/api/getusers/", passport.authenticationMiddleware(),function(req,res){
           
           console.log("getting users");
           const dal = require("../data");
           
           res.write(dal.getUsers());
           res.end();
           
        });   
    
    app.get("/api/databaselist/", function(req,res){
         
           const dal = require("../data/loginDal.js");
           
           dal.listDatabases()
           .then(function(dblist){
             res.write(JSON.stringify(dblist));
                res.end();    
           })
           .catch(function(err){
               res.write(JSON.stringify(err));
                res.end();    
           });
           
           
        });       

   app.post("/api/database/save/", function(req,res){
            var body='';
            
             const dal = require("../data/loginDal.js");
           
           dal.updateUserDb({data:req.body,user:req.user})
           .then(function(result){
             
             db.listUserDatabases().then(function(urls){
              
              app.set("logoUrls",urls);
              
             });
             
              res.end();    
           })
           .catch(function(err){
             console.log("error updating user database cache - " + err);
                res.end();    
           });
            
            
        });
        
  app.get("/admin/",passport.authenticationMiddleware(), function(req,res){
           
           console.log('admin %s',JSON.stringify(req.user));
           
           if(req.user.isAdmin==0){
            return res.render("admin",{error:"not authorised",users:null});
            
           }
           db.listUsers().then(function(users){
           
           res.render("admin",{error:null,users:users,user:req.user,dblist:app.get('dblist')});
           
            
           }).catch(function(err){
            
            res.render("admin",{error:err,users:null});
            
            
           })
           
           
           
        });        
        
app.post("/api/user/save/", function(req,res){
            var body='';
            
           const dal = require("../data/mysqlDb.js");
           
           console.log('save user called with - ' + JSON.stringify(req.body));
         
           dal.updateUser({data:req.body,user:req.user})
           .then(function(result){
             res.write('ok');
              res.end();    
           })
           .catch(function(err){
             console.log("error updating user database cache - " + err);
                res.end();    
           });
            
            
        });        
    
};

})(module.exports);