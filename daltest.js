var dal = require("./data");

dal.getUsers(function(err,data){
    if(err)
    console.log(err);
    else
     console.log(JSON.stringify(data));
    
})
