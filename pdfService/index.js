
(function(service){
    var pdf = require("../helper/pdf.js");
    var _app;
    service.init=function(app){
        
        _app = app;
    }
    var t = setInterval(function(){
        
    pollPdfQueue().then(function(){
        
       // next item 
        
    }).catch(function(err){
        
        //clearInterval(t);
        console.log(err);
        
    })
        
        
    },5 * 1000)
    
    
    
function pollPdfQueue(){
    return new Promise(function(fullfil, reject){
    try {
        
        var option = _app.get('pdfQueue').pop();
        if (option){
            
            pdf.saveAsPdf(option).then(function(filename){
                return fullfil(filename);
                
            }).catch(function(err){
                return reject(err);
                
            });
        }
        
        
    } catch (e) {
        
        reject(e);
    }
    
    
        
        
    });
    
    
}    
})(module.exports)