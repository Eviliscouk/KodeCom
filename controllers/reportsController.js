(function(reportsController){

    var db = require('../data/reportsDal.js');
    var path = require('path');
    var fs = require('fs');
    var util = require('util');
    const passport = require('passport');
    const pdf = require("../helper/pdf.js");
    reportsController.init= function(app){
         setupRoutes(app);    
    };
    

var setupRoutes=function(app){
    
       console.log("setting up reports route");
        
       app.get("/api/reports/subContractorInvoice/:id/:mode?", passport.authenticationMiddleware(),function(req,res){
        
         var option ={};        
        option.mode = req.params.mode || 'html';
        
        db.getSubcontractorInvoiceData(req.params,function(err,data){
           data.url = req.url;
           if(err)
           {
               console.log(err);
               res.send(err);
           }
           else{
               data.renderOption= option;
              res.render('./reports/SubContractorInvoice',data);
          }
        });
        
        });
        
        app.get("/api/reports/contractorMonthlyReturn/:id/:monthEnd/:mode?", passport.authenticationMiddleware(),function(req,res){

        var option ={};        
        option.mode = req.params.mode || 'html';
        
        db.getContractorMonthlyReturnData(req.params,function(err,data){
           
           if(err)
           {
               console.log(err);
               res.send(err);
           }
           else{
                data[0][0].items = data[1];
                
                var finalObject = Object.assign({}, data[0][0], data[2][0])
                
                finalObject.renderOption= option;
                finalObject.url = req.url;
              res.render('./reports/ContractorMonthlyReturn',finalObject);
          }
        });
        
        });
        
         app.get("/api/reports/contractorWeeklyRemittance/:id/:paymentDate/:mode?", passport.authenticationMiddleware(),function(req,res){
             var option ={};        
        option.mode = req.params.mode || 'html';
        
        db.getContractorWeeklyRemittanceData(req.params,function(err,data){
           if(err)
           {
               console.log(err);
               res.send(err);
           }
           else{
                data[0][0].items = data[1];
                var finalObject = Object.assign({}, data[0][0], data[2][0])
                
                finalObject.url= req.url;
                finalObject.renderOption= option;
                
              res.render('./reports/ContractorWeeklyRemittance',finalObject);
          }
        });
        
        });
        
        app.get("/api/reports/subContractorMonthlyStatement/:id/:monthStart/:monthEnd/:mode?", passport.authenticationMiddleware(),function(req,res){
        
        var option ={};        
        option.mode = req.params.mode || 'html';
        
        db.subContractorMonthlyStatement(req.params,function(err,data){
           
           if(err)
           {
               console.log(err);
               res.send(err);
           }
           else{
               var finalObject = Object.assign({}, data[0][0], data[1][0])
            finalObject.renderOption= option;
            finalObject.url= req.url;
              res.render('./reports/SubContractorMonthlyStatement',finalObject);
          }
        });
        
        });
        
         app.get("/api/reports/KodeComAnnualInvoice/:id/:yearEnd/:mode?", passport.authenticationMiddleware(),function(req,res){
        
        var option ={};        
        option.mode = req.params.mode || 'html';
        
        db.getKodeComAnnualInvoiceData(req.params,function(err,data){
           
           if(err)
           {
               console.log(err);
               
               
               res.send(err);
           }
           else{
                var finalObject = Object.assign({}, data[0][0], data[1][0])
                finalObject.renderOption= option;
                finalObject.url = req.url;
              
              res.render('./reports/KodeComAnnualInvoice',finalObject);
          }
        });
        
        });
        
        app.get('report/pdf/',function(req,res){
         
           res.render('./reports/SubContractorMonthlyStatement',{});
         
        });
        
}


})(module.exports);
