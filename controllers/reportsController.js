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
    
    reportsController.init= function(app){
         setupRoutes(app);    
    };
    

var setupRoutes=function(app){
    
       console.log("setting up reports route");
        
       app.get("/api/reports/subContractorInvoice/:id/:mode?", /*passport.authenticationMiddleware(),*/function(req,res){
        
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
        
        app.get("/api/reports/batchSubContractorInvoice/:paymentDate", passport.authenticationMiddleware(),function(req,res){
            
            dalHelper.getPayrollIds(req.params).then(function(items)
            {
                this.generateZipFileName('SubContractorInvoice').then(function(fileName){
                    dalHelper.CreateBatchRecord({file: fileName, username: req.user.username}).then(function(result){
                    
                        res.send("Ok");
                        createBatch({url: '/api/reports/subContractorInvoice/'+'%s'+'/pdf', reportName: 'SubContractorInvoice', zipName: fileName}, items);      
                    });
                });
            });
                
        });
        
        app.get("/api/reports/contractorMonthlyReturn/:id/:monthEnd/:mode?", /*passport.authenticationMiddleware(),*/function(req,res){

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
        
        app.get("/api/reports/contractorWeeklyRemittance/:id/:paymentDate/:mode?", /*passport.authenticationMiddleware(),*/function(req,res){
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
        
        app.get("/api/reports/getBatches/", passport.authenticationMiddleware(),function(req,res){
        
           var dir = path.resolve('batches');
           db.getBatchData(req.params,function(err,data){
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
           db.getBatchItem(req.params,function(err,data){
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
           db.getBatchItem(req.params,function(err,data){
           if(err)
           {
               console.log(err);
               res.send(err);
           }
           else{
               var dir = path.resolve('batches');
                var filePath = path.join(dir, data.fileName);
                fs.unlinkSync(filePath);
                db.deleteBatch(data);
                res.send('Ok');
          }
            
        });
        });
        
        app.get("/api/reports/subContractorMonthlyStatement/:id/:monthStart/:monthEnd/:mode?", /*passport.authenticationMiddleware(),*/function(req,res){
        
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
        
        app.get("/api/reports/batchSubContractorMonthlyStatement/:monthStart/:monthEnd", passport.authenticationMiddleware(),function(req,res){
            
            dalHelper.getSubContarctorIdsForMonthlyStat(req.params).then(function(items)
            {
                this.generateZipFileName('SubContractorMonthlyStatement').then(function(fileName){
                    dalHelper.CreateBatchRecord({file: fileName, username: req.user.username}).then(function(result){
                    
                        res.send("Ok");
                    
                        createBatch({url: '/api/reports/subContractorMonthlyStatement/'+'%s'+'/'+req.params.monthStart+'/'+req.params.monthEnd+'/pdf', reportName: 'SubContractorMonthlyStatement', zipName: fileName}, items);      
                    });
                });
            });
            
        });
        
        app.get("/api/reports/KodeComAnnualInvoice/:id/:yearEnd/:mode?", /*passport.authenticationMiddleware(),*/function(req,res){
        
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
        
        app.get("/api/reports/batchKodeComAnnualInvoice/:yearEnd", passport.authenticationMiddleware(),function(req,res){
            
            dalHelper.getSubContractorAnnualIds(req.params).then(function(items)
            {
                this.generateZipFileName('SubContractorAnnualInvoice').then(function(fileName){
                    dalHelper.CreateBatchRecord({file: fileName, username: req.user.username}).then(function(result){
                    
                        res.send("Ok");
                        createBatch({url: '/api/reports/KodeComAnnualInvoice/'+'%s'+'/'+req.params.yearEnd+'/pdf', reportName: 'SubContractorAnnualInvoice', zipName: fileName}, items);      
                    });
                });
            });
        });
        
        app.post("/api/reports/email/contractorWeeklyRemittance/",passport.authenticationMiddleware(),function(req,res){
            var params = req.body;
            dalHelper.getContractorEmailAddressById(params).then(function(result){
                
                params.email = result.email;
                
                if (params.email == "" || params.email== undefined)
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
        
        
        app.get("/api/reports/batchContractorWeeklyRemittance/:paymentDate", passport.authenticationMiddleware(),function(req,res){
            
            dalHelper.getContarctorIdsForPaymentDate(req.params).then(function(items)
            {
                this.generateZipFileName('ContractorWeeklyRemittance').then(function(fileName){
                    dalHelper.CreateBatchRecord({file: fileName, username: req.user.username}).then(function(result){
                    
                        res.send("Ok");
                        createBatch({url: '/api/reports/contractorWeeklyRemittance/'+'%s'+'/'+req.params.paymentDate+'/pdf', reportName: 'ContractorWeeklyRemittance', zipName: fileName}, items);      
                    });
                });
            });

        });
        
        app.post("/api/reports/email/contractorMonthlyReturn/",passport.authenticationMiddleware(),function(req,res){
            //Body will have {id:id, monthEnd:monthEnd}
            var vals = req.body;
            console.log(JSON.stringify(vals));
            dalHelper.getContractorEmailAddressById(vals).then(
                
                function(result){
                    vals.email = result.email; 
                    
                    if (vals.email == "" || vals.email== undefined)
                        return res.send('No email found!');
                
                    //Create url 
                    var reportUrl = '/api/reports/contractorMonthlyReturn/'+vals.id+'/'+vals.monthEnd+'/pdf';
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
                                        mailer.send({from:'notify@paygenieonline.co.uk',to: vals.email,subject:'Weekly Remittance from PayGenie',message:'Please find Weekly Remittance attached.',attachments:attachments},function(err,info){
                                                
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
        
        app.get("/api/reports/batchContractorMonthlyReturn/:monthEnd", passport.authenticationMiddleware(),function(req,res){
            
            dalHelper.getContarctorIdsForMonthlyReturn(req.params).then(function(items)
            {
                this.generateZipFileName('ContractorMonthlyReturn').then(function(fileName){
                    dalHelper.CreateBatchRecord({file: fileName, username: req.user.username}).then(function(result){
                    
                        res.send("Ok");
                        createBatch({url: '/api/reports/contractorMonthlyReturn/'+'%s'+'/'+req.params.monthEnd+'/pdf', reportName: 'ContractorMonthlyReturn', zipName: fileName}, items);      
                    });
                });
            });
                
        });
        
        app.post("/api/reports/email/subContractorMonthlyStatement/",passport.authenticationMiddleware(),function(req,res){
            //Body will have {id:id, startDate:startDate, endDate:endDate}
            var params = req.body;
            dalHelper.getSubContractorEmailAddressById(params).then(function(result){
                
                params.email = result.email;
                
                if (params.email == "" || params.email== undefined)
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
        });
        
        app.post("/api/reports/email/KodeComAnnualInvoice/",passport.authenticationMiddleware(),function(req,res){
            //Body will have {id:id, date:date}
            var params = req.body;
            dalHelper.getContractorEmailAddressById(params).then(function(result){
                
                params.email = result.email;
                
                if (params.email == "" || params.email== undefined)
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
            
            
        });
        
        
        app.post("/api/reports/email/subContractorInvoice/",passport.authenticationMiddleware(),function(req,res){
            //Body will have {id:id}
            var params = req.body;
            dalHelper.getSubContractorEmailAddressById(params).then(function(result){
                params.email = result.email;
                
                if (params.email == "" || params.email== undefined)
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
        app.get('/zip/',function(req,res){
            
                  res.zip(
                     [
                    { path: '/path/to/file1.name', name: '/path/in/zip/file1.name' }
                    ,{ path: '/path/to/file2.name', name: 'file2.name' }
                    ]);
                    
        });
        
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
                        var promise = pdf.saveAsPdf({html:completeHtml, fileName:param.reportName+'-'+param.id});
                        
                        promise.then(function(attachments){ 
                            files.push(attachments[0]); 
                            cb(null, 'done');
                        });
                    });
                });
        }
        
        function createBatch(param, items){
            
            var files = [];
            var tasks = [];
            
            // create tasks for each report
            items.forEach(function(item){
                //Create url 
                var id = item.id;
                var reportUrl = util.format(param.url, id);
                reportUrl = util.format('%s%s',process.params.baseUrl,reportUrl);
                
                tasks.push(function(callback){
                    generateReportPdf({reportUrl: reportUrl, id:id, reportName: param.reportName}, files, callback);
                });
            });
            
            console.log('task count '+ items.length);
            
            // run all the tasks
            async.series(tasks, function (err, results) {
                
                if (err) 
                    console.log("Err: ", err, "\nResults:", results);
                else {
                    
                    console.log('Creating zip');
                    // Create archive
                    var archive  = archiver('zip');
                    
                    var dir = path.resolve('batches');
                    var output = fs.createWriteStream(path.join(dir,param.zipName));
                    archive.pipe(output);
                    
                    // Add filses to archive
                    for(var i=0; i<files.length; i++){
	                    var item = files[i];
	                    console.log('Adding '+ item.name + 'to zip');
	                    archive.append(fs.readFileSync(item.path), {name: item.name});
                    }
                    
                    output.on('close', function() {
                        console.log(archive.pointer() + ' total bytes');
                        console.log('archiver has been finalized and the output file descriptor has closed.');
                        //zip created update db record
                        dalHelper.UpdateBatchRecord(param);
                        // delete temp files
                        for(var i=0; i<files.length; i++){
    	                    fs.unlink(files[i].path);
                        }
                    });
                    
                    archive.finalize();
                }
            });
            

            
            
        }
    };


})(module.exports);
