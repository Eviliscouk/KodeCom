import { Injectable } from '@angular/core';
import { Payroll } from "./payroll.model";
import { Deduction } from "../shared/deduction.model";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';
import * as glob from "../shared/globals";

@Injectable()
export class PayrollService {
  PayrollsChanged = new Subject<number>();
  PayrollDeductionsChanged = new Subject<number>();
    headers = new Headers();
    root = '';//'https://kode-com-kerrjp.c9users.io';

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.root = glob.serviceRoot;
   }

   getUniqueUrl(url: string) : string
   {
     return this.root + url + '?tsp=' + new Date();
   }

  getPayrolls(id: number) : Observable<Payroll[]>{
    return this.http.get(this.getUniqueUrl('/api/getPayrolls/'+id)).map((res:Response) => res.json());
  }

  getPayroll(id: number) : Observable<Payroll> {
    return this.http.get(this.getUniqueUrl('/api/payroll/get/'+id)).map((res:Response) => res.json());
  }

  getPayrollDeductions(id: number) : Observable<Deduction[]> {
    console.log('requesting deductions for - ' + id );
    return this.http.get(this.getUniqueUrl('/api/payrollDeduction/get/'+id)).map((res:Response) => res.json());
  }

  async updatePayroll(values: string): Promise<string>{ 

    const response = await this.http.post(this.root+'/api/payroll/save/', values, {
        headers: this.headers
      }).toPromise();

      var result = response.text();
      if (result == 'ok')
        this.PayrollsChanged.next(1);
      return response.text();
  }

  async deletePayroll(id: number) : Promise<string>{
    var obj = {id:id,deleted:1};
    const response = await this.http.post(this.root+'/api/payroll/delete/', obj, {
        headers: this.headers
      }).toPromise();

      var result = response.text();
      if (result == 'ok')
        this.PayrollsChanged.next(1);
      return response.text();
  }

  async addPayrollDeduction(values: string): Promise<string>{ 
    const response = await this.http.post(this.root+'/api/payrollDeduction/save/', values, {
        headers: this.headers
      }).toPromise();

      var result = response.text();
      return response.text();
  }

  async deletePayrollDeduction(id: number) : Promise<string>{
    var obj = {id:id,deleted:1};
    const response = await this.http.post(this.root+'/api/payrollDeduction/delete/', obj, {
        headers: this.headers
      }).toPromise();

      var result = response.text();
      if (result == 'ok')
        this.PayrollDeductionsChanged.next(1);
      return response.text();
  }

}
