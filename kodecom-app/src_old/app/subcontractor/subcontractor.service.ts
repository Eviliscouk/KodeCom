import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { SubContractor } from "./subcontractor.model";
import { SubContractorName } from "./subcontractor-list/subcontractorName.model";
import { Note } from '../shared/note.model';
import { Attachment } from '../shared/attachment.model';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/timeoutWith';
import 'rxjs/add/operator/map';
import * as glob from "../shared/globals";

@Injectable()
export class SubContractorService {
    startedEditing = new Subject<number>();
    subContractorsChanged = new Subject<number>();
    subcontractorAttachmentsChanged = new Subject<number>();
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
  
  getSubContractors(id: number) : Observable<SubContractor[]>{
    return this.http.get(this.getUniqueUrl('/api/SubContractors/get/' + id)).map((res:Response) => res.json());
  }
  
  getSubContractorNames(id: number, onlyActive: number) : Observable<SubContractorName[]>{
    return this.http.get(this.getUniqueUrl('/api/SubContractorNameById/get/'+ id + '/' + onlyActive)).map((res:Response) => res.json());
  }

  getSubContractor(id: number) : Observable<SubContractor> {
    return this.http.get(this.getUniqueUrl('/api/SubContractor/get/'+id)).map((res:Response) => res.json());
  }
  
  getSubContractorContractorId(id: number) : Observable<any> {
    return this.http.get(this.getUniqueUrl('/api/subcontractors/getContractorId/'+id)).map((res:Response) => res.json());
  }

  getSubContractorNotes(id: number) : Observable<Note[]> {
    return this.http.get(this.getUniqueUrl('/api/SubContractorNote/get/'+id)).map((res:Response) => res.json());
  }

  getSubContractorAttachments(id: number) : Observable<Attachment[]> {
    return this.http.get(this.getUniqueUrl('/api/subcontractorAttachments/get/'+id)).map((res:Response) => res.json());
  }

  getSubContractorAttachment(id: number)
  {
    console.log('getSubContractorAttachment');
    console.log(id);
    //return this.http.get(this.root+'/api/contractorAttachment/get/'+id).map((res:Response) => {
    window.open(this.root+'/api/contractorAttachment/get/'+id);
    //});
  }

  getGeneratedReport(id: string)
  {
    //return this.http.get(this.root+'/api/contractorAttachment/get/'+id).map((res:Response) => {
    window.open(this.root+'/api/subContractorReport/get/'+id);
    //});
  }

  async getInvoice(id: number) {
    const response = await this.http.get(this.getUniqueUrl('/api/reports/subContractorInvoice/'+id)).toPromise();
    var x=window.open();
    console.log(response.text());
    x.document.open().write(response.text());
    x.document.close();
  }

  async emailInvoice(id: number) {
    var obj = {id:id};
    const response = await this.http.post(this.root+'/api/reports/email/subContractorInvoice/', obj, { headers: this.headers }).toPromise();
    var result = response.text();
    return result;
  }
  
async getKodeComAnnualInvoice(id: number, date: string) {
    const response = await this.http.get(this.getUniqueUrl('/api/reports/KodeComAnnualInvoice/'+id+'/'+date)).toPromise();
    var x=window.open();
    console.log(response.text());
    x.document.open().write(response.text());
    x.document.close();
  }

  async getBatchKodeComAnnualInvoice(date: string) {
    var headers = new Headers();
    headers.append("Accept", "application/octet-stream");
    var result = await this.http.get(this.getUniqueUrl('/api/reports/batchKodeComAnnualInvoice/'+date), { headers: headers, responseType: ResponseContentType.Blob })
    .timeoutWith(100000000, Observable.throw(new Error('Boom!')))
    .toPromise()
    .then(function(res) { 
      console.log('Received Zip!');
      var d = new Date(); 
      var anchor = document.createElement("a");
      anchor.download = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " + d.getHours() + "-" + d.getMinutes() + '-SubContractorAnnualInvoice.zip';
      anchor.href = URL.createObjectURL(res.blob());
      anchor.click();
      return 'Ok';
    })
    .catch(e => {console.log(e); console.log("Error retreiving File"); return 'fail';});

    return result;
  }

  async emailKodeComAnnualInvoice(id: number, date: string) {
    var obj = {id:id, date:date};
    const response = await this.http.post(this.root+'/api/reports/email/KodeComAnnualInvoice/', obj, { headers: this.headers }).toPromise();
    var result = response.text();
    return result;
  }

  async getSubContractorMonthlyStat(id: number, startDate: string, endDate: string) {
    console.log('requesting invoice');
    const response = await this.http.get(this.getUniqueUrl('/api/reports/subContractorMonthlyStatement/'+id+'/'+startDate+'/'+endDate)).toPromise();
    var x=window.open();
    console.log(response.text());
    x.document.open().write(response.text());
    x.document.close();
  }

  async getBatchSubContractorMonthlyStat(startDate: string, endDate: string) {
    var headers = new Headers();
    headers.append("Accept", "application/octet-stream");
    var result = await this.http.get(this.getUniqueUrl('/api/reports/batchSubContractorMonthlyStatement/'+startDate+'/'+endDate), { headers: headers, responseType: ResponseContentType.Blob })
    .toPromise()
    .then(function(res) { 
      console.log('Received Zip!');
      var d = new Date(); 
      var anchor = document.createElement("a");
      anchor.download = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " + d.getHours() + "-" + d.getMinutes() + '-SubContractorMonthlyStatement.zip';
      anchor.href = URL.createObjectURL(res.blob());
      anchor.click();
      return 'Ok';
    })
    .catch(() => {console.log("Error retreiving File"); return 'fail';});

    return result;
  }

  async emailSubContractorMonthlyStat(id: number, startDate: string, endDate: string) {
    var obj = {id:id, startDate:startDate, endDate:endDate};
    const response = await this.http.post(this.root+'/api/reports/email/subContractorMonthlyStatement/', obj, { headers: this.headers }).toPromise();
    var result = response.text();
    return result;
  }

  async getBatchInvoices(date: string) {
    var headers = new Headers();
    headers.append("Accept", "application/octet-stream");
    var result = await this.http.get(this.getUniqueUrl('/api/reports/batchSubContractorInvoice/'+date), { headers: headers, responseType: ResponseContentType.Blob })
    .toPromise()
    .then(function(res) { 
      console.log('Received Zip!');
      var d = new Date(); 
      var anchor = document.createElement("a");
      anchor.download = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " + d.getHours() + "-" + d.getMinutes() + '-SubContractorInvoice.zip';
      anchor.href = URL.createObjectURL(res.blob());
      anchor.click();
      return 'Ok';
    })
    .catch(() => {console.log("Error retreiving File"); return 'fail';});

    return result;
  }

  async updateSubContractor(values: string): Promise<string>{ 

    const response = await this.http.post(this.root+'/api/SubContractor/save/', values, {
        headers: this.headers
      }).toPromise();

      var result = response.text();
      if (result == 'ok')
        this.subContractorsChanged.next(1);
      return response.text();
  }
  
  async deleteSubContractor(id: number) : Promise<string>{
    var obj = {id:id,deleted:1};
    const response = await this.http.post(this.root+'/api/SubContractor/delete/', obj, {
        headers: this.headers
      }).toPromise();

      var result = response.text();
      if (result == 'ok')
        this.subContractorsChanged.next(1);
      return response.text();
  }

  async deleteSubContractorAttachment(id: number) : Promise<string>{
    var obj = {id:id};
    const response = await this.http.post(this.root+'/api/subcontractorAttachment/delete/', obj, {
        headers: this.headers
      }).toPromise();

      var result = response.text();
      if (result == 'ok')
        this.subcontractorAttachmentsChanged.next(1);
      return response.text();
  }

  async addSubContractorNote(values: string): Promise<string>{ 

    const response = await this.http.post(this.root+'/api/SubContractorNote/save/', values, {
        headers: this.headers
      }).toPromise();

      var result = response.text();
      return response.text();
  }

  async saveAttachment(id: string, file: File): Promise<string>{ 

    let headers = new Headers();
    /** No need to include Content-Type in Angular 4 */
    //headers.append('Content-Type', 'multipart/form-data');
    //headers.append('Accept', 'application/json');
    
    headers.append('object_id', id);
    headers.append('filename', file.name);
    let options = new RequestOptions({ headers: headers });
    const response = await this.http.post(this.root+'/api/subcontractorAttachment/save/', file, options).toPromise();
    var result = response.text();
    return result;
  } 

}
