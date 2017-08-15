(function(dal){
    

dal.save=function(param,cb){
    
    /// save to the database
    
    var data =[];
    
    cb(null,data);
}


dal.getContractors=function(param,cb){
    
    /// save to the database
    
    var data =[{id:1,name:"naveen"},{id:2,name:"james"}];
    // connect to database
    //fire sql
    // return records
    
    cb(null,data);
}



}

(module.exports));