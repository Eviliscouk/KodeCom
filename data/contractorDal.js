(function(dal){

var db = require('./mysqlDb.js');
//var sprintf = require('sprintf-js').sprintf;
var util= require("util");
var path = require('path');
var fs = require('fs');

dal.saveContractor=function(param,cb){
    
    /// save to the database
    
    var data =[];
    
    cb(null,data);
}


dal.getContractorList=function(param,cb){
    
    var sql = "select id as c_ID, IF(company_name NOT IN ('', 'NONE', 'None', 'none'), company_name, CONCAT(first_name, ', ', surname)) as displayName from Contractor where (1=1) and (ifnull(deleted,0)=0)";
    sql += param.id != undefined?" or id = " + param.id  : "";
    sql += ";";

    console.log(sql);
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
    cb(null,result);})
    
}



dal.getContractorOld=function(param,cb){
    
    /// save to the database
    var data ='';
    
    if (+param === 1)
        data = '{"c_ID":1,"firstName":"Bob","surname":"Hope","companyName":"Hope Ltd","address":"1 London Rd","town":"Ongar","county":"Essex","postcode":"CM5 9PH","phone":"0208567435","mobPhone":"0796537645","fax":"","email":"bob@hopeltd.co.uk","utr":"UTR","fee":"200","tlcIns":"Yes","payerType":"NettPayer","displayName":"Hope Ltd"}';
    if (+param === 2)
        data = '{"c_ID":2,"firstName":"Bob","surname":"Hope2","companyName":"Hope Ltd","address":"1 London Rd","town":"Ongar","county":"Essex","postcode":"CM5 9PH","phone":"0208567435","mobPhone":"0796537645","fax":"","email":"bob@hopeltd.co.uk","utr":"UTR","fee":"200","tlcIns":"Yes","payerType":"NettPayer","displayName":"Hope Ltd"}';
    if (+param === 3)    
        data = '{"c_ID":3,"firstName":"Bob","surname":"Hope3","companyName":"Hope Ltd","address":"1 London Rd","town":"Ongar","county":"Essex","postcode":"CM5 9PH","phone":"0208567435","mobPhone":"0796537645","fax":"","email":"bob@hopeltd.co.uk","utr":"UTR","fee":"200","tlcIns":"Yes","payerType":"NettPayer","displayName":"Hope Ltd"}';
    if (+param === 4)    
        data = '{"c_ID":4,"firstName":"Bob","surname":"Hope4","companyName":"Hope Ltd","address":"1 London Rd","town":"Ongar","county":"Essex","postcode":"CM5 9PH","phone":"0208567435","mobPhone":"0796537645","fax":"","email":"bob@hopeltd.co.uk","utr":"UTR","fee":"200","tlcIns":"Yes","payerType":"NettPayer","displayName":"Hope Ltd"}';
    // connect to database
    //fire sql
    // return records
    
    cb(null,data);
}

dal.getContractor=function(param,cb){
    
    var sql = "select id as c_ID,company_name as companyName,first_name as firstName,surname,address,town,county,";
    sql +="postCode as postcode,phone,mobile as mobPhone,fax,email,utr,tlcins as tlcIns,payer_type as payerType, fee,";
    sql +="IF(company_name NOT IN ('', 'NONE', 'None', 'none'), company_name, CONCAT(first_name, ', ', surname)) as displayName from Contractor ";
    if ( param.id)
    
     sql += util.format(" where  (id =%d) %s ",param.id," limit 1;");
     
     else
     sql += "limit 1;";
    
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
   cb(null,result[0]);
});

}

dal.getContractorNotes=function(param,cb){
    
    var sql = "select id as n_ID,notes as text,dated as n_date";
    sql +=" from Documents ";
    if ( param.id)
     sql += util.format(" where  (object_id =%d and object_type = 'contractor' and notes > '') order by dated desc",param.id);
     
     else
     sql = "";
    
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
   cb(null, result);
});

}

dal.getContractorAttachments=function(param,cb){
    
    var sql = "select id,display_name as fileName, dated as a_date";
    sql +=" from Documents ";
     sql += util.format(" where  (object_id =%d and object_type = 'contractor' and link is not null) order by dated desc",param.id);
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
   cb(null, result);
});

}

dal.getContractorAttachment=function(param,cb){
    
    var sql = "select display_name as fileName,doctype,link";
    sql +=" from Documents ";
     sql += util.format(" where id = %s;",param.id);
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
   cb(null, result);
});

}


dal.saveContractorAttachmentLocation=function(param){
   
    console.log('saving attachment');
    console.log(param.filepath);
    
    var sql = 'insert into Documents SET ?';
    
    console.log(param.filepath);
    
    var vals = {
      object_id: param.id,
      object_type: 'contractor',
      display_name: param.name,
      
      doctype: param.type,
      link: param.filepath
     //content: fs.readFileSync(param.filepath, null)
      
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

dal.saveContractorAttachment=function(param){
   
    console.log('saving attachment');
    console.log(param.filepath);
    
    var sql = 'insert into Documents SET ?';
    
    console.log(param.filepath);
    
    var vals = {
      object_id: param.id,
      object_type: 'contractor',
      display_name: param.name,
      
      doctype: param.type,
     content: fs.readFileSync(param.filepath, null)
      
    };
    
    console.log("db script: %s",sql);
    
    return new Promise(function(resolve, reject){
     
        db.runWithValues({sql:sql, values: vals},function(err,result){
        fs.unlink(param.filepath);
        
            if(err) 
                reject("fail");
            else
                resolve("ok");
        }); 
    });
}

dal.saveContractorNote=function(param,cb){
    
    var sql ='';
    sql = "insert into Documents(object_id, object_type, notes)";
    sql +=" values (";
    
    sql += util.format("'%s','contractor','%s');",param.c_ID, param.text);
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
   cb(null,"ok");
});
}

dal.lockPayroll=function(param,cb){
    
    var sql ='';
    sql = "UPDATE Payroll SET locked = -1 ";
    sql += util.format("WHERE contractor_id = %s ", param.id);
    sql += util.format("and payment_date between STR_TO_DATE(%s,", param.fromDate);
    sql += "'%d/%m/%Y') and STR_TO_DATE(";
    sql += util.format("%s,", param.toDate);
    sql += "'%d/%m/%Y');";
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
   cb(null,"ok");
});

}

dal.saveContractor=function(param,cb){
    var sql ='';
   
    if (!param.id)
    {
        /*
        {"companyName":"Mallet Construction Limited new","firstName":"Deborah",
        "surname":"Mallet","address":"21 Wilkinson CloseEaton Socon",
        "town":"St Neots","county":"Cambridgeshire","postcode":"PE19 8HJ",
        "phone":"01480 219316","mobPhone":"07885883213","fax":"07885883213",
        "email":"deborah.mallet@btconnect.com","utr":"7721008666","tlcIns":5,"fee":"20","payerType":"Net Payer"}

  */
    sql = "insert into Contractor(company_name,first_name,surname,address,town,county,";
    sql +="postCode,phone,mobile,fax,email,utr,tlcins,payer_type, fee";
    sql +=") values (";
    
    
    
    sql += util.format("'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');"
    ,param.companyName,	param.firstName,	param.surname,	param.address,	param.town,	param.county,	param.postcode,	param.phone,
    param.mobPhone,param.fax,	param.email,	param.utr,	param.tlcIns,	param.payerType, 	param.fee
    );
    
    }
    
    else
    {
        sql = "update Contractor set ";
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
        sql += util.format("tlcins='%s',",param.tlcIns);
        sql += util.format("payer_type='%s',",param.payerType);
        sql += util.format("fee='%s'",param.fee);
	    
	    sql += util.format(" where id=%d",param.id);
        
    }
    console.log("db script: %s",sql);
    
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
   cb(null,"ok");
});

}


dal.deleteContractorAttachment=function(param,cb){
    
    getContractorAttachmentFilePath(param, function(err,result) {
        if (err) return cb(err);
        
            var sql ='';
            sql = util.format("delete from Documents where id = %s; ", param.id);
            console.log("db script: %s",sql);
            
            db.run({sql:sql},function(err,data){
                         fs.unlink(result.link);           
                        if(err) return cb(err);
            
                        cb(null,"ok");
           
        });
    });
};

var getContractorAttachmentFilePath=function(param,cb){
    
    var sql = "select link";
    sql +=" from Documents ";
     sql += util.format(" where id = %s;",param.id);
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
   cb(null, result[0]);
});

}

dal.deleteContractor=function(param,cb){
    var sql ='';
   
    if (param.id)
    {
       
   
        sql = "update Contractor set ";
        sql += util.format("deleted='%s',",1);
        sql += "deleted_datetime=now()";
        
	    
	    sql += util.format(" where id=%d",param.id);
        
    }
    console.log("db script: %s",sql);
    
    db.run({sql:sql},function(err,result){
    if(err) return cb(err);
   cb(null,"ok");
});

}

}

(module.exports));