(function(subcontractorsController){

    subcontractorsController.init= function(app){
         setupRoutes(app);    
    };
    

var setupRoutes=function(app){
    
    console.log("setting up subcontractors routes");
    
       app.get("/api/getSubContractors/",function(req,res){
           
           console.log("getting subcontractors");
           const dal = require("../data");
           
           res.write(dal.getSubContractors());
           res.end();
        }); 
        
        app.get("/api/getSubContractor/:id",function(req,res){
           
           console.log("getting subcontractor");
           const dal = require("../data");
           
           res.write(dal.getSubContractor(req.params.id));
           res.end();
        });

    
}

})(module.exports);