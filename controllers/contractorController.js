(function(contractorsController){

    var db = require('../data/contractorDal.js');
    var http = require('http');
    var path = require('path');
    var fs = require('fs');
    var util = require('util');
    const passport = require('passport');
    const pdf = require("../helper/pdf.js");
    
    contractorsController.init= function(app){
         setupRoutes(app);    
    };
    

var setupRoutes=function(app){
    
       console.log("setting up contractors route");
    //   app.get("/api/getContractors/",function(req,res){
           
    //       db.getContractor({},function(err,data){
               
    //           if(err)
    //           res.send(err);
    //           else

    //             res.send(data);
    
    //     });
           
    //     }); 
        
        app.get("/api/getContractorNames/",passport.authenticationMiddleware(), function(req,res){
        
        db.getContractorList({},function(err,data){
           
           if(err)
           res.send(err);
           else
        
            res.send(data);
        
        });
        
        });
        
        app.get("/api/contractor/get/:id?",passport.authenticationMiddleware(), function(req,res){
        
        console.log("getting contractor");
            var params={};
            params.id = req.params.id;
           db.getContractor(params, function(err,data){
           
           if(err)
           res.send(err);
           else
        
            res.send(data);
        
        });
        });
        
        app.get("/api/contractorNote/get/:id",passport.authenticationMiddleware(), function(req,res){
        
        db.getContractorNotes(req.params,function(err,data){
           
           if(err)
           res.send(err);
           else
        
            res.send(data);
        
        });
        
        });
        
        
        app.post("/api/contractor/save/",passport.authenticationMiddleware(), function(req,res){
        console.log('saving..');
        var body='';
        req.on('data',function(data){
           body +=data;
            
        });
        
        req.on('end', function () {
        
        var params = JSON.parse((body));
        console.log(body);
        
        db.saveContractor(params,function(err,data){
           
           if(err)
           res.send(err);
           else
        
            res.send(data);
        
        });
        //res.send("ok");
        
        });
        });
        
        app.post("/api/contractorNote/save/", function(req,res){
        
        db.saveContractorNote(req.body,function(err,data){
           
           if(err)
           res.send(err);
           else
        
            res.send(data);
        
        });
        //res.send("ok");
        
        });
        
        app.post("/api/contractorNote2/save/", function(req,res,next){
        
        var body='';
        
        console.log('saving notes ');
        
         var body='';
        
        req.on('data',function(data){
            
            
           body +=data;
            
        });
        
         req.on('end',function(data){
            
          // body +=data;
            
            console.log(data);
             res.send("done");
            next();
        });
        
        
       console.log("Ok");
           next();
        });
        
        
        app.post("/api/contractor/delete/",passport.authenticationMiddleware(), function(req,res){
        console.log('deleting..');
        var body='';
        req.on('data',function(data){
           body +=data;
            
        });
        
        req.on('end', function () {
        
        var params = JSON.parse((body));
        console.log(body);
        
        db.deleteContractor(params,function(err,data){
           
           if(err)
           res.send(err);
           else
        
            res.send(data);
        
        });
        //res.send("ok");
        
        });
        
        
        
        });
        
        app.get("/api/contractorAttachments/get/:id", passport.authenticationMiddleware(),function(req,res){
        
        db.getContractorAttachments(req.params,function(err,data){
           
           if(err)
           res.send(err);
           else
          res.send(data);
        });
        
        });
        
        app.get("/api/contractorAttachment/get/:id",passport.authenticationMiddleware(), function(req,res){
        console.log('contractorAttachment');
        
        db.getContractorAttachment(req.params,function(err,data){
           
           if(err)
           res.send(err)
           else
           {
             var content = new Buffer(data[0].content,'base64');
             
             res.writeHead(200, {
                        "Content-Disposition": util.format("attachment;filename=%s",data[0].fileName) 
                      
                      , "Content-Type":util.format("%s",data[0].doctype)
                          
                      });
                res.end(content,'base64');
                
            }
           
           
           console.log('ok');
        
        
        });
        
        
        });
        
        app.post("/api/contractorAttachment/delete/", passport.authenticationMiddleware(), function(req,res){
        console.log('deleting..');
        var body='';
        req.on('data',function(data){
           body +=data;
            
        });
        
        req.on('end', function () {
        
        var params = JSON.parse((body));
        console.log(body);
        
        db.deleteContractorAttachment(params,function(err,data){
           
           if(err)
           res.send(err);
           else
        
            res.send(data);
        
        });
        //res.send("ok");
        
        });
        
        
        
        });
        
        app.post("/api/contractorAttachment/save/", passport.authenticationMiddleware(),saveFile);
    
        app.get("/report", function(req,res,next){
                
                
                
            //var html =util.format('<!DOCTYPE html><html lang="en"><body><h1>%s</h1><i>this is report...</i></body></html>',req.params.name);
            var reportUrl = req.query.report;
        
            http.get(reportUrl,function(response){
                var str = "";
                var completeHtml ="";
                response.on('data', function (chunk) {
                    str += chunk;
                  });
                
                  response.on('end', function () {
                    var completeHtml = str;
                    // your code here if you want to use the results !
                    
                    pdf.render({html:completeHtml},function(err,output){
                    //pdf.testPdf({html:completeHtml},function(err,output){
                 output.toBuffer(function(returnedBuffer) {
                     
                      res.writeHead(200, {
                        "Content-Disposition": util.format("attachment;filename=%s",req.params.name + ".pdf") 
                      
                      , "Content-Type":util.format("%s","text/pdf")
                          
                      });
              
                     
                     res.end(returnedBuffer);
                    next();
                });                
                
            });
            
                  });
                
                
                console.log(reportUrl);
            
                


            });
        
        });  
        
        app.get("/report2/:name?", function(req,res,next){
                
                  var address={
                    DisplayName:'test',
                    Address:'test',
                    Town:'test',
                    County:'test',
                    PostCode:'test',
                    Email:'test',
                    WeekEnding:''
                  };
    
                var contractor={
                DisplayName:'displayname',
                Address:'address:',
                Town:'town',
                County:'county',
                PostCode:'postcode'
                }
                
            var log ={logoPath:'/logo.png'}
            
            
            
            
            var subContractor={services :[]}
            
            var payrollItem={gross:20.00}
            var materials=[]
	   res.render('./reports/SubContractorInvoice',{address:address,contractor:contractor,subContractor:subContractor,payrollItem:payrollItem,materials:materials
	       
	   });

        
        });
       
}

    

    
function saveFile(req,res,next){
    
        var temppath = path.resolve('public');
        var filename = req.headers['filename'];
        var contentType = req.headers['content-type'];
        var id = req.headers['object_id'];
        temppath = path.join(temppath,'files/'+ filename);
        var writeStream = fs.createWriteStream(temppath, {flags: 'w'});
    
        var body;
        
        req.pipe(writeStream, {end: false});
        
        req.on('end', function () {
            // db save
            var promise = db.saveContractorAttachment({id: id, filepath: temppath, name: filename, type: contentType});
            promise.then(res.end('ok'),res.end('fail'));
            
            });
    }
    




})(module.exports);
