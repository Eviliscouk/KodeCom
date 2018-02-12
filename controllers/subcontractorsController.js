(function(subcontractorsController){

    var db = require('../data/subcontractorDal.js')
    var path = require('path');
    var fs = require('fs');
    const passport = require('passport');
    
    subcontractorsController.init= function(app){
         setupRoutes(app);    
    };
    

var setupRoutes=function(app){
    
    console.log("setting up subcontractors routes");
    
       app.get("/api/subcontractors/get/",passport.authenticationMiddleware(),function(req,res){
           
           console.log("getting subcontractors");
           const dal = require("../data");
           
           res.write(dal.getSubContractors());
           res.end();
        }); 
        
        app.get("/api/subcontractors/getContractorId/:id",passport.authenticationMiddleware(),function(req,res){
           
            var params=req.params;
            params.username = req.user.username;
           
           db.getSubContractorContractorId(params,function(err,data){
               
               if(err)
               res.send(err);
               else

                res.send(data);
    
        });
           
        });
        
        app.get("/api/subContractorNameById/get/:id/:active?",function(req,res){
             var params=req.params;
             if (req.user)
                params.username = req.user.username;
            else 
                console.log('no user on request')
            
            console.log('getting sub contractors - requested by ' + params.username)
           db.getSubContractorList(params,function(err,data){
               
               if(err)
               res.send(err)
               else

                res.send(data);
    
        });
           
        });
        
        app.get("/api/subcontractor/get/:id",passport.authenticationMiddleware(),function(req,res){
        
           var params=req.params;
            params.username = req.user.username;
           db.getSubContractor(params, function(err,data){
           
           if(err)
           res.send(err)
           else
        
            res.send(data);
        
        });
        });
        
        app.get("/api/SubContractorNote/get/:id",passport.authenticationMiddleware(),function(req,res){
        var params=req.params;
            params.username = req.user.username;
        db.getSubContractorNotes(params,function(err,data){
           
           if(err)
           res.send(err)
           else
        
            res.send(data);
        
        });
        
        });
        
        app.post("/api/SubContractor/save/",passport.authenticationMiddleware(),function(req,res){
        console.log('saving..');
        var params=req.body;
            params.username = req.user.username;
        db.saveSubContractor(params,function(err,data){
           
           if(err)
           res.send(err)
           else
        
            res.send(data);
        
        });
        });
        
        app.post("/api/SubContractorNote/save/",passport.authenticationMiddleware(),function(req,res){
            var params=req.body;
            params.username = req.user.username;
        db.saveSubContractorNote(params,function(err,data){
           
           if(err)
           res.send(err)
           else
        
            res.send(data);
        
        });
        //res.send("ok");
        
        });
        
        app.post("/api/SubContractor/delete/",passport.authenticationMiddleware(),function(req,res){
        console.log('deleting..');
        var params=req.body;
            params.username = req.user.username;
        db.deleteSubContractor(params,function(err,data){
           
           if(err)
           res.send(err)
           else
        
            res.send(data);
        
        });
        
        
        
        });
        
        app.get("/api/subcontractorAttachments/get/:id",passport.authenticationMiddleware(),function(req,res){
        var params=req.params;
            params.username = req.user.username;
        db.getSubContractorAttachments(params,function(err,data){
           
           if(err)
           res.send(err)
           else
        {
        console.log(data);
            res.send(data);
        }
        
        });
        
        });
        
        app.post("/api/subcontractorAttachment/delete/",passport.authenticationMiddleware(),function(req,res){
        console.log('deleting..');
        var params=req.body;
            params.username = req.user.username;
        db.deleteSubContractorAttachment(params,function(err,data){
           
           if(err)
           res.send(err)
           else
        
            res.send(data);
        
        });
        });
        
        app.post("/api/subcontractorAttachment/save/",passport.authenticationMiddleware(),saveFile);
    
}

function saveFile(req,res,next){
    
        var filename = req.headers['filename'];
        var contentType = req.headers['content-type'];
        var id = req.headers['object_id'];
        var docPath = path.resolve('documents');
        var dateTimeStr = new Date().getTime().toString();
        var savedFileName = dateTimeStr + '_' + filename;
        docPath = path.join(docPath, savedFileName);
        var writeStream = fs.createWriteStream(docPath, {flags: 'w'});
        
        req.pipe(writeStream, {end: false});
        
        req.on('end', function () {
            // db save
            var promise = db.saveSubContractorAttachmentLocation({id: id, filepath: docPath, name: filename, type: contentType, username: req.user.username});
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