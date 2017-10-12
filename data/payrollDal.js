(function(dal){

var db = require('./mysqlDb.js');
//var sprintf = require('sprintf-js').sprintf;
var util= require("util");


dal.getPayrollForSubContractor=function(param,cb){

    var sql ='';
    sql = util.format("select id as p_ID, contractor_id as c_ID, subcontractor_id as s_ID, week_ending as weekEnding, payment_date as paymentDate, month_ending_date as monthEndingDate, deduction_rate as deductionRate, vat_rate as vatRate, gross, fee, materials, locked from Payroll where subcontractor_id = %s;", param.id);

    console.log(sql);
    
    db.run({sql: sql},function(err,result){
    if(err) return cb(err);
    cb(null,result);})
}

dal.getPayroll=function(param,cb){
    
    var cmd = util.format("select id as p_ID, contractor_id as c_ID, subcontractor_id as s_ID, week_ending as weekEnding, payment_date as paymentDate, month_ending_date as monthEndingDate, deduction_rate as deductionRate, vat_rate as vatRate, gross, fee, materials, locked from Payroll where id = %s order by payment_date desc;", param.id);
    console.log(cmd);
    db.run({sql:cmd},function(err,result){
    if(err) return cb(err);
   cb(null,result[0]);
})

}

dal.getPayrollDeductions=function(param,cb){
    
    var sql = "select id, payroll_id, description,amount";
    sql +=" from tblPayrollDeductions ";
    if ( param.id)
     sql += util.format(" where  (payroll_id =%s and description > '') order by dated desc",param.id);
     
     else
     sql = "";
    
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
   cb(null, result);
});

}

dal.deletePayrollDeduction=function(param,cb){
    
    var sql ='';
            sql = util.format("delete from tblPayrollDeductions where id = %s; ", param.id);
            console.log("db script: %s",sql);
            
            db.run({sql:sql},function(err,data){
                        if(err) return cb(err);
            
                        cb(null,"ok");
});
}

dal.savePayroll=function(param,cb){
    var sql ='';
   
    if (!param.id)
    {
        
    sql = "insert into Payroll(contractor_id, subcontractor_id, week_ending, payment_date, month_ending_date, deduction_rate, vat_rate,";
    sql +="gross, fee, materials, locked) values (";
    
    sql += util.format("'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');",
    param.cid ,param.sid, param.weekEnding, param.paymentDate, param.monthEndingDate,param.deductionRate, param.vatRate,	param.gross, param.fee,
    param.materials, param.locked);
    }
    
    else
    {
        sql = "update Payroll set ";
        sql += util.format("week_ending='%s',",param.weekEnding);
        sql += util.format("payment_date='%s',",param.paymentDate);
        sql += util.format("month_ending_date='%s',",param.monthEndingDate);
        sql += util.format("deduction_rate='%s',",param.deductionRate);
        sql += util.format("vat_rate='%s',",param.vatRate);
        sql += util.format("gross='%s',",param.gross);
        sql += util.format("fee='%s',",param.fee);
        sql += util.format("materials='%s',",param.materials);
        sql += util.format("locked='%s'",param.locked);
	    
	    sql += util.format(" where id=%d",param.id);
        
    }
    console.log("db script: %s",sql);
    
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
   cb(null,"ok");
});

}

dal.savePayrollDeduction=function(param,cb){
    
    var sql ='';
    sql = "insert into tblPayrollDeductions(payroll_id, description, amount)";
    sql +=" values (";
    
    sql += util.format("'%s','%s','%s');", param.payroll_id, param.description, param.amount);
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
   cb(null,"ok");
});

}

}

(module.exports));