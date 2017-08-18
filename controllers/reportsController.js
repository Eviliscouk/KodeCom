(function(reportsController){

    var db = require('../data/reportsDal.js');
    var http = require('http');
    var path = require('path');
    var fs = require('fs');
    var util = require('util');
    const passport = require('passport');
    const pdf = require("../helper/pdf.js");
    const mailer = require("../helper/mail.js");
    const dalHelper = require('../data/helperFunction.js');
    
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
               data.logoUrl = process.params.logoUrl;
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
                finalObject.logoUrl = process.params.logoUrl;
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
                finalObject.logoUrl = process.params.logoUrl;
                
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
            finalObject.logoUrl = process.params.logoUrl;
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
                finalObject.logoUrl = process.params.logoUrl;
              
              res.render('./reports/KodeComAnnualInvoice',finalObject);
          }
        });
        
        });
        
        app.post("/api/reports/email/contractorWeeklyRemittance/",passport.authenticationMiddleware(),function(req,res){
            var params = req.body;
            dalHelper.getContractorEmailAddressById(params.id).then(function(result){params.email = result.email; });
            
            if (!params.email)
                res.send('No email found!');
            
            //Create url 
            var reportUrl = '/api/reports/contractorWeeklyRemittance/'+params.id+'/'+params.paymentDate+'/pdf';
            reportUrl = util.format('%s%s',process.params.baseUrl,reportUrl);
            console.log(reportUrl);
            
            http.get(reportUrl,function(response){
                var str = "";
                var completeHtml ="";
                
                response.on('data', function (chunk) { str += chunk; });
                response.on('end', function () {
                    var completeHtml = str;
                    pdf.render({html:completeHtml},function(err,output){
                    
                         output.toBuffer(function(returnedBuffer) {
                            
                            var dir = path.resolve('temp_documents');
                            var dateTimeStr = new Date().getTime().toString();
                            var fileName ='WeeklyRemittance.pdf';
                            var filePath =path.join(dir, dateTimeStr + '_' + fileName);
                             
                            fs.writeFile(filePath, returnedBuffer, (err) => {
                                if (err) throw err;
                                
                                var  attachments= [{
                                filename: 'WeeklyRemittance.pdf',
                                path: filePath,
                                contentType: 'application/pdf'
                                }]  ;  
                                
                                // call mail helper to send 
                                mailer.send({from:'notify@paygenieonline.co.uk',to: params.email,subject:'Weekly Remittance from PayGenie',message:'Please find Weekly Remittance attached.',attachments:attachments},function(err,info){
                                        
                                    fs.unlink(filePath);
                                    
                                    if (err){
                                        console.log(err);
                                        res.send(err);
                                    }
                                    else
                                        res.send('ok');
                                    });
                                });
                        });                
                    });
            
                });
            });
        });
        
        app.post("/api/reports/email/contractorMonthlyReturn/",passport.authenticationMiddleware(),function(req,res){
            //Body will have {id:id, monthEnd:monthEnd}
            var params = req.body;
            dalHelper.getContractorEmailAddressById(params.id).then(function(result){params.email = result.email; });
            
            if (!params.email)
                res.send('No email found!');
                
            //Create url 
            var reportUrl = '/api/reports/contractorMonthlyReturn/'+params.id+'/'+params.monthEnd+'/pdf';
            reportUrl = util.format('%s%s',process.params.baseUrl,reportUrl);
            console.log(reportUrl);
            
            http.get(reportUrl,function(response){
                var str = "";
                var completeHtml ="";
                
                response.on('data', function (chunk) { str += chunk; });
                response.on('end', function () {
                    var completeHtml = str;
                    pdf.render({html:completeHtml},function(err,output){
                    
                         output.toBuffer(function(returnedBuffer) {
                            
                            var dir = path.resolve('temp_documents');
                            var dateTimeStr = new Date().getTime().toString();
                            var fileName ='MonthlyReturn.pdf';
                            var filePath =path.join(dir, dateTimeStr + '_' + fileName);
                             
                            fs.writeFile(filePath, returnedBuffer, (err) => {
                                if (err) throw err;
                                
                                var  attachments= [{
                                filename: 'MonthlyReturn.pdf',
                                path: filePath,
                                contentType: 'application/pdf'
                                }]  ;  
                                
                                // call mail helper to send 
                                mailer.send({from:'notify@paygenieonline.co.uk',to: params.email,subject:'Weekly Remittance from PayGenie',message:'Please find Weekly Remittance attached.',attachments:attachments},function(err,info){
                                        
                                    fs.unlink(filePath);
                                    
                                    if (err){
                                        console.log(err);
                                        res.send(err);
                                    }
                                    else
                                        res.send('ok');
                                    });
                                });
                        });                
                    });
            
                });
            });
        });
        
        app.post("/api/reports/email/subContractorMonthlyStatement/",passport.authenticationMiddleware(),function(req,res){
            //Body will have {id:id, startDate:startDate, endDate:endDate}
            var params = req.body;
            dalHelper.getSubContractorEmailAddressById(params.id).then(function(result){params.email = result.email; });
            
            if (!params.email)
                res.send('No email found!');
                
            //Create url 
            var reportUrl = '/api/reports/subContractorMonthlyStatement/'+params.id+'/'+params.startDate+'/'+params.endDate +'/pdf';
            reportUrl = util.format('%s%s',process.params.baseUrl,reportUrl);
            console.log(reportUrl);
            
            http.get(reportUrl,function(response){
                var str = "";
                var completeHtml ="";
                
                response.on('data', function (chunk) { str += chunk; });
                response.on('end', function () {
                    var completeHtml = str;
                    pdf.render({html:completeHtml},function(err,output){
                    
                         output.toBuffer(function(returnedBuffer) {
                            
                            var dir = path.resolve('temp_documents');
                            var dateTimeStr = new Date().getTime().toString();
                            var fileName ='MonthlyStatement.pdf';
                            var filePath =path.join(dir, dateTimeStr + '_' + fileName);
                             
                            fs.writeFile(filePath, returnedBuffer, (err) => {
                                if (err) throw err;
                                
                                var  attachments= [{
                                filename: 'MonthlyStatement.pdf',
                                path: filePath,
                                contentType: 'application/pdf'
                                }]  ;  
                                
                                // call mail helper to send 
                                mailer.send({from:'notify@paygenieonline.co.uk',to: params.email,subject:'Weekly Remittance from PayGenie',message:'Please find Weekly Remittance attached.',attachments:attachments},function(err,info){
                                        
                                    fs.unlink(filePath);
                                    
                                    if (err){
                                        console.log(err);
                                        res.send(err);
                                    }
                                    else
                                        res.send('ok');
                                    });
                                });
                        });                
                    });
            
                });
            });
        });
        
        app.post("/api/reports/email/KodeComAnnualInvoice/",passport.authenticationMiddleware(),function(req,res){
            //Body will have {id:id, date:date}
            var params = req.body;
            dalHelper.getContractorEmailAddressById(params.id).then(function(result){params.email = result.email; });
            
            if (!params.email)
                res.send('No email found!');
                
            //Create url 
            var reportUrl = '/api/reports/KodeComAnnualInvoice/'+params.id+'/'+params.date+'/pdf';
            reportUrl = util.format('%s%s',process.params.baseUrl,reportUrl);
            console.log(reportUrl);
            
            http.get(reportUrl,function(response){
                var str = "";
                var completeHtml ="";
                
                response.on('data', function (chunk) { str += chunk; });
                response.on('end', function () {
                    var completeHtml = str;
                    pdf.render({html:completeHtml},function(err,output){
                    
                         output.toBuffer(function(returnedBuffer) {
                            
                            var dir = path.resolve('temp_documents');
                            var dateTimeStr = new Date().getTime().toString();
                            var fileName ='AnnualInvoice.pdf';
                            var filePath =path.join(dir, dateTimeStr + '_' + fileName);
                             
                            fs.writeFile(filePath, returnedBuffer, (err) => {
                                if (err) throw err;
                                
                                var  attachments= [{
                                filename: 'AnnualInvoice.pdf',
                                path: filePath,
                                contentType: 'application/pdf'
                                }]  ;  
                                
                                // call mail helper to send 
                                mailer.send({from:'notify@paygenieonline.co.uk',to: params.email,subject:'Weekly Remittance from PayGenie',message:'Please find Weekly Remittance attached.',attachments:attachments},function(err,info){
                                        
                                    fs.unlink(filePath);
                                    
                                    if (err){
                                        console.log(err);
                                        res.send(err);
                                    }
                                    else
                                        res.send('ok');
                                    });
                                });
                        });                
                    });
            
                });
            });
        });
        
        app.post("/api/reports/email/subContractorInvoice/",passport.authenticationMiddleware(),function(req,res){
            //Body will have {id:id}
            var params = req.body;
            dalHelper.getSubContractorEmailAddressById(params.id).then(function(result){params.email = result.email; });
            
            if (!params.email)
                res.send('No email found!');
            
            //Create url 
            var reportUrl = '/api/reports/subContractorInvoice/'+params.id+'/pdf';
            reportUrl = util.format('%s%s',process.params.baseUrl,reportUrl);
            console.log(reportUrl);
            
            http.get(reportUrl,function(response){
                var str = "";
                var completeHtml ="";
                
                response.on('data', function (chunk) { str += chunk; });
                response.on('end', function () {
                    var completeHtml = str;
                    pdf.render({html:completeHtml},function(err,output){
                    
                         output.toBuffer(function(returnedBuffer) {
                            
                            var dir = path.resolve('temp_documents');
                            var dateTimeStr = new Date().getTime().toString();
                            var fileName ='Invoice.pdf';
                            var filePath =path.join(dir, dateTimeStr + '_' + fileName);
                             
                            fs.writeFile(filePath, returnedBuffer, (err) => {
                                if (err) throw err;
                                
                                var  attachments= [{
                                filename: 'Invoice.pdf',
                                path: filePath,
                                contentType: 'application/pdf'
                                }]  ;  
                                
                                // call mail helper to send 
                                mailer.send({from:'notify@paygenieonline.co.uk',to: params.email,subject:'Weekly Remittance from PayGenie',message:'Please find Weekly Remittance attached.',attachments:attachments},function(err,info){
                                        
                                    fs.unlink(filePath);
                                    
                                    if (err){
                                        console.log(err);
                                        res.send(err);
                                    }
                                    else
                                        res.send('ok');
                                    });
                                });
                        });                
                    });
            
                });
            });
        });
        
        app.get('report/pdf/',function(req,res){
         
           res.render('./reports/SubContractorMonthlyStatement',{});
         
        });
        
        app.get('/email/',function(req,res){
            
            // render pdf
                pdf.render({html:'<html><body><h1>hello world</h1></body></html>'},function(err,output){
                    
                         output.toBuffer(function(returnedBuffer) {
                
                             // save pdf to temp file
                             var dir = path.resolve('temp_documents');
                             var fileName ='test.pdf';
                             var filePath =path.join(dir, fileName);
                             
                            fs.writeFile(filePath, returnedBuffer, (err) => {
                                if (err) throw err;
                                console.log('The file has been saved!');
                                
                                var  attachments= [{
                                filename: fileName,
                                path: dir,
                                contentType: 'application/pdf'
                                }]  ;  
                                
                                // call mail helper to send 
                            
                                  mailer.send({from:'navs@hotmail.co.uk',to:'navs@hotmail.co.uk',subject:'test',fileName:'test.pdf',message:'testing',attachments:attachments},function(err,info){
                                        console.log(err);
                                        console.log(info);
           
                                        });
     
                                
                                
                                });
                            
                        });                
                    
                  
           });
           
           res.send('ok') ;
        });
        
        
}


})(module.exports);
