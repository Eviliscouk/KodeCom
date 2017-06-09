(function(dal){

dal.getUsers= function(){
    
    return "users list";
    
}

dal.getContractors= function(){
    
    return "Contractors list";
    
}

dal.getContractor= function(id){
    
    return "Contractor" + id;
    
}

dal.getSubContractors= function(){
    
    return "SubContractors list";
    
}

dal.getSubContractor= function(id){
    
    return "SubContractor" + id;
    
}

dal.getPayrollForSubContractor= function(subId){
    
    return "SubContractors list for subId " + subId;
    
}

dal.getPayroll= function(id){
    
    return "Payroll " + id;
    
}

}
(module.exports));