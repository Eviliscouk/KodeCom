import { Injectable } from '@angular/core';
import { Contractor } from "./contractor.model";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ContractorService {
    startedEditing = new Subject<number>();
    
   private contractors: Contractor[] = [
    new Contractor(1, 'Bob', 'Hope', 'Hope Ltd', '1 London Rd', 'Ongar', 'Essex', 'CM5 9PH',  '0208567435', '0796537645',
  '', 'bob@hopeltd.co.uk',  'UTR',  '200',  'Yes',  'Payer Type'),
    new Contractor(2, 'Bob', 'Hope2', 'Hope Ltd', '1 London Rd', 'Ongar', 'Essex', 'CM5 9PH',  '0208567435', '0796537645',
  '', 'bob@hopeltd.co.uk',  'UTR',  '200',  'Yes',  'Payer Type'),
   new Contractor(3, 'Bob', 'Hope3', 'Hope Ltd', '1 London Rd', 'Ongar', 'Essex', 'CM5 9PH',  '0208567435', '0796537645',
  '', 'bob@hopeltd.co.uk',  'UTR',  '200',  'Yes',  'Payer Type'),
   new Contractor(4, 'Bob', 'Hope4', 'Hope Ltd', '1 London Rd', 'Ongar', 'Essex', 'CM5 9PH',  '0208567435', '0796537645',
  '', 'bob@hopeltd.co.uk',  'UTR',  '200',  'Yes',  'Payer Type')
  ];

  constructor() { }

  getContractors(){
    return this.contractors.slice();
  }
  
  getContractor(id: number) {
    return this.contractors.find(x => x.c_ID === id);
  }
  
  getContractorName(id: number) {
    console.log(id);
    var contractor = this.contractors.find(x => x.c_ID === id);
    console.log(contractor.displayName);
    return contractor.displayName;
  }
  
  updateContractor(id: number, values: Contractor){
      
  }
  
  addContractor(newContractor: Contractor){
      
  }
  
  deleteContractor(id: number) {
    
  }

}
