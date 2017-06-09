(function(payrollController){

    payrollController.init= function(app){
         setupRoutes(app);    
    };
    

var setupRoutes=function(app){
    
    console.log("setting up payroll routes");
    
       app.get("/api/getPayrollItems/:subId",function(req,res){
           
           console.log("getting payroll items");
           const dal = require("../data");
           
           res.write(dal.getPayrollForSubContractor(req.params.subId));
           res.end();
        }); 
        
        app.get("/api/getPayrollItem/:id",function(req,res){
           
           console.log("getting subcontractor");
           const dal = require("../data");
           
           res.write(dal.getPayroll(req.params.id));
           res.end();
        });

    
}

})(module.exports);