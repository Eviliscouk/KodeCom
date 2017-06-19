import { Injectable, EventEmitter } from '@angular/core';
import { Payroll } from "./payroll.model";

@Injectable()
export class PayrollService {

   private payrolls: Payroll[] = [
    new Payroll(1, 1, 1, new Date(), new Date(), new Date(), 15, 20, 100,  5,'some materials',  10,  false),
    new Payroll(1, 1, 2, new Date(), new Date(2017, 11, 17), new Date(2017, 12, 17), 20, 20, 100,  5,'some materials',  10,  false),
    new Payroll(1, 1, 3, new Date(), new Date(2017, 9, 17), new Date(2017, 1, 17), 30, 20, 100,  5,'some materials',  10,  false)
  ];

  constructor() { }

  getPayrolls(id: number){
    return this.payrolls.filter((el) => el.s_ID === id).slice();
  }
  
  getPayroll(id: number) {
    return this.payrolls.find(x => x.p_ID === id);
  }

}
