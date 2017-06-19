import { Injectable } from '@angular/core';
import { SubContractor } from "./subcontractor.model";

@Injectable()
export class SubContractorService {

   private subcontractors: SubContractor[] = [
    new SubContractor(1, 1, 'Bob', 'Hope', 'Hope Ltd', '1 London Rd', 'Ongar', 'Essex', 'CM5 9PH',  '0208567435', '0796537645',
  '', 'bob@hopeltd.co.uk',  'UTR',  'JT6783746R',  '100',  20, 10, 'Building Services', true, false),
    new SubContractor(1, 2, 'Bob', 'Hope2', 'Hope Ltd', '1 London Rd', 'Ongar', 'Essex', 'CM5 9PH',  '0208567435', '0796537645',
  '', 'bob@hopeltd.co.uk',  'UTR',  'JT6783746R',  '200',  20, 10, 'Building Services', true, false),
   new SubContractor(2, 3, 'Bob', 'Hope3', 'Hope Ltd', '1 London Rd', 'Ongar', 'Essex', 'CM5 9PH',  '0208567435', '0796537645',
  '', 'bob@hopeltd.co.uk',  'UTR',  'JT6783746R',  '300',  20, 10, 'Building Services', true, false),
   new SubContractor(3, 4, 'Bob', 'Hope4', 'Hope Ltd', '1 London Rd', 'Ongar', 'Essex', 'CM5 9PH',  '0208567435', '0796537645',
  '', 'bob@hopeltd.co.uk',  'UTR',  'JT6783746R',  '400',  20, 10, 'Building Services', true, false)
  ];

  constructor() { }

  getSubContractors(id: number){
    return this.subcontractors.filter((el) => el.c_ID === id).slice();
  }
  
  getSubContractor(id: number) {
    return this.subcontractors.find(x => x.s_ID === id);
  }
  
  getSubContractorName(id: number) {
    var subcontractor = this.subcontractors.find(x => x.s_ID === id);
    return subcontractor.displayName;
  }

}
