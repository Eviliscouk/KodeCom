(function(dal){

var db = require('./mysqlDb.js');
//var sprintf = require('sprintf-js').sprintf;
var util= require("util");
var path = require('path');
var fs = require('fs');
var vals = require("./const.js");


dal.getContractorData=function(param,cb){
    
    var sql = "select * from Contractor;";
    
    db.run({sql:sql,username:param.username},function(err,result){
    if(err) return cb(err);
   cb(null,result);
});

}

dal.getSubContractorData=function(param,cb){
    
    var key = vals.values['sqlKeyStr'];
    var sql = "select *, ";
    sql += util.format("CAST(AES_DECRYPT(bankAccount, '%s') as CHAR(50)) as bankAcc, ",key);
    sql += util.format("CAST(AES_DECRYPT(bankSortCode, '%s') as CHAR(50)) as bankSrt from SubContractor;",key);
    
    db.run({sql:sql,username:param.username},function(err,result){
    if(err) return cb(err);
   cb(null,result);
});

}

dal.getContractorWeeklyRemittanceData=function(param,cb){
    
    var key = vals.values['sqlKeyStr'];
    var splitDate = param.paymentDate.split('-');
    var month = splitDate[1] - 1;
    var paymentDate = new Date(splitDate[2], month, splitDate[0]);
    
    var d = new Date(paymentDate.getFullYear(), paymentDate.getMonth(), paymentDate.getDate());
    var weekEnding = new Date(d.setDate(d.getDate()-d.getDay()));
    weekEnding.setDate(weekEnding.getDate() -1); //last Saturday
         
    var period = weekEnding.getFullYear() - 1 + "/" + weekEnding.getFullYear();

    var dd = paymentDate.getDate();
    var mm = paymentDate.getMonth()+1; 
    var yyyy = paymentDate.getFullYear();
    if(dd<10) 
        dd='0'+dd;
    if(mm<10) 
     mm='0'+mm;
     
    var paymentDateStr = dd+'/'+mm+'/'+yyyy;
    
    dd = weekEnding.getDate();
    mm = weekEnding.getMonth()+1; 
    yyyy = weekEnding.getFullYear();
    if(dd<10) 
        dd='0'+dd;
    if(mm<10) 
     mm='0'+mm;
     
    var weekEndingStr = dd+'/'+mm+'/'+yyyy;
    
    var sql = util.format("select 'Contractor Weekly Remittance' as title, '%s' as WeekEnding, ", weekEndingStr);
    sql += util.format("'%s' as PaymentDate, ", paymentDateStr);
    sql += util.format("'%s' as Period,", period);
    sql +="IF(con.company_name NOT IN ('', 'NONE', 'None', 'none'), con.company_name, CONCAT(con.first_name, ', ', con.surname)) as con_displayName,";
    sql +="con.company_name as con_companyName, con.first_name as con_firstName,con.surname as con_surname,con.address as con_address,con.town as con_town, con.county as con_county,";
    sql +="con.postCode as con_postcode, con.email as con_email, con.tlcins as con_tlcIns ";
    sql +="from Contractor AS con ";
    sql += util.format("Where id = %d;", param.id);
    
    sql += "Select pay.subcontractor_id as subId, (select jobRef from ContractorJobs Where id = pay.jobId limit 1) as jobRef, sub.mobile as sub_ContactNumber, pay.week_ending as week_ending, pay.payment_date as payment_date, pay.month_ending_date as month_ending_date, pay.deduction_rate, pay.vat_rate, (select jobRef from ContractorJobs where id = pay.jobId) as sub_currentJobRef, "
    sql += "(pay.gross + pay.materials) as gross, pay.fee as fee, pay.materials as materials, pay.gross as taxable, COALESCE((select(select SUM(amount) from tblPayrollDeductions where payroll_id = pay.id)),0) as deductionTotal, "
    sql += "IF(sub.company_name NOT IN ('', 'NONE', 'None', 'none'), sub.company_name, CONCAT(sub.first_name, ', ', sub.surname)) as sub_displayName, "
    sql += "sub.verification_no as sub_verificationNo, pay.vat_rate as vat_rate, "
    sql += util.format("CAST(AES_DECRYPT(sub.bankAccount, '%s') as CHAR(50)) as bankAccount, ",key);
    sql += util.format("CAST(AES_DECRYPT(sub.bankSortCode, '%s') as CHAR(50)) as bankSortCode ",key);
    sql +="from Payroll as pay ";
    sql +="INNER JOIN SubContractor AS sub ON pay.subcontractor_id = sub.id ";
    sql +="WHERE DATE_FORMAT(payment_date, '%d-%m-%Y')";
    sql += util.format("= '%s' and pay.contractor_id = %d and (pay.jobId = %d or %d = 0);", param.paymentDate, param.id, param.jobId, param.jobId);
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql,username:param.username},function(err,result){
    if(err) return cb(err);
   cb(null,result);
});

}

dal.getContractorMonthlyReturnData=function(param,cb){
    
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
     
    var sql = util.format("select 'Contractor Monthly Return' as title, '%s' as monthEnd, ", monthEndStr);
    sql +="IF(con.company_name NOT IN ('', 'NONE', 'None', 'none'), con.company_name, CONCAT(con.first_name, ', ', con.surname)) as con_displayName,";
    sql +="con.utr as con_taxRef ";
    sql +="from Contractor AS con ";
    sql += util.format("Where id = %d;", param.id);
    
    sql += "Select pay.subcontractor_id as subId, ";
    sql += "IF(sub.company_name NOT IN ('', 'NONE', 'None', 'none'), sub.company_name, CONCAT(sub.first_name, ', ', sub.surname)) as sub_displayName, "
    sql += "sub.verification_no as sub_verificationNo, sub.utr as sub_utr, sub.nino as sub_nino, CONCAT('£', FORMAT((SUM(pay.gross) - SUM(pay.materials)) * sub.deduction_rate/100,2)) as total_taxDeducted, CONCAT('£', FORMAT(SUM(pay.gross),2)) as total_payments, CONCAT('£', FORMAT(SUM(pay.materials), 2)) as total_materials "
    sql +="from Payroll as pay ";
    sql +="INNER JOIN SubContractor AS sub ON pay.subcontractor_id = sub.id ";
    sql += util.format("WHERE pay.contractor_id = %d AND (pay.jobId = %d OR %d = 0) AND pay.payment_date BETWEEN ",  param.id, param.jobId, param.jobId);
    sql += util.format("STR_TO_DATE('%s',", monthStartStr);
    sql += "'%d/%m/%Y') AND STR_TO_DATE(";
    sql += util.format("'%s',", param.monthEnd);
    sql += "'%d-%m-%Y') GROUP BY pay.subcontractor_id;";
    
    sql += "Select CONCAT('£', FORMAT(SUM(pay.gross),2)) as totalPayments, CONCAT('£', FORMAT(SUM((pay.gross - pay.materials) * sub.deduction_rate/100),2)) as totalTaxDeducted, CONCAT('£', FORMAT(SUM(pay.materials),2)) as totalMaterials "
    sql +="from Payroll as pay ";
    sql +="INNER JOIN SubContractor AS sub ON pay.subcontractor_id = sub.id ";
    sql += util.format("WHERE pay.contractor_id = %d AND (pay.jobId = %d OR %d = 0) AND pay.payment_date BETWEEN ",  param.id, param.jobId, param.jobId);
    sql += util.format("STR_TO_DATE('%s',", monthStartStr);
    sql += "'%d/%m/%Y') AND STR_TO_DATE(";
    sql += util.format("'%s',", param.monthEnd);
    sql += "'%d-%m-%Y');";
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql,username:param.username},function(err,result){
    if(err) return cb(err);
   cb(null,result);
});

}

dal.getSubcontractorInvoiceData=function(param,cb){
    
    var sql = "select 'Subcontractor Invoice' as title, DATE_FORMAT(pay.week_ending, '%d/%m/%Y') as pay_week_ending, CONCAT('£', FORMAT(pay.gross, 2)) as pay_gross, CONCAT('£', FORMAT(pay.materials, 2)) as pay_materials, CONCAT('£', FORMAT((pay.materials + pay.gross), 2)) as pay_total,";
    sql +="CONCAT('£', FORMAT((pay.materials + pay.gross) * (pay.vat_rate / 100), 2)) as pay_vat, CONCAT('£', FORMAT(((pay.materials + pay.gross) + (pay.materials + pay.gross) * (pay.vat_rate / 100)), 2)) as pay_totalWithVat, ";
    sql +="sub.id as s_Id, sub.contractor_id as c_Id, sub.company_name as sub_companyName,sub.first_name as sub_firstName,sub.surname as sub_surname,sub.address as sub_address,sub.town as sub_town, sub.county as sub_county,";
    sql +="sub.postCode as sub_postcode, sub.email as sub_email, sub.services as sub_services,";
    sql +="IF(sub.company_name NOT IN ('', 'NONE', 'None', 'none'), sub.company_name, CONCAT(sub.first_name, ', ', sub.surname)) as sub_displayName,";
    sql +="IF(con.company_name NOT IN ('', 'NONE', 'None', 'none'), con.company_name, CONCAT(con.first_name, ', ', con.surname)) as con_displayName,";
    sql +="con.company_name as con_companyName,con.first_name as con_firstName,con.surname as con_surname,con.address as con_address,con.town as con_town, con.county as con_county,";
    sql +="con.postCode as con_postcode, con.email as con_email ";
    sql +="from Payroll AS pay ";
    sql +="INNER JOIN Contractor AS con ON pay.contractor_id = con.id ";
    sql +="INNER JOIN SubContractor AS sub ON pay.subcontractor_id = sub.id ";
    sql += util.format(" where  (pay.id =%d) %s",param.id," limit 1;");
    
    //console.log("db script: %s",sql);
    
    db.run({sql:sql,username:param.username},function(err,result){
    if(err) return cb(err);
   cb(null,result[0]);
});

}

dal.getBatchData=function(param,cb){
    
    var sql = "select id, fileName, DATE_FORMAT(dated, '%d/%m/%Y') as dated, CASE WHEN status = 1 THEN 'In Progress' WHEN status = 2 THEN 'Complete' WHEN status = 3 THEN 'Failed' END AS status, userName from Batch order by id desc";
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql,username:param.username},function(err,result){
    if(err) return cb(err);
   cb(null,result);
});
}

dal.getBatchItem=function(param,cb){
    
    var sql = util.format("select id, fileName from Batch where id = %s limit 1;", param.id);
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql,username:param.username},function(err,result){
    if(err) return cb(err);
   cb(null,result[0]);
});
}

dal.deleteBatch=function(param, cb){
    
    var sql = util.format("delete from Batch where id = %s;", param.id);
    console.log(sql);
    
    return new Promise((resolve,reject)=>{
    
        db.run({sql:sql,username:param.username},function(err,result){
        if(err) return reject(err);
        resolve(result);
            
        });  
}); 
};

dal.subContractorMonthlyStatement=function(param,cb){
    
    var sql ="select 'Monthly Statement' as title, ";
	sql +="sub.id as s_Id, sub.contractor_id as c_Id, sub.company_name as sub_companyName,sub.first_name as sub_firstName,sub.surname as sub_surname,sub.address as sub_address,sub.town as sub_town, sub.county as sub_county, sub.utr as sub_utr, sub.nino as sub_nino, ";
	sql += "sub.postCode as sub_postcode, sub.email as sub_email, sub.services as sub_services,";
	sql += util.format("DATE_FORMAT(STR_TO_DATE('%s',", param.monthEnd);
	sql += "'%d-%m-%Y'), '%d/%m/%Y') as monthEnd, ";
	sql += "IF(sub.company_name NOT IN ('', 'NONE', 'None', 'none'), sub.company_name, CONCAT(sub.first_name, ', ', sub.surname)) as sub_displayName,";
	sql += "IF(con.company_name NOT IN ('', 'NONE', 'None', 'none'), con.company_name, CONCAT(con.first_name, ', ', con.surname)) as con_displayName, ";
	sql += "con.company_name as con_companyName,con.first_name as con_firstName,con.surname as con_surname,con.address as con_address,con.town as con_town, con.county as con_county,";
    sql += "con.postCode as con_postcode, con.email as con_email, con.utr as con_utr ";
	sql += "from SubContractor AS sub ";
	sql += "INNER JOIN Contractor AS con ";
	sql += "ON sub.contractor_id = con.id ";
	
    sql += util.format("where (sub.id =%d) limit 1 ; ",param.id );
    
    sql += util.format("SELECT CONCAT('£', FORMAT(SUM(gross), 2)) as gross, CONCAT('£', FORMAT(SUM(materials), 2)) as materialCost, CONCAT('£', FORMAT(SUM((gross - materials)*deduction_rate/100), 2)) as tax, CONCAT('£', FORMAT(SUM(gross) - SUM(materials), 2)) as nett, CONCAT('£', FORMAT(SUM(gross) - SUM((gross - materials)*deduction_rate/100), 2)) as payable FROM Payroll WHERE subcontractor_id = %d and (jobId = %d or %d = 0) AND payment_date IS NOT NULL AND payment_date BETWEEN ",param.id, param.jobId, param.jobId);
    sql += util.format("STR_TO_DATE('%s',", param.monthStart);
    sql += "'%d-%m-%Y') AND STR_TO_DATE(";
    sql += util.format("'%s',", param.monthEnd);
    sql += "'%d-%m-%Y');";
    
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql,username:param.username},function(err,result){
    
    if(err) 
    return cb(err);

   cb(null,result);
});

}

dal.getKodeComAnnualInvoiceData=function(param,cb){
    
    var sql ="select 'Annual Invoice' as title, DATE_FORMAT(CURDATE(), '%d/%m/%Y') as today, ";
	sql +="sub.id as s_Id, sub.contractor_id as c_Id, sub.company_name as sub_companyName,sub.first_name as sub_firstName,sub.surname as sub_surname,sub.address as sub_address,sub.town as sub_town, sub.county as sub_county,";
	sql +=util.format("sub.postCode as sub_postcode, sub.email as sub_email, sub.services as sub_services, '%s' as yearEnd, ", param.yearEnd);
	sql += "IF(sub.company_name NOT IN ('', 'NONE', 'None', 'none'), sub.company_name, CONCAT(sub.first_name, ', ', sub.surname)) as sub_displayName,";
	sql += "IF(con.company_name NOT IN ('', 'NONE', 'None', 'none'), con.company_name, CONCAT(con.first_name, ', ', con.surname)) as con_displayName ";
	sql += "from SubContractor AS sub ";
	sql += "INNER JOIN Contractor AS con "
	sql += " ON sub.contractor_id = con.id ";
    sql += util.format("where (sub.id =%d) limit 1 ; ",param.id );
    
    sql += util.format("Select count(id) as count, fee as unitPrice, sum(fee) as total FROM Payroll WHERE subcontractor_id = %d AND (jobId = %d or %d = 0) AND payment_date IS NOT NULL and payment_date >= DATE_SUB(STR_TO_DATE('%s','%d-%m-%Y'),INTERVAL 1 YEAR) group by fee; ", param.id, param.jobId, param.jobId, param.yearEnd);
    
    sql += "select own.owner_name as own_name,own.address as own_address,own.town as own_town, own.county as own_county, own.postCode as own_postcode, own.telUK as own_telUK, own.faxUK as own_faxUK ";
    sql += "from Owner as own limit 1;";
    
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql,username:param.username},function(err,result){
    
    if(err) 
    return cb(err);

   cb(null,result);
});

}

}

(module.exports));