(function(reportsController){

    var db = require('../data/reportsDal.js');
    var http = require('http');
    var path = require('path');
    var fs = require('fs');
    var util = require('util');
    var async = require('async');
    var archiver = require('archiver');
    const passport = require('passport');
    const pdf = require("../helper/pdf.js");
    const mailer = require("../helper/mail.js");
    const dalHelper = require('../data/helperFunction.js');
    const url = require('url');
    var helper = require('./helper.js');
    
    reportsController.init= function(app){
         setupRoutes(app);    
    };
    

var setupRoutes=function(app){
    
       console.log("setting up reports route");
        
       app.get("/api/reports/subContractorInvoice/:id/:mode?/:user?", /*passport.authenticationMiddleware(),*/function(req,res){
        
         var option ={};        
        option.mode = req.params.mode || 'html';
          var params=req.params;
            
        if (req.user)
            params.username = req.user.username;
        else if (req.query.user)
            params.username = req.query.user;
            
        db.getSubcontractorInvoiceData(params,function(err,data){
           data.url = req.url;
           if(err)
           {
               console.log(err);
               res.send(err);
           }
           else{
               data.renderOption= option;
               
               var dbData = app.get("logoUrls");
               
               helper.getUserLogoUrl(dbData,params.username)
               .then(function(result){
                   
                    data.logoUrl = process.params.baseUrl + result.url;
                    data.DbName = result.name;
                    res.render('./reports/SubContractorInvoice',data);
               });
          }
        });
        
        });
        
        app.get("/api/reports/batchSubContractorInvoice/:paymentDate/:jobs", passport.authenticationMiddleware(),function(req,res){
            
            var jobIds = JSON.parse(req.params.jobs);
            var params = req.params;
            params.username = req.user.username;
            
            jobIds.forEach(function(jobId){
                dalHelper.getJobNameFromId({id:jobId,username:params.username}).then(function(jobNameResult)
                {
                    var params=req.params;
                    params.username = req.user.username;
                    dalHelper.getPayrollIds(params, jobId).then(function(items)
                    {
                        if (items.length > 0)
                        {
                            this.generateZipFileName('SubContractorInvoice-' + jobNameResult.jobName).then(function(fileName){
                                dalHelper.CreateBatchRecord({file: fileName, username: params.username}).then(function(result){
                                
                                    res.send("Ok");
                                    createBatch({url: '/api/reports/subContractorInvoice/'+'%s'+'/pdf', reportName: 'SubContractorInvoice', user: req.user.username, zipName: fileName}, items);      
                                });
                            });
                        }
                        else
                         res.send("No Items");
                    });
                });
            });
        });
        
        app.get("/api/reports/contractorMonthlyReturn/:id/:monthEnd/:jobId/:mode?/:user?", /*passport.authenticationMiddleware(),*/function(req,res){

        var option ={};        
        option.mode = req.params.mode || 'html';
        var params=req.params;
        
        if (req.user)
            params.username = req.user.username;
        else if (req.query.user)
            params.username = req.query.user;
        
        db.getContractorMonthlyReturnData(params,function(err,data){
           
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
                
                var dbData = app.get("logoUrls");
                
                helper.getUserLogoUrl(dbData,params.username)
               .then(function(result){
                   console.log('logo path - ' + result)
                   
                    finalObject.logoUrl = process.params.baseUrl + result.url;
                    finalObject.DbName = result.name;
                    res.render('./reports/ContractorMonthlyReturn',finalObject);
               });
          }
        });
        
        });
        
        app.get("/api/reports/contractorWeeklyText/:id/:paymentDate/:jobId", passport.authenticationMiddleware(),function(req,res){
         var params=req.params;
            params.username = req.user.username;
            db.getContractorWeeklyRemittanceData(params,function(err,data){
               if(err)
               {
                   console.log(err);
                   res.send(err);
               }
               else{
                    var items = data[1];
                    
                    var csv ='Name,Number,Gross,Materials,Taxable,Tax,VAT,Net,Fee,Deductions,Payable' + "\n";
                    items.forEach(function(item){
                        
                        var tax = item.taxable * (item.deduction_rate / 100);
                        var net = item.gross - tax;
                        var vat = item.gross * (item.vat_rate / 100);
                        var subTotal = net + vat;
                        var payable = subTotal - item.deductionTotal - item.fee;
                        
                        var row = item.sub_displayName.replace(/,/g, '') + ','+  
                                  item.sub_ContactNumber + ','+ 
                                  item.gross.toFixed(2) + ','+ 
                                  item.materials.toFixed(2) + ','+ 
                                  item.taxable.toFixed(2) + ','+
                                  tax.toFixed(2) + ','+
                                  vat.toFixed(2) + ','+
                                  net.toFixed(2) + ','+
                                  item.fee.toFixed(2) + ','+
                                  item.deductionTotal.toFixed(2) + ','+
                                  payable.toFixed(2) /*+ ','+
                                  item.bankAccount + '\t,'+
                                  item.bankSortCode + '\t'*/;
                        csv += row + "\n";
                    }); 
                    res.setHeader('Content-disposition', 'attachment; filename=ContractorTextReport.csv');
                    res.set('Content-Type', 'text/csv');
                    res.status(200).send(csv);
              }
            });
        
        });
        
        app.get("/api/reports/contractorWeeklyBanking/:id/:paymentDate/:jobId", passport.authenticationMiddleware(), function(req,res){
            var params=req.params;
            params.username = req.user.username;
            db.getContractorWeeklyRemittanceData(params,function(err,data){
               if(err)
               {
                   console.log(err);
                   res.send(err);
               }
               else{
                    var conData = data[0][0];
                    var items = data[1];
                    
                    var ref = conData.WeekEnding.replace(/\//g, "");
                    
                    var csv ='Sort Code,Name,Account,Ref,Payable' + "\n";
                    items.forEach(function(item){
                        
                        var tax = item.taxable * (item.deduction_rate / 100);
                        var net = item.gross - tax;
                        var vat = item.gross * (item.vat_rate / 100);
                        var subTotal = net + vat;
                        var payable = subTotal - item.deductionTotal - item.fee;
                        
                        var row = item.bankSortCode + ','+ 
                                  item.sub_displayName.replace(/,/g, '') + ','+  
                                  item.bankAccount + ','+ 
                                  item.jobRef + ref +','+ 
                                  payable.toFixed(2) + '' ;
                        csv += row + "\n";
                    }); 
                    res.setHeader('Content-disposition', 'attachment; filename=ContractorBankingReport.csv');
                    res.set('Content-Type', 'text/csv');
                    res.status(200).send(csv);
              }
            });
        
        });
        
        app.get("/api/reports/contractorData/", passport.authenticationMiddleware(), function(req,res){
            var params=req.params;
            params.username = req.user.username;
            db.getContractorData(params,function(err,data){
               if(err)
               {
                   console.log(err);
                   res.send(err);
               }
               else{
                    
                    var items = data
                    
                    var csv ='Id,CompanyName,First Name,Surname,Address,Town,County,PostCode,Phone,Mobile,Fax,Email,UTR,TLCIns,Payer Type,Notes,Fee,DeletedDate ' + "\n";
                    items.forEach(function(item){
                        
                        var company_name = (item.company_name) ? item.company_name.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var first_name = (item.first_name) ? item.first_name.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var surname = (item.surname) ? item.surname.replace(/,/g , "").replace(/[\r\n]/g, '') : ""; 
                        var address = (item.address) ? item.address.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var town = (item.town) ? item.town.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var county = (item.county) ? item.county.replace(/,/g , "").replace(/[\r\n]/g, '') : ""; 
                        var postCode = (item.postCode) ? item.postCode.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var phone = (item.phone) ? item.phone.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var mobile = (item.mobile) ? item.mobile.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var fax = (item.fax) ? item.fax.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var email = (item.email) ? item.email.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var notes = (item.notes) ? item.notes.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        
                                 
                       var row = item.id + '\t,'+ 
                                  company_name + '\t,'+ 
                                  first_name + '\t,'+  
                                  surname + '\t,'+ 
                                  address +'\t,'+ 
                                  town +'\t,'+ 
                                  county +'\t,'+
                                  postCode +'\t,'+
                                  phone +'\t,'+
                                  mobile +'\t,'+
                                  fax +'\t,'+
                                  email +'\t,'+ 
                                  item.utr +'\t,'+ 
                                  item.tlcins +'\t,'+ 
                                  item.payer_type +'\t,'+
                                  notes.replace(/,/g , "") +'\t,'+
                                  item.fee +'\t,'+
                                  item.deleted_datetime 
                        csv += row + "\n";
                    }); 
                    res.setHeader('Content-disposition', 'attachment; filename=ContractorDataReport.csv');
                    res.set('Content-Type', 'text/csv');
                    res.status(200).send(csv);
              }
            });
        
        });
        
        app.get("/api/reports/subContractorData/", passport.authenticationMiddleware(), function(req,res){
            var params=req.params;
            params.username = req.user.username;
            db.getSubContractorData(params,function(err,data){
               if(err)
               {
                   console.log(err);
                   res.send(err);
               }
               else{
                    
                    var items = data
                    
                    var csv ='Id,CompanyName,First Name,Surname,Address,Town,County,PostCode,Phone,Mobile,Fax,Email,UTR,NINO,Reg No,Verification No,Deduction Rate,VAT Rate,Services,IsActive,Contract Received,Notes,Bank Account,Sort Code ' + "\n";
                    items.forEach(function(item){
                        
                        var company_name = (item.company_name) ? item.company_name.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var first_name = (item.first_name) ? item.first_name.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var surname = (item.surname) ? item.surname.replace(/,/g , "").replace(/[\r\n]/g, '') : ""; 
                        var address = (item.address) ? item.address.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var town = (item.town) ? item.town.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var county = (item.county) ? item.county.replace(/,/g , "").replace(/[\r\n]/g, '') : ""; 
                        var postCode = (item.postCode) ? item.postCode.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var phone = (item.phone) ? item.phone.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var mobile = (item.mobile) ? item.mobile.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var fax = (item.fax) ? item.fax.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var email = (item.email) ? item.email.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var services = (item.services) ? item.services.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        var notes = (item.notes) ? item.notes.replace(/,/g , "").replace(/[\r\n]/g, '') : "";
                        
                       var row =  item.id + '\t,'+
                                  company_name + '\t,'+ 
                                  first_name + '\t,'+  
                                  surname + '\t,'+ 
                                  address +'\t,'+ 
                                  town +'\t,'+ 
                                  county +'\t,'+
                                  postCode +'\t,'+
                                  phone +'\t,'+
                                  mobile +'\t,'+
                                  fax +'\t,'+
                                  email +'\t,'+ 
                                  item.utr +'\t,'+ 
                                  item.nino +'\t,'+ 
                                  item.companyRegNo +'\t,'+
                                  item.verification_no +'\t,'+
                                  item.deduction_rate +'\t,'+
                                  item.vat_rate +'\t,'+
                                  services +'\t,'+
                                  item.active +'\t,'+
                                  item.contract_recd +'\t,'+
                                  notes +'\t,'+
                                  item.bankAcc +'\t,'+
                                  item.bankSrt
                        csv += row + "\n";
                    }); 
                    res.setHeader('Content-disposition', 'attachment; filename=SubContractorDataReport.csv');
                    res.set('Content-Type', 'text/csv');
                    res.status(200).send(csv);
              }
            });
        
        });
        
        app.get("/api/reports/contractorWeeklyRemittance/:id/:paymentDate/:jobId/:mode?/:user?", /*passport.authenticationMiddleware(),*/function(req,res){
             var option ={};        
        option.mode = req.params.mode || 'html';
        var params=req.params;
            
        if (req.user)
            params.username = req.user.username;
        else if (req.query.user)
            params.username = req.query.user;
            
        db.getContractorWeeklyRemittanceData(params,function(err,data){
           if(err)
           {
               console.log(err);
               res.send(err);
           }
           else{
                data[0][0].items = data[1];
                var finalObject = Object.assign({}, data[0][0])
                
                finalObject.url= req.url;
                finalObject.renderOption= option;
                
                var dbData = app.get("logoUrls");
                
                 helper.getUserLogoUrl(dbData,params.username)
               .then(function(result){
                   
                    finalObject.logoUrl = process.params.baseUrl + result.url;
                    finalObject.DbName = result.name;
                    res.render('./reports/ContractorWeeklyRemittance',finalObject);
               });
                
                
          }
        });
        
        });
        
        app.get("/api/reports/getBatches/", passport.authenticationMiddleware(),function(req,res){
        
           var dir = path.resolve('batches');
           var params=req.params;
            params.username = req.user.username;
           db.getBatchData(params,function(err,data){
           if(err)
           {
               console.log(err);
               res.send(err);
           }
           else{
               console.log(JSON.stringify(data));
              res.send(data)
          }
            
        });
        });
        
        app.get("/api/reports/getBatch/:id", passport.authenticationMiddleware(),function(req,res){
                      
           var dir = path.resolve('batches');
           var params=req.params;
            params.username = req.user.username;
           db.getBatchItem(params,function(err,data){
           if(err)
           {
               console.log(err);
               res.send(err);
           }
           else{
               var dir = path.resolve('batches');
                var filePath = path.join(dir, data.fileName);
                var readStream = fs.createReadStream(filePath);
                
                res.writeHead(200, {
                        "Content-Disposition": util.format("attachment;filename=%s",data.fileName) 
                      , "Content-Type":util.format("%s",'application/zip')
                          
                      });
                      
                readStream.pipe(res);
          }
            
        });
        });
        
        app.get("/api/reports/deleteBatch/:id", passport.authenticationMiddleware(),function(req,res){
        
                var dir = path.resolve('batches');
                var params=req.params;
            params.username = req.user.username;
           db.getBatchItem(params,function(err,data){
           if(err)
           {
               console.log(err);
               res.send(err);
           }
           else{
               var dir = path.resolve('batches');
                var filePath = path.join(dir, data.fileName);
                
                var newParam = {};
                newParam.id = data.id;
                newParam.username = params.username;
                
                db.deleteBatch(newParam);
                fs.unlink(filePath, err => {
                    if (err) console.log(err);
                });
                
                
                res.send('Ok');
          }
            
        });
        });
        
        app.get("/api/reports/subContractorMonthlyStatement/:id/:monthStart/:monthEnd/:jobId/:mode?/:user?", /*passport.authenticationMiddleware(),*/function(req,res){
        
        var option ={};        
        option.mode = req.params.mode || 'html';
        var params=req.params;
            
        if (req.user)
            params.username = req.user.username;
        else if (req.query.user)
            params.username = req.query.user;
            
        db.subContractorMonthlyStatement(params,function(err,data){
           
           if(err)
           {
               console.log(err);
               res.send(err);
           }
           else{
               var finalObject = Object.assign({}, data[0][0], data[1][0]);
            finalObject.renderOption= option;
            finalObject.url= req.url;
            
            var dbData = app.get("logoUrls");
            
            helper.getUserLogoUrl(dbData,params.username)
               .then(function(result){
                   
                    finalObject.logoUrl = process.params.baseUrl + result.url;
                    finalObject.DbName = result.name;
                    res.render('./reports/SubContractorMonthlyStatement',finalObject);
               });
          }
        });
        
        });
        
        app.get("/api/reports/batchSubContractorMonthlyStatement/:monthStart/:monthEnd/:jobs", passport.authenticationMiddleware(),function(req,res){
            
            var jobIds = JSON.parse(req.params.jobs);
            var params=req.params;
            params.username = req.user.username;
            jobIds.forEach(function(jobId){
            
                dalHelper.getJobNameFromId({id:jobId,username:params.username}).then(function(jobNameResult)
                {
                    dalHelper.getSubContarctorIdsForMonthlyStat(params, jobId).then(function(items)
                    {
                        if (items.length > 0)
                        {
                            this.generateZipFileName('SubContractorMonthlyStatement-' + jobNameResult.jobName).then(function(fileName){
                                dalHelper.CreateBatchRecord({file: fileName, username: req.user.username}).then(function(result){
                                
                                    res.send("Ok");
                                
                                    createBatch({url: '/api/reports/subContractorMonthlyStatement/'+'%s'+'/'+req.params.monthStart+'/'+req.params.monthEnd+'/'+jobId+'/pdf', user: req.user.username, reportName: 'SubContractorMonthlyStatement', zipName: fileName}, items);      
                                });
                            });
                        }
                        else
                            res.send("No Items");
                    });
                });
            });
            
        });
        
        app.get("/api/reports/KodeComAnnualInvoice/:id/:yearEnd/:jobId/:mode?/:user?", /*passport.authenticationMiddleware(),*/function(req,res){
        
        var option ={};        
        option.mode = req.params.mode || 'html';
        
        var params=req.params;
        
        if (req.user)
            params.username = req.user.username;
        else if (req.query.user)
            params.username = req.query.user;
            
        
        db.getKodeComAnnualInvoiceData(params,function(err,data){
           
           if(err)
           {
               console.log(err);
               
               
               res.send(err);
           }
           else{
                data[0][0].items = data[1];
                var finalObject = Object.assign({}, data[0][0], data[2][0]);
                finalObject.renderOption= option;
                finalObject.url = req.url;
                
                var dbData = app.get("logoUrls");
                
                 helper.getUserLogoUrl(dbData,params.username)
               .then(function(result){
                   
                    finalObject.logoUrl = process.params.baseUrl + result.url;
                    finalObject.DbName = result.name;
                    res.render('./reports/KodeComAnnualInvoice',finalObject);
               });
          }
        });
        
        });
        
        app.get("/api/reports/batchKodeComAnnualInvoice/:yearEnd/:jobs", passport.authenticationMiddleware(),function(req,res){
            
            var jobIds = JSON.parse(req.params.jobs);
            var params=req.params;
            params.username = req.user.username;
            jobIds.forEach(function(jobId){
            
                dalHelper.getJobNameFromId({id:jobId,username:params.username}).then(function(jobNameResult)
                {
                    dalHelper.getSubContractorAnnualIds(params, jobId).then(function(items)
                    {
                        if (items.length > 0)
                        {
                            this.generateZipFileName('SubContractorAnnualInvoice-' + jobNameResult.jobName).then(function(fileName){
                                dalHelper.CreateBatchRecord({file: fileName, username: req.user.username}).then(function(result){
                                
                                    res.send("Ok");
                                    createBatch({url: '/api/reports/KodeComAnnualInvoice/'+'%s'+'/'+req.params.yearEnd+'/'+jobId+'/pdf', user: req.user.username, reportName: 'SubContractorAnnualInvoice', zipName: fileName}, items);      
                                });
                            });
                        }
                        else
                            res.send("No Items");
                    });
                });
            });
        });
        
        app.post("/api/reports/email/contractorWeeklyRemittance/",passport.authenticationMiddleware(),function(req,res){
            var params = req.body;
            params.username = req.user.username;
            dalHelper.getContractorEmailAddressById(params).then(function(result){
                
                params.email = result.email;
                
                if (params.email == "" || params.email== undefined)
                res.send('No email found!');
            
                    //Create url 
                    var reportUrl = '/api/reports/contractorWeeklyRemittance/'+params.id+'/'+params.paymentDate+'/'+params.jobId+'/pdf';
                    reportUrl = util.format('%s%s',process.params.baseUrl,reportUrl);
                    console.log(reportUrl);
                    
                    
                    this.addUserToUrl(reportUrl, req.user.username).then(function(newUrl){
                        http.get(newUrl,function(response){
                        var str = "";
                        var completeHtml ="";
                        
                        response.on('data', function (chunk) { str += chunk; });
                        response.on('end', function () {
                            var completeHtml = str;
                            pdf.render({html:completeHtml, orientation:'landscape'},function(err,output){
                            
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
            });
        });
        
        /*app.post("/api/reports/email/contractorWeeklyRemittance/",passport.authenticationMiddleware(),function(req,res){
            var params = req.body;
            dalHelper.getContractorEmailAddressById(params).then(function(result){
                
                params.email = result.email;
                
                if (params.email == "" || params.email== undefined)
                    return res.send('No email found!');
            
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
                        var promise = pdf.saveAsPdf({html:completeHtml});
                        promise.then(function(attachments){
                            // call mail helper to send 
                            mailer.send({from:'notify@paygenieonline.co.uk',to: params.email,subject:'Weekly Remittance from PayGenie',message:'Please find Weekly Remittance attached.',attachments:attachments},
                            function(err,info){
                        
                                fs.unlink(attachments[0].filePath);
                        
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
        });*/
        
        
        app.get("/api/reports/batchContractorWeeklyRemittance/:paymentDate/:jobs", passport.authenticationMiddleware(),function(req,res){

            var jobIds = JSON.parse(req.params.jobs);
            var params=req.params;
            params.username = req.user.username;
            jobIds.forEach(function(jobId){
               
                dalHelper.getJobNameFromId({id:jobId,username:params.username}).then(function(jobNameResult)
                {
                    dalHelper.getContarctorIdsForPaymentDate(params, jobId).then(function(items)
                    {
                        if (items.length > 0)
                        {
                            this.generateZipFileName('ContractorWeeklyRemittance-' + jobNameResult.jobName ).then(function(fileName){
                                dalHelper.CreateBatchRecord({file: fileName, username: req.user.username}).then(function(result){
                                
                                    res.send("Ok");
                                    createBatch({url: '/api/reports/contractorWeeklyRemittance/'+'%s'+'/'+req.params.paymentDate+'/'+jobId+'/pdf', user: req.user.username, reportName: 'ContractorWeeklyRemittance', zipName: fileName}, items);      
                                });
                            });
                        }
                        else
                            res.send("No Items");
                    });
                });
            });

        });
        
        app.post("/api/reports/email/contractorMonthlyReturn/",passport.authenticationMiddleware(),function(req,res){
            //Body will have {id:id, monthEnd:monthEnd}
            
            var params=req.body;
            params.username = req.user.username;
            
            dalHelper.getContractorEmailAddressById(params).then(
                
                function(result){
                    params.email = result.email; 
                    
                    if (params.email == "" || params.email== undefined)
                        return res.send('No email found!');
                
                    //Create url 
                    var reportUrl = '/api/reports/contractorMonthlyReturn/'+params.id+'/'+params.monthEnd+'/'+params.jobId+'/pdf';
                    reportUrl = util.format('%s%s',process.params.baseUrl,reportUrl);
                    
                    this.addUserToUrl(reportUrl, req.user.username).then(function(newUrl){
                        http.get(newUrl,function(response){
                        var str = "";
                        var completeHtml ="";
                        
                        response.on('data', function (chunk) { str += chunk; });
                        response.on('end', function () {
                            var completeHtml = str;
                            pdf.render({html:completeHtml, orientation:'landscape'},function(err,output){
                            
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
                                        mailer.send({from:'notify@paygenieonline.co.uk',to: params.email,subject:'Monthly Return from PayGenie',message:'Please find Monthly Return attached.',attachments:attachments},function(err,info){
                                                
                                            fs.unlink(filePath);
                                            
                                            if (err){
                                                console.log(err);
                                                res.send(err);
                                            }
                                            else
                                               {
                                                   console.log('sending ok after email!');
                                                   res.send('ok');
                                                   
                                               }
                                            });
                                        });
                                });                
                            });
                    
                        });
                    });  
                    });
                });
        });
        
        app.get("/api/reports/batchContractorMonthlyReturn/:monthEnd/:jobs", passport.authenticationMiddleware(),function(req,res){
            
            var jobIds = JSON.parse(req.params.jobs);
            var params=req.params;
            params.username = req.user.username;
            
            jobIds.forEach(function(jobId){
            
                dalHelper.getJobNameFromId({id:jobId,username:params.username}).then(function(jobNameResult)
                {
                    dalHelper.getContarctorIdsForMonthlyReturn(params, jobId).then(function(items)
                    {
                        if (items.length > 0)
                        {
                            this.generateZipFileName('ContractorMonthlyReturn-' + jobNameResult.jobName).then(function(fileName){
                                dalHelper.CreateBatchRecord({file: fileName, username: req.user.username}).then(function(result){
                                
                                    res.send("Ok");
                                    createBatch({url: '/api/reports/contractorMonthlyReturn/'+'%s'+'/'+req.params.monthEnd+'/'+jobId+'/pdf', user: req.user.username, reportName: 'ContractorMonthlyReturn', zipName: fileName}, items);      
                                });
                            });
                        }
                        else
                            res.send("No Items");
                    });
                });
            });
        });
        
        app.post("/api/reports/email/subContractorMonthlyStatement/",passport.authenticationMiddleware(),function(req,res){
            //Body will have {id:id, startDate:startDate, endDate:endDate}
            var params = req.body;
              
            params.username = req.user.username;
            dalHelper.getSubContractorEmailAddressById(params).then(function(result){
                
                params.email = result.email;
                
                if (params.email == "" || params.email== undefined)
                res.send('No email found!');
                
                //Create url 
                var reportUrl = '/api/reports/subContractorMonthlyStatement/'+params.id+'/'+params.startDate+'/'+params.endDate+'/'+params.jobId +'/pdf';
                reportUrl = util.format('%s%s',process.params.baseUrl,reportUrl);
                
                this.addUserToUrl(reportUrl, req.user.username).then(function(newUrl){
                    http.get(newUrl,function(response){
                    var str = "";
                    var completeHtml ="";
                    
                    response.on('data', function (chunk) { str += chunk; });
                    response.on('end', function () {
                        var completeHtml = str;
                        pdf.render({html:completeHtml, orientation:'landscape'},function(err,output){
                        
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
                                    mailer.send({from:'notify@paygenieonline.co.uk',to: params.email,subject:'Monthly Statement from PayGenie',message:'Please find Monthly Statement attached.',attachments:attachments},function(err,info){
                                            
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
                
            });
        });
        
        app.post("/api/reports/email/KodeComAnnualInvoice/",passport.authenticationMiddleware(),function(req,res){
            //Body will have {id:id, date:date}
            var params = req.body;
              
            params.username = req.user.username;
            dalHelper.getSubContractorEmailAddressById(params).then(function(result){
                
                params.email = result.email;
                
                if (params.email == "" || params.email== undefined)
                res.send('No email found!');
                
                //Create url 
                var reportUrl = '/api/reports/KodeComAnnualInvoice/'+params.id+'/'+params.date+'/'+params.jobId+'/pdf';
                reportUrl = util.format('%s%s',process.params.baseUrl,reportUrl);
                
                this.addUserToUrl(reportUrl, req.user.username).then(function(newUrl){
                    http.get(newUrl,function(response){
                    var str = "";
                    var completeHtml ="";
                    
                    response.on('data', function (chunk) { str += chunk; });
                    response.on('end', function () {
                        var completeHtml = str;
                        pdf.render({html:completeHtml, orientation:'landscape'},function(err,output){
                        
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
                                    mailer.send({from:'notify@paygenieonline.co.uk',to: params.email,subject:'Annual Invoice from PayGenie',message:'Please find Annual Invoice attached.',attachments:attachments},function(err,info){
                                            
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
                
            });
            
            
        });
        
        
        app.post("/api/reports/email/subContractorInvoice/",passport.authenticationMiddleware(),function(req,res){
            //Body will have {id:id}
            var params = req.body;
              
            params.username = req.user.username;
            dalHelper.getSubContractorEmailAddressByPayrollId(params).then(function(result){
                params.email = result.email;
                
                if (params.email == "" || params.email== undefined)
                res.send('No email found!');
            
                //Create url 
                var reportUrl = '/api/reports/subContractorInvoice/'+params.id+'/pdf';
                reportUrl = util.format('%s%s',process.params.baseUrl,reportUrl);
                
                this.addUserToUrl(reportUrl, req.user.username).then(function(newUrl){
                    http.get(newUrl,function(response){
                    var str = "";
                    var completeHtml ="";
                    
                    response.on('data', function (chunk) { str += chunk; });
                    response.on('end', function () {
                        var completeHtml = str;
                        pdf.render({html:completeHtml, orientation:'landscape'},function(err,output){
                        
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
                                    mailer.send({from:'notify@paygenieonline.co.uk',to: params.email,subject:'Invoice from PayGenie',message:'Please find Invoice attached.',attachments:attachments},function(err,info){
                                            
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
                
            });
        });
        
        app.get('report/pdf/',function(req,res){
         
           res.render('./reports/SubContractorMonthlyStatement',{});
         
        });
        
        app.get('/email/',function(req,res){
            
            // render pdf
                pdf.render({html:'<html><body><h1>hello world</h1></body></html>', orientation:'landscape'},function(err,output){
                    
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
        app.get('/zip/',function(req,res){
            
                  res.zip(
                     [
                    { path: '/path/to/file1.name', name: '/path/in/zip/file1.name' }
                    ,{ path: '/path/to/file2.name', name: 'file2.name' }
                    ]);
                    
        });
        
        this.addUserToUrl=function(urlstring, user){
    
            return new Promise((resolve,reject)=>{
                try
                {
                    var urlObj = url.parse(urlstring);
                    var queryStr = urlObj.query;
                    var newUrl = urlObj.href + '?' + queryStr + '&user=' + user;
            
                    resolve(newUrl);
                }
                catch(err)
                {
                    reject(err);
                }
            });  
        }; 
        
        this.generateZipFileName=function(reportName){
    
            return new Promise((resolve,reject)=>{
                var dateTimeStr = new Date().getTime().toString();
                resolve('Batch-'+reportName+'-'+dateTimeStr+'.zip');
            });  
        }; 
        
        
        function generateReportPdf(param, files, cb){
              http.get(param.reportUrl,function(response){
                    var str = "";
                    
                    response.on('data', function (chunk) { str += chunk; });
                    
                    response.on('end', function () {
                    
                        var completeHtml = str;
                        var promise = pdf.saveAsPdf({html:completeHtml, fileName:param.reportName+'-'+param.id, orientation:'landscape'});
                        
                        promise.then(function(attachments){ 
                            files.push(attachments[0]); 
                            cb(null, 'done');
                        });
                    });
                });
        }
        
        function createBatch(param, items){
        
        var attachments = [];
        createBatchSync(param, items, 0, attachments,function(err, data){
            
            if (err)
            {
                console.log("Batch Failed Error:- " + err);
                var newParams = {};
                newParams.zipName = param.zipName;
                newParams.username = param.user;
                dalHelper.FailBatchRecord(newParams);
            }
            else
            {
                console.log('Creating zip');
                // Create archive
                var archive  = archiver('zip');
                
                var dir = path.resolve('batches');
                var output = fs.createWriteStream(path.join(dir,param.zipName));
                archive.pipe(output);
                
                // Add filses to archive
                for(var i=0; i<attachments.length; i++){
                var item = attachments[i];
                console.log('Adding '+ item.name + 'to zip');
                archive.append(fs.readFileSync(item.path), {name: item.name});
                }
                
                output.on('close', function() {
                console.log(archive.pointer() + ' total bytes');
                console.log('archiver has been finalized and the output file descriptor has closed.');
                
                var newParams = {};
                newParams.zipName = param.zipName;
                newParams.username = param.user;
                //zip created update db record
                dalHelper.UpdateBatchRecord(newParams);
                // delete temp files
                for(var i=0; i<attachments.length; i++){
                fs.unlink(attachments[i].path);
                }
                });
                
                archive.finalize();
            }
        });
        }
        
        function createBatchSync(param, items,index,attachments,cb){
            
            //Create url 
            var id = items[index].id;
            var reportUrl = util.format(param.url, id);
            reportUrl = util.format('%s%s',process.params.baseUrl,reportUrl);
            
            this.addUserToUrl(reportUrl, param.user).then(function(newUrl){
                
            var p = generateReportPdf2({reportUrl: newUrl, id:id, reportName: param.reportName});
            p.then(function(attachment){
                
                attachments.push(attachment);
                index++;
                
                if (index === items.length) {
                    if (typeof cb ==='function')
                        return cb(null,attachments);
                }
                else
                    createBatchSync(param,items, index, attachments, cb);
            });
            
            p.catch(function(err){
               return cb(err,null);
            });
            })
            .catch(function(err){
               return cb(err,null);
            });
        }
        
        
        function generateReportPdf2(param){
            return new Promise(function(fullfil, reject){
         try{
             
              http.get(param.reportUrl,function(response){
                    var str = "";
                    
                    response.on('data', function (chunk) { str += chunk; });
                    
                    response.on('end', function () {
                        
                        var completeHtml = str;
                        
                        var promise = pdf.saveAsPdf({html:completeHtml, fileName:param.reportName+'-'+param.id, orientation:'landscape'});
                        
                        promise.then(function(attachments){ 
                            fullfil(attachments[0]);
                        });
                        promise.catch(function(err){ 
                            reject(err);
                           
                        });
                        
                    });
                    
                    response.on('error', function(err) {
                        reject(err);
                    });
                });
            }
         catch(err){
             reject(err);
            } 
     });                
        }
        
    };


})(module.exports);
