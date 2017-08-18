(function(dal){

var db = require('./mysqlDb.js');
var util= require("util");

dal.getContractorEmailAddressById=function(param){
    
    var sql = util.format("select email from KodeCom.Contractor where id =%d limit 1;",param.id);
    console.log(sql);
    
    return new Promise((resolve,reject)=>{
    
        db.run({sql:sql},function(err,result){
        if(err) return reject(err);
    
        resolve(result[0]);
        
            
        });  
}); 

}

dal.getSubContractorEmailAddressById=function(param){
    
    var sql = util.format("select email from KodeCom.SubContractor where id =%d limit 1;",param.id);
    console.log(sql);
    
    return new Promise((resolve,reject)=>{
    
        db.run({sql:sql},function(err,result){
        if(err) return reject(err);
    
        resolve(result[0]);
        
            
        });  
}); 

}

}

(module.exports));