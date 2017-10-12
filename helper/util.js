(function(util){
    util.encrypt = function(str){
        return  Buffer.from(str).toString('base64');
        
    }
    
    util.decrypt = function(base64){
        return  Buffer.from(base64, 'base64').toString('ascii');
        
    }
    
    
}(module.exports))