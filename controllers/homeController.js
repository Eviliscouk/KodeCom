(function(homeController){

const passport = require('passport');
    homeController.init= function(app){
        
         setupRoutes(app);    
       
        
    };
    


var setupRoutes=function(app){
    
    //   app.get("/",function(req,res){
    //       res.render("home",{title:"home page"});
           
    //     });   
     
     app.get("/home/", passport.authenticationMiddleware(), function(req,res){
           var user = req.user;
           res.render("home",{title:"home page",user:user});
           
           
        });   
     app.get("/about/",passport.authenticationMiddleware(), function(req,res){
           
           res.render("about",{title:"about page"});
           
           
        });   
        
        app.get("/contact/", passport.authenticationMiddleware(), function(req,res){
           
           res.render("contact",{title:"contact page"});
           
           
        });   
        // api
        
       app.get("/api/getusers/", passport.authenticationMiddleware(),function(req,res){
           
           console.log("getting users");
           const dal = require("../data");
           
           res.write(dal.getUsers());
           res.end();
           
        });   

    
};

})(module.exports);