(function(dal){



dal.getUsers= function(cb){

    var ADODB = require('node-adodb');
    var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=../data/KODE_DATABASE.accdb;');
    console.log(connection);
    
connection
  .query('SELECT * FROM Users')
  .on('done', function(data) {
      cb(null,data);
  //  console.log('result:', JSON.stringify(data, null, 2));
    
    
  })
  .on('fail', function(error) {
    // TODO something
    cb(error,null);
  });
    
    //return "users list";
    
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