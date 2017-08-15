(function(dal){

var db = require('./mysqlDb.js');
//var sprintf = require('sprintf-js').sprintf;
var util= require("util");

dal.savePayroll=function(param,cb){
    console.log('in saveSubContractor');
    var sql ='';
   
    if (!param.id)
    {
        
    sql = "insert into KodeCom.SubContractor(contractor_id, company_name,first_name,surname,address,town,county,";
    sql +="postCode,phone,mobile,fax,email,utr,nino,verification_no, deduction_rate, vat_rate, services, active, contract_recd";
    sql +=") values (";
    
    
    
    sql += util.format("'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s', '%s', '%s', '%s', '%s');",
    param.cid ,param.companyName,	param.firstName,	param.surname,	param.address,	param.town,	param.county,	param.postCode,	param.phone,
    param.mobPhone,param.fax,	param.email,	param.utr,	param.nino,	param.verificationNo, 	param.deductionRate, param.vatRate, param.services, param.active, param.contractRecd
    );
    
    }
    
    else
    {
        sql = "update KodeCom.SubContractor set ";
        sql += util.format("company_name='%s',",param.companyName);
        sql += util.format("first_name='%s',",param.firstName);
        sql += util.format("surname='%s',",param.surname);
        sql += util.format("address='%s',",param.address);
        sql += util.format("town='%s',",param.town);
        sql += util.format("county='%s',",param.county);
        sql += util.format("postCode='%s',",param.postCode);
        sql += util.format("phone='%s',",param.phone);
        sql += util.format("mobile='%s',",param.mobPhone);
        sql += util.format("fax='%s',",param.fax);
        sql += util.format("email='%s',",param.email);
        sql += util.format("utr='%s',",param.utr);
        sql += util.format("nino='%s',",param.nino);
        sql += util.format("verification_no='%s',",param.verificationNo);
        sql += util.format("deduction_rate='%s',",param.deductionRate);
        sql += util.format("vat_rate='%s',",param.vatRate);
        sql += util.format("services='%s',",param.services);
        sql += util.format("active='%s',",param.active);
        sql += util.format("contract_recd='%s'",param.contractRecd);
	    
	    sql += util.format(" where id=%d",param.id);
        
    }
    console.log("db script: %s",sql);
    
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
   cb(null,"ok");
});

}


dal.getPayrollForSubContractor=function(param,cb){

    var sql ='';
    sql = util.format("select id as p_ID, contractor_id as c_ID, subcontractor_id as s_ID, week_ending as weekEnding, payment_date as paymentDate, month_ending_date as monthEndingDate, deduction_rate as deductionRate, vat_rate as vatRate, gross, fee, materials, locked from KodeCom.Payroll where subcontractor_id = %s;", param.id);

    console.log(sql);
    
    db.run({sql: sql},function(err,result){
    if(err) return cb(err);
    cb(null,result);})
}

dal.getPayroll=function(param,cb){
    
    var cmd = util.format("select id as p_ID, contractor_id as c_ID, subcontractor_id as s_ID, week_ending as weekEnding, payment_date as paymentDate, month_ending_date as monthEndingDate, deduction_rate as deductionRate, vat_rate as vatRate, gross, fee, materials, locked from KodeCom.Payroll where id = %s order by payment_date desc;", param.id);
    console.log(cmd);
    db.run({sql:cmd},function(err,result){
    if(err) return cb(err);
   cb(null,result[0]);
})

}

dal.getPayrollDeductions=function(param,cb){
    
    var sql = "select id, payroll_id, description,amount";
    sql +=" from KodeCom.tblPayrollDeductions ";
    if ( param.id)
     sql += util.format(" where  (payroll_id =%d and description > '') order by dated desc",param.id);
     
     else
     sql = "";
    
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
   cb(null, result);
});

}

dal.savePayroll=function(param,cb){
    var sql ='';
   
    if (!param.id)
    {
        
    sql = "insert into KodeCom.Payroll(contractor_id, subcontractor_id, week_ending, payment_date, month_ending_date, deduction_rate, vat_rate,";
    sql +="gross, fee, materials, locked) values (";
    
    sql += util.format("'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');",
    param.cid ,param.sid,	param.weekEnding, param.paymentDate, param.monthEndingDate,	param.deductionRate, param.vatRate,	param.gross, param.fee,
    param.materials, param.locked);
    }
    
    else
    {
        sql = "update KodeCom.Payroll set ";
        sql += util.format("week_ending='%s',",param.weekEnding);
        sql += util.format("payment_date='%s',",param.paymentDate);
        sql += util.format("month_ending_date='%s',",param.monthEndingDate);
        sql += util.format("deduction_rate='%s',",param.deductionRate);
        sql += util.format("vat_rate='%s',",param.vatRate);
        sql += util.format("gross='%s',",param.gross);
        sql += util.format("fee='%s',",param.materials);
        sql += util.format("materials='%s',",param.totalDeductions);
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
    sql = "insert into KodeCom.tblPayrollDeductions(payroll_id, description, amount)";
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