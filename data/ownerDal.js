(function(dal){

var db = require('./mysqlDb.js');
//var sprintf = require('sprintf-js').sprintf;
var util= require("util");

dal.saveContractor=function(param,cb){
    
    /// save to the database
    
    var data =[];
    
    cb(null,data);
}


dal.getOwner=function(param,cb){
    
    var sql = "select * from Owner limit 1;";

    console.log(sql);
    db.run({sql:sql,username:param.username},function(err,result){
    if(err) return cb(err);
    cb(null,result[0]);})
    
}



dal.saveOwner=function(param,cb){
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
    sql = "insert into Owner(owner_name,address,town,county,";
    sql +="postcode,country,telUK,faxUK,telOverseas,faxOverseas";
    sql +=") values (";
    
    
    
    sql += util.format("'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');"
    ,param.owner_name.replace(/'/g, "''"), param.address.replace(/'/g, "''"),	param.town.replace(/'/g, "''"),	param.county.replace(/'/g, "''"), param.postcode,	param.country,
    param.telUK,param.faxUK,	param.telOverseas,	param.faxOverseas);
    
    }
    
    else
    {
        sql = "update Owner set ";
        sql += util.format("owner_name='%s',",param.owner_name.replace(/'/g, "''"));
        sql += util.format("address='%s',",param.address.replace(/'/g, "''"));
        sql += util.format("town='%s',",param.town.replace(/'/g, "''"));
        sql += util.format("county='%s',",param.county.replace(/'/g, "''"));
        sql += util.format("postcode='%s',",param.postcode);
        sql += util.format("country='%s',",param.country);
        sql += util.format("telUK='%s',",param.telUK);
        sql += util.format("faxUK='%s',",param.faxUK);
        sql += util.format("telOverseas='%s',",param.telOverseas);
        sql += util.format("faxOverseas='%s'",param.faxOverseas);
	    sql += util.format(" where id=%d;",param.id);
        
    }
    console.log("db script: %s",sql);
    
    db.run({sql:sql,username:param.username},function(err,result){
    if(err) return cb(err);
   cb(null,"ok");
});

}

}

(module.exports));