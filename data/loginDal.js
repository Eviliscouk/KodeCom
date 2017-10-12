(function(dal){
    
    var db = require('./mysqlDb.js');
    
    dal.getUserFromDb=function(username,cb){
    
    console.log('checkingUser');
    var sql = "select id, username, password from User where username='";
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

}

(module.exports));