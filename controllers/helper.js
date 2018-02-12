(function(helper){
    
   
helper.getUserLogoUrl=function(userData,username){
    
    return new Promise(function(fullfil,reject){
    
    console.log(JSON.stringify(userData));
    
    userData.map(function(i,e){
       
       if (i.username == username) 
       {
            return fullfil({url: i.logoUrl,name: i.displayName});
       }
        
        });        
        
        
        return reject("logo url not found");
        
    });

    
}



})(module.exports);