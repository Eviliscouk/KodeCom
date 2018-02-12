(function(dal){

var db = require('./mysqlDb.js');
//var sprintf = require('sprintf-js').sprintf;
var util= require("util");
var path = require('path');
var fs = require('fs');
var vals = require("./const.js");

dal.saveSubContractor=function(param,cb){
    console.log('in saveSubContractor');
    var sql ='';
    var key = vals.values['sqlKeyStr'];
    var bAccount = util.format("AES_ENCRYPT('%s','%s')", param.bankAccount, key);
    var bSortCode = util.format("AES_ENCRYPT('%s','%s')", param.bankSortCode, key);
   
    if (!param.id)
    {
        
    sql = "insert into SubContractor(contractor_id, company_name,first_name,surname,address,town,county,";
    sql +="postCode,phone,mobile,fax,email,utr,nino,companyRegNo,verification_no, deduction_rate, vat_rate, services, active, contract_recd, bankAccount, bankSortCode, currentJob";
    sql +=") values (";
    
    
    sql += util.format("'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s', '%s', '%s', '%s', '%s', %s, %s, %s);",
    param.cid ,param.companyName.replace(/'/g, "''"),	param.firstName.replace(/'/g, "''"),	param.surname.replace(/'/g, "''"),	param.address.replace(/'/g, "''"),	param.town.replace(/'/g, "''"),	param.county.replace(/'/g, "''"),	param.postcode,	param.phone,
    param.mobPhone,param.fax,	param.email,	param.utr,	param.nino, param.companyRegNo,	param.verificationNo, 	param.deductionRate, param.vatRate, param.services.replace(/'/g, "''"), param.active, param.contractRecd, bAccount, bSortCode, param.currentJob
    );
    
    }
    
    else
    {
        sql = "update SubContractor set ";
        sql += util.format("company_name='%s',",param.companyName.replace(/'/g, "''"));
        sql += util.format("first_name='%s',",param.firstName.replace(/'/g, "''"));
        sql += util.format("surname='%s',",param.surname.replace(/'/g, "''"));
        sql += util.format("address='%s',",param.address.replace(/'/g, "''"));
        sql += util.format("town='%s',",param.town.replace(/'/g, "''"));
        sql += util.format("county='%s',",param.county.replace(/'/g, "''"));
        sql += util.format("postCode='%s',",param.postcode);
        sql += util.format("phone='%s',",param.phone);
        sql += util.format("mobile='%s',",param.mobPhone);
        sql += util.format("fax='%s',",param.fax);
        sql += util.format("email='%s',",param.email);
        sql += util.format("utr='%s',",param.utr);
        sql += util.format("nino='%s',",param.nino);
        sql += util.format("companyRegNo='%s',",param.companyRegNo);
        sql += util.format("verification_no='%s',",param.verificationNo);
        sql += util.format("deduction_rate='%s',",param.deductionRate);
        sql += util.format("vat_rate='%s',",param.vatRate);
        sql += util.format("services='%s',",param.services.replace(/'/g, "''"));
        sql += util.format("active='%s',",param.active);
        sql += util.format("contract_recd='%s',",param.contractRecd);
        sql += util.format("bankAccount=%s,",bAccount);
        sql += util.format("bankSortCode=%s,",bSortCode);
        sql += util.format("currentJob=%s",param.currentJob);
	    
	    sql += util.format(" where id=%d",param.id);
        
    }
    console.log("db script: %s",sql);
    
    db.run({sql:sql,username:param.username},function(err,result){
    if(err) return cb(err);
   cb(null,"ok");
});

}


dal.getSubContractorList=function(param,cb){

    var sql ='';
    sql = util.format("select s.id as s_ID, IF(s.company_name NOT IN ('', 'NONE', 'None', 'none'), s.company_name, CONCAT(s.first_name, ', ', s.surname)) as displayName, s.currentJob, (select jobRef from ContractorJobs where id = s.currentJob) as currentJobRef, s.deduction_rate as deductionRate, s.vat_rate as vatRate, c.fee as fee from SubContractor AS s INNER JOIN Contractor AS c ON s.contractor_id = c.id where contractor_id = %s", param.id);
    
    
    if (param.active && param.active !=2)
    {
        
        sql += util.format(" and active =%d",param.active);
    }
    
    sql += ";";
    console.log(sql);
    
    db.run({sql: sql, username:param.username},function(err,result){
    if(err) return cb(err);
    cb(null,result);})
    
}

dal.getSubContractor=function(param,cb){
    var key = vals.values['sqlKeyStr'];
    var cmd = "select sub.id as s_ID, contractor_id as c_ID, company_name as companyName, IF(company_name NOT IN ('', 'NONE', 'None', 'none'), company_name, CONCAT(first_name, ', ', surname)) as displayName, first_name as firstName,surname,address,town,county,postCode as postcode,phone,mobile as mobPhone,fax,email,utr, nino, companyRegNo, verification_no as verificationNo, deduction_rate as deductionRate, vat_rate as vatRate, services, active, contract_recd as contractRecd, currentJob,  CONCAT(jobs.jobRef, '-', jobs.description) as currentJobDisplay, ";
    cmd += util.format("CAST(AES_DECRYPT(bankAccount, '%s') as CHAR(50)) as bankAccount, ",key);
    cmd += util.format("CAST(AES_DECRYPT(bankSortCode, '%s') as CHAR(50)) as bankSortCode ",key);
    cmd += "from SubContractor as sub ";
    cmd +="LEFT JOIN ContractorJobs AS jobs ON sub.currentJob = jobs.id ";
    cmd += util.format("where sub.id = %s limit 1;", param.id);
    console.log(cmd);
    db.run({sql:cmd,username:param.username},function(err,result){
    if(err) return cb(err);
   cb(null,result[0]);
})

}

dal.getSubContractorContractorId=function(param,cb){
    
    var cmd = "select sub.contractor_id as c_ID, sub.deduction_rate as deductionRate, sub.vat_rate as vatRate, con.fee as fee from SubContractor as sub INNER JOIN Contractor AS con ON sub.contractor_id = con.id ";
    cmd += util.format("where sub.id = %s limit 1;", param.id);
    console.log(cmd);
    db.run({sql:cmd,username:param.username},function(err,result){
    if(err) return cb(err);
   cb(null,result[0]);
})

}

dal.getSubContractorNotes=function(param,cb){
    
    var sql = "select id as n_ID,notes as text,dated as n_date";
    sql +=" from Documents ";
    if ( param.id)
     sql += util.format(" where  (object_id =%d and object_type = 'subContractor' and notes > '') order by dated desc",param.id);
     
     else
     sql = "";
    
    console.log("db script: %s",sql);
   
    
    db.run({sql:sql,username:param.username},function(err,result){
    if(err) return cb(err);
   cb(null, result);
});

}

dal.saveSubContractorNote=function(param,cb){
    
    var sql ='';
    sql = "insert into Documents(object_id, object_type, notes)";
    sql +=" values (";
    
    sql += util.format("'%s','subContractor','%s');",param.s_ID, param.text.replace(/'/g, "''"));
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql,username:param.username},function(err,result){
    if(err) return cb(err);
   cb(null,"ok");
});

}

dal.deleteSubContractor=function(param,cb){
    
    var sql ='';
    
    sql = util.format("delete from Documents where object_id = %s and object_type = 'subContractor'; ", param.id);
    
    sql += util.format("delete from tblPayrollDeductions where payroll_id in (select id from Payroll where subcontractor_id = %s); ", param.id);
    
    sql += util.format("delete from Payroll where subcontractor_id = %s; ", param.id);
    
    sql += util.format("delete from SubContractor where id = %s; ", param.id);
            
   
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql,username:param.username},function(err,result){
    if(err) return cb(err);
   cb(null,"ok");
});
};

dal.deleteSubContractorAttachment=function(param,cb){
    
    getSubContractorAttachmentFilePath(param, function(err,result) {
        if (err) return cb(err);
        
            var sql ='';
            sql = util.format("delete from Documents where id = %s; ", param.id);
            console.log("db script: %s",sql);
            
            db.run({sql:sql,username:param.username},function(err,data){
                         fs.unlink(result.link);           
                        if(err) return cb(err);
            
                        cb(null,"ok");
           
        });
    });
};

var getSubContractorAttachmentFilePath=function(param,cb){
    
    var sql = "select link";
    sql +=" from Documents ";
     sql += util.format(" where id = %s;",param.id);
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql,username:param.username},function(err,result){
    if(err) return cb(err);
   cb(null, result[0]);
});

}

dal.getSubContractorAttachments=function(param,cb){
    
    var sql = "select id,display_name as fileName, dated as a_date";
    sql +=" from Documents ";
     sql += util.format(" where  (object_id =%d and object_type = 'subcontractor' and link is not null) order by dated desc",param.id);
    
    console.log("db script: %s",sql);
    
    
    
    db.run({sql:sql,username:param.username},function(err,result){
    if(err) return cb(err);
   cb(null, result);
});

}

dal.saveSubContractorAttachmentLocation=function(param){
   
    console.log('saving attachment');
    console.log(param.filepath);
    
    var sql = 'insert into Documents SET ?';
    
    console.log(param.filepath);
    
    var vals = {
      object_id: param.id,
      object_type: 'subcontractor',
      display_name: param.name,
      
      doctype: param.type,
      link: param.filepath
      //content: fs.readFileSync(param.filepath)
    };
    
    console.log("db script: %s",sql);
    
    return new Promise(function(resolve, reject){
     
        db.runWithValues({sql:sql, values: vals, username: param.username},function(err,result){
        
            if(err) 
                reject("fail");
            else
                resolve("ok");
        }); 
    });
}

}

(module.exports));