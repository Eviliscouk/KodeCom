
function testPromise(){
console.log(1);

return new Promise(function(fullfil,reject){

var dal = require("./data");
var param ={};
param.sql = "SELECT * FROM [TestTable]";

try{
    
dal.executeSql(param,function(data){
   fullfil(data);
    
});
    
}
catch(err){
    //console.log(err);
   reject(err);
    //return promise(null,reject(err));
}

});


    
}

testPromise().then(function(data){
    console.log(data);
})
.catch(function(err){
    console.log(err);
});

