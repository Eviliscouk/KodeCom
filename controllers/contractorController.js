(function(contractorsController){

    var db = require('../data/contractorDal.js');
    var http = require('http');
    var path = require('path');
    var fs = require('fs');
    var util = require('util');
    const passport = require('passport');
    const pdf = require("../helper/pdf.js");
    const url = require("url");
    
    contractorsController.init= function(app){
         setupRoutes(app);    
    };
    

var setupRoutes=function(app){
    
       console.log("setting up contractors route");
       app.get("/test/",function(req,res,next){
           console.log('in here');
           res.send('ok');
           next();
           
         }); 
        
        app.get("/api/getContractorNames/",passport.authenticationMiddleware(), function(req,res){
        console.log('getting Names');
        console.log(req.user.username);
        db.getContractorList({username:req.user.username},function(err,data){
           
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
            params.username = req.user.username;
           db.getContractor(params, function(err,data){
           
           if(err)
           res.send(err);
           else
            res.send(data);
        
        });
        });
        
        app.get("/api/contractorNote/get/:id",passport.authenticationMiddleware(), function(req,res){
        var params=req.params;
        params.username = req.user.username;
        db.getContractorNotes(params,function(err,data){
           
           if(err)
           res.send(err);
           else
        
            res.send(data);
        
        });
        
        });
        
        app.get("/api/contractorJob/get/:id",passport.authenticationMiddleware(), function(req,res){
        var params=req.params;
        params.username = req.user.username;
        db.getContractorJobs(params,function(err,data){
           
           if(err)
           res.send(err);
           else
        
            res.send(data);
        
        });
        
        });
        
        app.get("/api/contractorJob/getOpen/:id",passport.authenticationMiddleware(), function(req,res){
        
        var params=req.params;
        params.username = req.user.username;
        db.getOpenContractorJobs(params,function(err,data){
           
           if(err)
           res.send(err);
           else
        
            res.send(data);
        
        });
        
        });
        
        
        app.post("/api/contractor/save/",passport.authenticationMiddleware(), function(req,res){
            console.log('saving..');
            console.log('user' - req.user);
            var params=req.body;
            params.username = req.user.username;
            db.saveContractor(params,function(err,data){
               
            if(err)
                res.send(err);
            else
                res.send(data);
            });
        });
        
        
        app.post("/api/contractorNote/save/", function(req,res){
          var params=req.body;
            params.username = req.user.username;
        db.saveContractorNote(params,function(err,data){
           
           if(err)
           res.send(err);
           else
        
            res.send(data);
        
        });
        //res.send("ok");
        
        });
        
        app.post("/api/contractorJob/save/", function(req,res){
          var params=req.body;
            params.username = req.user.username;
        db.saveContractorJob(params,function(err,data){
           
           if(err)
           res.send(err);
           else
        
            res.send(data);
        
        });
        //res.send("ok");
        
        });
        
        app.post("/api/contractor/lockPayroll/", function(req,res){
          var params=req.body;
            params.username = req.user.username;
        db.lockPayroll(params,function(err,data){
           
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
          var params=req.body;
            params.username = req.user.username;
        db.deleteContractor(params,function(err,data){
           
           if(err)
           res.send(err);
           else
        
            res.send(data);
        
        });
        
        
        
        });
        
        app.get("/api/contractorAttachments/get/:id", passport.authenticationMiddleware(),function(req,res){
          var params=req.params;
            params.username = req.user.username;
        db.getContractorAttachments(params,function(err,data){
           
           if(err)
           res.send(err);
           else
          res.send(data);
        });
        
        });
        
        app.get("/api/contractorAttachment/get/:id",passport.authenticationMiddleware(), function(req,res){
        console.log('contractorAttachment');
          var params=req.params;
            params.username = req.user.username;
        db.getContractorAttachment(params,function(err,data){
           
           if(err)
           res.send(err)
           else
           {
               res.writeHead(200, {
                        "Content-Disposition": util.format("attachment;filename=%s",data[0].fileName) 
                      , "Content-Type":util.format("%s",data[0].doctype)
                          
                      });
                var readStream = fs.createReadStream(data[0].link);
                readStream.pipe(res);
            }
           
           
           console.log('ok');
        
        });
        
        
        });
        
        app.post("/api/contractorAttachment/delete/", passport.authenticationMiddleware(), function(req,res){
        console.log('deleting..');
        
        console.log(req.body);
          var params=req.body;
            params.username = req.user.username;
        db.deleteContractorAttachment(params,function(err,data){
           
           if(err)
           res.send(err);
           else
        
            res.send(data);
        
        });
        
        });
        
        app.post("/api/contractorAttachment/save/", passport.authenticationMiddleware(),saveFile);
    
        app.get("/report", function(req,res,next){
                
            //var html =util.format('<!DOCTYPE html><html lang="en"><body><h1>%s</h1><i>this is report...</i></body></html>',req.params.name);
            var reportUrl = util.format('%s%s',process.params.baseUrl,req.query.report);
            var name = req.query.name;
            
            console.log(reportUrl);
            console.log(name);
            
            var urlObj = url.parse(reportUrl);
            var queryStr = urlObj.query;
            var newUrl = urlObj.href + '?' + queryStr + '&user=' + req.user.username;
            console.log(newUrl);
            
            http.get(newUrl,function(response){
                var str = "";
                
                response.on('data', function (chunk) {
                    str += chunk;
                    console.log('Added this data to html = ' + chunk);
                  });
                
                  response.on('end', function () {
                    console.log('recieved all html!')
                    //console.log('html from get = ' + str);
                    // your code here if you want to use the results !
                    
                    
                    var substring = '>Download<';
                    str = str.replace(substring, "><");
                    pdf.render({html:str},function(err,output){
                    //pdf.testPdf({html:str},function(err,output){
                 output.toBuffer(function(returnedBuffer) {
                     
                      res.writeHead(200, {
                        "Content-Disposition": util.format("attachment;filename=%s",name + ".pdf") 
                      
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
        
        app.get("/data/", function(req,res,next){
                
                 
	    res.send('ok');

        
        });
        
        app.get("/report2/", function(req,res,next){
                
                var name = 'test';
                var str = '';
                pdf.testPdf({html:str},function(err,output){
                 output.toBuffer(function(returnedBuffer) {
                     
                      res.writeHead(200, {
                        "Content-Disposition": util.format("attachment;filename=%s",name + ".pdf") 
                      
                      , "Content-Type":util.format("%s","text/pdf")
                          
                      });
              
                     
                     res.end(returnedBuffer);
                    next();
                });                
                
            })
                 
	  

        
        });
       
}

    

    
function saveFile(req,res,next){
    
        var filename = req.headers['filename'];
        var contentType = req.headers['content-type'];
        var id = req.headers['object_id'];
        var docPath = path.resolve('documents');
        var dateTimeStr = new Date().getTime().toString();
        var savedFileName = dateTimeStr + '_' + filename ;
        docPath = path.join(docPath, savedFileName);
        var writeStream = fs.createWriteStream(docPath, {flags: 'w'});
        
        req.pipe(writeStream, {end: false});
        
        req.on('end', function () {
            // db save
            var promise = db.saveContractorAttachmentLocation({id: id, filepath: docPath, name: filename, type: contentType, username: req.user.username});
            promise.then(res.end('ok'),res.end('fail'));
            
            });
        
        
    
        /*var temppath = path.resolve('public');
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
            
            });*/
    }
    




})(module.exports);
