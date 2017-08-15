var dal = require("./data");
var param ={};
param.sql = "SELECT * FROM [TestTable]";
dal.executeSql(param,function(data){
    
   console.log(data);
});
