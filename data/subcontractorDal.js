(function(dal){

var db = require('./mysqlDb.js');
//var sprintf = require('sprintf-js').sprintf;
var util= require("util");
var path = require('path');
var fs = require('fs');

dal.saveSubContractor=function(param,cb){
    console.log('in saveSubContractor');
    var sql ='';
   
    if (!param.id)
    {
        
    sql = "insert into KodeCom.SubContractor(contractor_id, company_name,first_name,surname,address,town,county,";
    sql +="postCode,phone,mobile,fax,email,utr,nino,verification_no, deduction_rate, vat_rate, services, active, contract_recd";
    sql +=") values (";
    
    
    
    sql += util.format("'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s', '%s', '%s', '%s', '%s');",
    param.cid ,param.companyName,	param.firstName,	param.surname,	param.address,	param.town,	param.county,	param.postcode,	param.phone,
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
        sql += util.format("postCode='%s',",param.postcode);
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


dal.getSubContractorList=function(param,cb){

    var sql ='';
    sql = util.format("select id as s_ID, IF(company_name NOT IN ('', 'NONE', 'None', 'none'), company_name, CONCAT(first_name, ', ', surname)) as displayName from KodeCom.SubContractor where contractor_id = %s", param.id);
    
    
    if (param.active && param.active !=2)
    {
        
        sql += util.format(" and active =%d",param.active);
    }
    
    sql += ";";
    console.log(sql);
    
    db.run({sql: sql},function(err,result){
    if(err) return cb(err);
    cb(null,result);})
    
}

dal.getSubContractor=function(param,cb){
    
    var cmd = util.format("select id as s_ID, contractor_id as c_ID, company_name as companyName, IF(company_name NOT IN ('', 'NONE', 'None', 'none'), company_name, CONCAT(first_name, ', ', surname)) as displayName, first_name as firstName,surname,address,town,county,postCode as postcode,phone,mobile as mobPhone,fax,email,utr, nino, verification_no as verificationNo, deduction_rate as deductionRate, vat_rate as vatRate, services, active, contract_recd as contractRecd from KodeCom.SubContractor where id = %s limit 1;", param);
    console.log(cmd);
    db.run({sql:cmd},function(err,result){
    if(err) return cb(err);
   cb(null,result[0]);
})

}

dal.getSubContractorContractorId=function(param,cb){
    
    var cmd = util.format("select contractor_id as c_ID from KodeCom.SubContractor where id = %s limit 1;", param.id);
    console.log(cmd);
    db.run({sql:cmd},function(err,result){
    if(err) return cb(err);
   cb(null,result[0]);
})

}

dal.getSubContractorNotes=function(param,cb){
    
    var sql = "select id as n_ID,notes as text,dated as n_date";
    sql +=" from KodeCom.Documents ";
    if ( param.id)
     sql += util.format(" where  (object_id =%d and object_type = 'subContractor' and notes > '') order by dated desc",param.id);
     
     else
     sql = "";
    
    console.log("db script: %s",sql);
   
    
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
   cb(null, result);
});

}

dal.saveSubContractorNote=function(param,cb){
    
    var sql ='';
    sql = "insert into KodeCom.Documents(object_id, object_type, notes)";
    sql +=" values (";
    
    sql += util.format("'%s','subContractor','%s');",param.s_ID, param.text);
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
   cb(null,"ok");
});

}

dal.deleteSubContractorAttachment=function(param,cb){
    
    getSubContractorAttachmentFilePath(param, function(err,result) {
        if (err) return cb(err);
        
            var sql ='';
            sql = util.format("delete from KodeCom.Documents where id = %s; ", param.id);
            console.log("db script: %s",sql);
            
            db.run({sql:sql},function(err,data){
                         fs.unlink(result.link);           
                        if(err) return cb(err);
            
                        cb(null,"ok");
           
        });
    });
};

var getSubContractorAttachmentFilePath=function(param,cb){
    
    var sql = "select link";
    sql +=" from KodeCom.Documents ";
     sql += util.format(" where id = %s;",param.id);
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
   cb(null, result[0]);
});

}

dal.getSubContractorAttachments=function(param,cb){
    
    var sql = "select id,display_name as fileName, dated as a_date";
    sql +=" from KodeCom.Documents ";
     sql += util.format(" where  (object_id =%d and object_type = 'subcontractor' and link is not null) order by dated desc",param.id);
    
    console.log("db script: %s",sql);
    
    
    
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
   cb(null, result);
});

}

dal.saveSubContractorAttachmentLocation=function(param){
   
    console.log('saving attachment');
    console.log(param.filepath);
    
    var sql = 'insert into KodeCom.Documents SET ?';
    
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
     
        db.runWithValues({sql:sql, values: vals},function(err,result){
        
            if(err) 
                reject("fail");
            else
                resolve("ok");
        }); 
    });
}

}

(module.exports));