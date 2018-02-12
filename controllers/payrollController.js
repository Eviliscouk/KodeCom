(function(payrollController){

    var db = require('../data/payrollDal.js')
    const passport = require('passport');
 
    payrollController.init= function(app){
         setupRoutes(app);    
    };
    

var setupRoutes=function(app){
    
    console.log("setting up payroll routes");
    
    app.get("/api/getPayrolls/:id",passport.authenticationMiddleware(),function(req,res){
         var params=req.params;
            params.username = req.user.username;
           db.getPayrollForSubContractor(params, function(err,data){
           
           if(err)
           res.send(err)
           else
    
            res.send(data);
    
    });
    });
    
    app.get("/api/payroll/get/:id",passport.authenticationMiddleware(),function(req,res){
       
       console.log("getting payroll");
         var params=req.params;
            params.username = req.user.username;
      db.getPayroll(params, function(err,data){
           
           if(err)
           res.send(err)
           else
    
            res.send(data);
    
    });
    });
    
    app.get("/api/payrollDeduction/get/:id",passport.authenticationMiddleware(),function(req,res){
       var params=req.params;
       params.username = req.user.username;
       db.getPayrollDeductions(params,function(err,data){
           
           if(err)
           res.send(err)
           else
    
            res.send(data);
    
    });
       
    });
    
    app.post("/api/payroll/save/",passport.authenticationMiddleware(),function(req,res){
       console.log('saving..');
         var params=req.body;
            params.username = req.user.username;
        db.savePayroll(params,function(err,data){
           
           if(err)
           res.send(err)
           else
    
            res.send(data);
    
    });
    });
    
     app.post("/api/payroll/saveBatch/",passport.authenticationMiddleware(),function(req,res){
       console.log('saving..');
         var params=req.body;
            params.username = req.user.username;
        db.savePayrollGetId(params,function(err,data){
           
           if(err)
           res.send('0')
           else
    
            res.send(data);
    
    });
    });
    
    app.post("/api/payrollDeduction/save/",passport.authenticationMiddleware(),function(req,res){
       console.log('saving..');
       
        var params=req.body;
            params.username = req.user.username;
        db.savePayrollDeduction(params,function(err,data){
           
           if(err)
           res.send(err)
           else
    
            res.send(data);
    
    });
    });
    
    app.post("/api/payrollDeduction/delete/", passport.authenticationMiddleware(), function(req,res){
    console.log('deleting..');
    
    console.log(req.body);
      var params=req.body;
            params.username = req.user.username;
    db.deletePayrollDeduction(params,function(err,data){
       
       if(err)
       res.send(err);
       else
    
        res.send(data);
    
    });
    
    });
    
    app.post("/api/payroll/delete/", passport.authenticationMiddleware(), function(req,res){
    console.log('deleting payroll..');
    
    console.log(req.body);
      var params=req.body;
            params.username = req.user.username;
    db.deletePayroll(params,function(err,data){
       
       if(err)
       res.send(err);
       else
    
        res.send(data);
    
    });
    
    });

    
}

})(module.exports);