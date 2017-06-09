(function(contractorsController){

    contractorsController.init= function(app){
         setupRoutes(app);    
    };
    

var setupRoutes=function(app){
    
       console.log("setting up contractors route");
       app.get("/api/getContractors/",function(req,res){
           
           console.log("getting contractors");
           const dal = require("../data");
           
           res.write(dal.getContractors());
           res.end();
        }); 
        
        app.get("/api/getContractor/:id",function(req,res){
           
           console.log("getting contractor");
           const dal = require("../data");
           
           res.write(dal.getContractor(req.params.id));
           res.end();
        });

    
}

})(module.exports);