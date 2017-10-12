(function(payrollController){

    var db = require('../data/payrollDal.js')
    const passport = require('passport');
 
    payrollController.init= function(app){
         setupRoutes(app);    
    };
    

var setupRoutes=function(app){
    
    console.log("setting up payroll routes");
    
    app.get("/api/getPayrolls/:id",passport.authenticationMiddleware(),function(req,res){
       
           db.getPayrollForSubContractor(req.params, function(err,data){
           
           if(err)
           res.send(err)
           else
    
            res.send(data);
    
    });
    });
    
    app.get("/api/payroll/get/:id",passport.authenticationMiddleware(),function(req,res){
       
       console.log("getting payroll");
       
      db.getPayroll(req.params, function(err,data){
           
           if(err)
           res.send(err)
           else
    
            res.send(data);
    
    });
    });
    
    app.get("/api/payrollDeduction/get/:id",passport.authenticationMiddleware(),function(req,res){
       
       db.getPayrollDeductions(req.params,function(err,data){
           
           if(err)
           res.send(err)
           else
    
            res.send(data);
    
    });
       
    });
    
    app.post("/api/payroll/save/",passport.authenticationMiddleware(),function(req,res){
       console.log('saving..');
        db.savePayroll(req.body,function(err,data){
           
           if(err)
           res.send(err)
           else
    
            res.send(data);
    
    });
    });
    
    app.post("/api/payrollDeduction/save/",passport.authenticationMiddleware(),function(req,res){
       console.log('saving..');
       
        db.savePayrollDeduction(req.body,function(err,data){
           
           if(err)
           res.send(err)
           else
    
            res.send(data);
    
    });
    });
    
    app.post("/api/payrollDeduction/delete/", passport.authenticationMiddleware(), function(req,res){
    console.log('deleting..');
    
    console.log(req.body);
    
    db.deletePayrollDeduction(req.body,function(err,data){
       
       if(err)
       res.send(err);
       else
    
        res.send(data);
    
    });
    
    });

    
}

})(module.exports);