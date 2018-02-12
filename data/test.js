var mysql = require('mysql'),
  dbConfigPrimary = {
  host: "localhost",
  user: "kerrjp",
  password: "",
  database:"KodeCom",
  timezone:"UTC+0",
  multipleStatements: true
};
function getUserDbName(param){
    var sql = "select * from User u inner join core.database d on u.databaseId = d.id where u.username='" + param.username +"'";
    console.log(sql);
    return new Promise(function (fullfil,reject){
        
       var con = mysql.createConnection(dbConfigPrimary);
         con.connect();
    
        con.query(sql, function (error, results, fields) {
        
        if (error) return reject(error);
        con.end();
        return fullfil(results);
       
}); 


    });
       
}

var listDatabases=function(param){
    var sql = "select * from core.database where isPrimary=0;";
    return new Promise(function (fullfil,reject){
        
       var con = mysql.createConnection(dbConfigPrimary);
         con.connect();
    
        con.query(sql, function (error, results, fields) {
        
        if (error) return reject(error);
        con.end();
        return fullfil(results);
       
}); 
    });
       
}      

/*
getUserDbName({username:'jkerr'}).then(function(db){
    console.log(db[0].databaseId);
    
});
*/
listDatabases().then(function(dblist){
    console.log(dblist);
})


var updateUserDb=function(param){
    var sql = "update User set databaseId=" + param.databaseId+ " where username='" + param.username +"'";
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
/*
updateUserDb({databaseId:2,username:'jkerr'}).then(function(dblist){
    console.log(dblist);
})
*/