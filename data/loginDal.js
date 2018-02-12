(function(dal){
    
    var db = require('./mysqlDb.js');
    
    dal.getUserFromDb_old=function(username,cb){
    
    console.log('checkingUser');
    var sql = "select id, username, password,databaseId from User where username='";
    sql += username + "' limit 1;";
    
    console.log("db script: %s",sql);
    
    db.run({sql:sql},function(err,result){
        
        if(err) 
        {
            if (cb) return cb(err);
        }
        
        if (cb) return cb(null,result[0]);
    });
    
};

dal.getUserFromDb=function(username,cb){



    console.log('checkingUser');
    var sql = "select id, username, isAdmin,password,databaseId from User where username='";
    sql += username + "' limit 1;";
    
    console.log("db script: %s",sql);
    
    db.getUserFromDb({sql:sql}).then(function(result){
        
        console.log(result);
        return cb(null,result[0]);
    }).catch(function(err){
        return cb(err);
        
    });
    
};
 
dal.updateUserDb=function(param){
    
    console.log('updating user database data - ' + param );
    
    return db.updateUserDb(param);
} 

dal.listDatabases=function(){
        return db.listDatabases();
    }

}

(module.exports));