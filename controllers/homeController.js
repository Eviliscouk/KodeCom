(function(homeController){

    homeController.init= function(app){
        console.log("in here");
         setupRoutes(app);    
       
        
    };
    

var setupRoutes=function(app){
    
      app.get("/",function(req,res){
           
           res.render("home",{title:"home page"});
           res.end();
           
        });   
     
     app.get("/about/",function(req,res){
           
           res.render("about",{title:"about page"});
           res.end();
           
        });   
        
        app.get("/contact/",function(req,res){
           
           res.render("contact",{title:"contact page"});
           res.end();
           
        });   
        // api
        
       app.get("/api/getusers/",function(req,res){
           
           console.log("getting users");
           const dal = require("../data");
           
           res.write(dal.getUsers());
           res.end();
           
        });   

    
};

})(module.exports);