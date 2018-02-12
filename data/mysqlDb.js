(function(db){
    
    
var mysql = require('mysql'),
  dbConfigPrimary = {
  host: "localhost",
  user: "kerrjp",
  password: "",
  database:"KodeCom",
  timezone:"UTC+0",
  multipleStatements: true
},
  dbConfig = {
  host: "localhost",
  user: "kerrjp",
  password: "",
  database:"KodeCom",
  timezone:"UTC+0",
  multipleStatements: true
};


var util=require('../helper/util.js');
   
db.connect=function(){
   
    var con = mysql.createConnection(dbConfig);
    
    con.connect(function(err) {
    if (err) throw err;
        console.log("Connected!");
    });

} 

db.run=function(param,cb){
    
    getUserDbName(param).then(function(db){
        
        dbConfig.database= db[0].name;
        var con = mysql.createConnection(dbConfig);
    
        con.connect();
    
        con.query(param.sql, function (error, results, fields) {
            if (error) return cb(error);
            cb(null,results);
       
        });

    con.end();
        
    })
    .catch(function(err){
        
        console.log(err);
    });
}

db.runWithValues=function(param,cb){
        
        getUserDbName(param).then(function(db){
        
            dbConfig.database= db[0].name;
            var con = mysql.createConnection(dbConfig);
            con.connect();
            console.log(param);
            con.query(param.sql, param.values, function (error, results, fields) {
                if (error) 
                    return cb(error);
                else
                    cb(null,'ok');
            });
     
            con.end();
        });
}
   
db.listDatabases=function(){
    //var sql = "select * from User u inner join core_database where isPrimary=0;";
    var sql = "select * from core_database";
  
    
    return new Promise(function (fullfil,reject){
        
       var con = mysql.createConnection(dbConfigPrimary);
         con.connect();
         
        con.query(sql, function (error, results, fields) {
            
            //console.log(results);
            con.end();
            if (error) return reject(error);
        
            return fullfil(results);
       
            }); 
    });
       
}   

db.listUserDatabases=function(){
    //var sql = "select * from User u inner join core_database where isPrimary=0;";
    
  
    
    return new Promise(function (fullfil,reject){
        
       var sql = "select u.isAdmin,u.id, u.username, d.name, d.id , d.logoUrl, d.displayName  from core_database d inner join User u on d.id = u.databaseId;";
        
       var con = mysql.createConnection(dbConfigPrimary);
         con.connect();
         
        con.query(sql, function (error, results, fields) {
            
            con.end();
            if (error) return reject(error);
        
            return fullfil(results);
       
            }); 
    });
       
}   

db.FailBatches=function(){
    return new Promise(function (fullfil,reject){
        
        var sql = "Update Batch set isComplete = 0, status = 3 where status = 2";
        console.log(sql);
        
       var con = mysql.createConnection(dbConfigPrimary);
         con.connect();
         
        con.query(sql, function (error, results, fields) {
            
            con.end();
            if (error) return reject(error);
            
            con = mysql.createConnection(dbConfigPrimary);
            con.connect();
         
            con.query(sql, function (error, results, fields) {
                con.end();
                if (error) return reject(error);
        
                return fullfil('Updated Failed Batches');
            });
       
            }); 
    });
}   

db.getUserFromDb=function(param){
    //var sql = "select * from User u inner join core_database where isPrimary=0;";
    var sql = "select * from core_database;";
    
    return new Promise(function (fullfil,reject){
        
       var con = mysql.createConnection(dbConfigPrimary);
         con.connect();
         
        con.query(param.sql, function (error, results, fields) {
            
            console.log(results);
            con.end();
            if (error) return reject(error);
        
            return fullfil(results);
       
            }); 
    });
       
}   

db.updateUserDb=function(param){
   
    var sql = "update User set databaseId=" + param.data.databaseId+ " where username='" + param.user.username +"'";
    console.log(sql);
    return new Promise(function (fullfil,reject){
        
       var con = mysql.createConnection(dbConfigPrimary);
         con.connect();
    
        con.query(sql, function (error, results, fields) {
         con.end();
        if (error) return reject(error);
       
        return fullfil(results);
       
}); 


    });
       
} 

function getUserDbName(param){
    
    if (process.params.env =="dev")
        param.username = "jkerr";
    
    var sql = "select * from User u inner join core_database d on u.databaseId = d.id where u.username='" + param.username +"'";
    
    console.log(sql);
    
    return new Promise(function (fullfil,reject){
        
       var con = mysql.createConnection(dbConfigPrimary);
         con.connect();
    
        con.query(sql, function (error, results, fields) {
        
        console.log(JSON.stringify(results));
        
        if (error) return reject(error);
        con.end();
        return fullfil(results);
       
}); 


    });
       
}   

db.listUsers=function (param){
    
    var sql = "select u.id,case when u.isAdmin=1 then 'y' else 'n' end as isAdmin,u.dated,u.last_loggedIn_datetime,u.active,u.first_name,u.surname,u.username,u.password,d.id as databaseId,d.name as database_name from User u inner join core_database d on u.databaseId = d.id";
    
    console.log(sql);
    
    return new Promise(function (fullfil,reject){
        
       var con = mysql.createConnection(dbConfigPrimary);
         con.connect();
    
        con.query(sql, function (error, results, fields) {
        
        console.log(JSON.stringify(results));
        
        if (error) return reject(error);
        con.end();
        return fullfil(results);
       
}); 


    });
       
}   

db.updateUser=function(param){
  
    var sql = "";
    
    if (param.data.id != 0)
    {
        sql += "update User set isAdmin=" + param.data.isAdmin 
        
        if (param.data.firstname)
            sql += ",first_name='" + param.data.firstname + "'"
            
        if (param.data.surname)
            sql += ",surname='" + param.data.surname + "'"
        
        if (param.data.password)
        sql += ",password='" + util.encrypt(param.data.password) + "'"
        
        sql+= " where id=" + param.data.id ;
    }
    else
    {
        sql += "insert into User (active, first_name,surname,username,password,isAdmin) values(1";
        sql += ",'" + param.data.firstname + "'";
        sql += ",'" + param.data.surname + "'";
        sql += ",'" + param.data.username + "'";
        sql += ",'" + util.encrypt(param.data.password) + "'";
        sql += "," + param.data.isAdmin + ");"
    }
    
    console.log(sql);
    return new Promise(function (fullfil,reject){
        
       var con = mysql.createConnection(dbConfigPrimary);
         con.connect();
    
        con.query(sql, function (error, results, fields) {
         con.end();
        if (error) return reject(error);
       
        return fullfil(results);
       
}); 


    });
       
} 

}(module.exports));


