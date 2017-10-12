(function(dal){

var db = require('./mysqlDb.js');
var util= require("util");

dal.getContractorIds=function(){
    
    var sql = "select id from Contractor Where Coalesce(deleted, 0) = 0";
    console.log(sql);
    
    return new Promise((resolve,reject)=>{
    
        db.run({sql:sql},function(err,result){
        if(err) return reject(err);
        resolve(result);
            
        });  
}); 

}

dal.getSubContractorIds=function(){
    
    var sql = "select id from SubContractor limit 1";
    console.log(sql);
    
    return new Promise((resolve,reject)=>{
    
        db.run({sql:sql},function(err,result){
        if(err) return reject(err);
        resolve(result);
            
        });  
}); 

}

dal.CreateBatchRecord=function(param){
    
    var sql = util.format("insert into Batch(id, dated, fileName, username, isComplete) values(null, null, '%s', '%s', 0);", param.file, param.username);
    console.log(sql);
    
    return new Promise((resolve,reject)=>{
    
        db.run({sql:sql},function(err,result){
        if(err) return reject(err);
        resolve(result);
            
        });  
}); 
}

dal.UpdateBatchRecord=function(param){
    
    var sql = util.format("Update Batch set isComplete = 1 where fileName = '%s'", param.zipName);
    console.log(sql);
    
    return new Promise((resolve,reject)=>{
    
        db.run({sql:sql},function(err,result){
        if(err) return reject(err);
        resolve(result);
            
        });  
}); 

}

dal.getSubContractorAnnualIds=function(param){
    
    var sql = util.format("select DISTINCT subcontractor_id as id from Payroll where payment_date is not null and payment_date >= DATE_SUB(STR_TO_DATE('%s','%d-%m-%Y'),INTERVAL 1 YEAR)", param.yearEnd);
    console.log(sql);
    
    return new Promise((resolve,reject)=>{
    
        db.run({sql:sql},function(err,result){
        if(err) return reject(err);
        resolve(result);
            
        });  
}); 

}

dal.getContarctorIdsForPaymentDate=function(param){
    
    var sql = "select DISTINCT contractor_id as id from Payroll where DATE_FORMAT(payment_date, '%d-%m-%Y')";
    sql += util.format("= '%s' order by subcontractor_id", param.paymentDate);
    console.log(sql);
    
    return new Promise((resolve,reject)=>{
    
        db.run({sql:sql},function(err,result){
        if(err) return reject(err);
        resolve(result);
            
        });  
}); 

}

dal.getSubContarctorIdsForMonthlyStat=function(param){
    
    var sql = "select DISTINCT subcontractor_id as id from Payroll where  payment_date IS NOT NULL AND payment_date BETWEEN ";
    sql += util.format("STR_TO_DATE('%s',", param.monthStart);
    sql += "'%d-%m-%Y') AND STR_TO_DATE(";
    sql += util.format("'%s',", param.monthEnd);
    sql += "'%d-%m-%Y');";
    
    console.log(sql);
    
    return new Promise((resolve,reject)=>{
    
        db.run({sql:sql},function(err,result){
        if(err) return reject(err);
        resolve(result);
            
        });  
}); 

}

dal.getContarctorIdsForMonthlyReturn=function(param){
    
     var splitDate = param.monthEnd.split('-');
    var month = splitDate[1] - 1;
    var monthEnd = new Date(splitDate[2], month, splitDate[0]);
    
    var dd = monthEnd.getDate();
    var mm = monthEnd.getMonth()+1; 
    var yyyy = monthEnd.getFullYear();
    if(dd<10) 
        dd='0'+dd;
    if(mm<10) 
     mm='0'+mm;
     
    var monthEndStr = dd+'/'+mm+'/'+yyyy;
     
    var monthStart = new Date(monthEnd);
    monthStart.setMonth(monthStart.getMonth() - 1);
     
    dd = monthStart.getDate();
    mm = monthStart.getMonth()+1; 
    yyyy = monthStart.getFullYear();
    if(dd<10) 
        dd='0'+dd;
    if(mm<10) 
     mm='0'+mm;
     
    var monthStartStr = dd+'/'+mm+'/'+yyyy;
     
    var sql = "select DISTINCT contractor_id as id from Payroll ";
    sql += util.format("WHERE contractor_id = %d AND payment_date BETWEEN ",  param.id);
    sql += util.format("STR_TO_DATE('%s',", monthStartStr);
    sql += "'%d/%m/%Y') AND STR_TO_DATE(";
    sql += util.format("'%s',", param.monthEnd);
    sql += "'%d-%m-%Y')";

    console.log(sql);
    
    return new Promise((resolve,reject)=>{
    
        db.run({sql:sql},function(err,result){
        if(err) return reject(err);
        resolve(result);
            
        });  
}); 

}


dal.getPayrollIds=function(param){
    
    var sql = "select id from Payroll where DATE_FORMAT(payment_date, '%d-%m-%Y')";
    sql += util.format("= '%s' order by subcontractor_id", param.paymentDate);
    console.log(sql);
    
    return new Promise((resolve,reject)=>{
    
        db.run({sql:sql},function(err,result){
        if(err) return reject(err);
        resolve(result);
            
        });  
}); 

}

dal.getContractorEmailAddressById=function(param){
    
    var sql = util.format("select email from Contractor where id =%s limit 1;",param.id);
    console.log(sql);
    
    return new Promise((resolve,reject)=>{
    
        db.run({sql:sql},function(err,result){
        if(err) return reject(err);
    
        resolve(result[0]);
        
            
        });  
}); 

}

dal.getSubContractorEmailAddressById=function(param){
    
    var sql = util.format("select email from SubContractor where id =%s limit 1;",param.id);
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