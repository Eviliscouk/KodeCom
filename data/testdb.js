
var db = require('./contractorDal.js')

console.log(db);

var param = {};

param.companyName='new company - 2',	
param.firstName='abc limited',	param.surname='',	param.address='south woodford',	
param.town='woodford',	param.county='essex',	param.postCode='abc',	param.phone='12456978',
    param.mobPhone='07787446211',param.fax='',	param.email='abc@hotmail.co.uk',	param.utr='234343',
    param.tlcins='0890',	param.payerType='temp', 	param.fee='0.00'

 db.saveContractor(param,function(err,data){
               
               if(err)
              console.log(err);
               else

               console.log(data);
    
        });

 
param.c_ID=62;      
param.company_name='new company 2.1',	
param.first_name='abc limited',	param.surname='',	param.address='south woodford',	
param.town='woodford',	param.county='essex',	param.postCode='abc',	param.phone='12456978',
    param.mobile='07787446211',param.fax='',	param.email='abc@hotmail.co.uk',	param.utr='234343',
    param.tlcins='0890',	param.payer_type='temp', 	param.fee='0.00'

 db.saveContractor(param,function(err,data){
               
               if(err)
              console.log(err);
               else

               console.log(data);
    
        });