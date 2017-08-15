import { Injectable } from '@angular/core';
import { Payroll } from "./payroll.model";
import { Deduction } from "../shared/deduction.model";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class PayrollService {
  PayrollsChanged = new Subject<number>();
    headers = new Headers();
    root = 'https://kode-com-kerrjp.c9users.io';

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
   }

  getPayrolls(id: number) : Observable<Payroll[]>{
    return this.http.get(this.root+'/api/getPayrolls/'+id).map((res:Response) => res.json());
  }

  getPayroll(id: number) : Observable<Payroll> {
    return this.http.get(this.root+'/api/payroll/get/'+id).map((res:Response) => res.json());
  }

  getPayrollDeductions(id: number) : Observable<Deduction[]> {
    return this.http.get(this.root+'/api/payrollDeduction/get/'+id).map((res:Response) => res.json());
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

}
