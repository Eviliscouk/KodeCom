import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { SubContractor } from "./subcontractor.model";
import { SubContractorName } from "./subcontractor-list/subcontractorName.model";
import { Note } from '../shared/note.model';
import { Job } from '../shared/job.model';
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

  getOpenContractorJobs(id: number) : Observable<Job[]> {
    return this.http.get(this.getUniqueUrl('/api/contractorJob/getOpen/'+id)).map((res:Response) => res.json());
  }

  getContractorJobs(id: number) : Observable<Job[]> {
    return this.http.get(this.getUniqueUrl('/api/contractorJob/get/'+id)).map((res:Response) => res.json());
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

  getSubContractorData() {
    window.open(this.root+'/api/reports/subContractorData/');
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
  
async getKodeComAnnualInvoice(id: number, date: string, jobId: number) {
    const response = await this.http.get(this.getUniqueUrl('/api/reports/KodeComAnnualInvoice/'+id+'/'+date+'/'+jobId)).toPromise();
    var x=window.open();
    console.log(response.text());
    x.document.open().write(response.text());
    x.document.close();
  }

  async getBatchKodeComAnnualInvoice(date: string, jobIds: string) {
    var result = await this.http.get(this.getUniqueUrl('/api/reports/batchKodeComAnnualInvoice/'+date+'/'+jobIds), { headers: this.headers }).toPromise()
    return result.text();
  }

  async emailKodeComAnnualInvoice(id: number, date: string, jobId: number) {
    var obj = {id:id, date:date, jobId:jobId};
    const response = await this.http.post(this.root+'/api/reports/email/KodeComAnnualInvoice/', obj, { headers: this.headers }).toPromise();
    var result = response.text();
    return result;
  }

  async getSubContractorMonthlyStat(id: number, startDate: string, endDate: string, jobId: number) {
    console.log('requesting invoice');
    const response = await this.http.get(this.getUniqueUrl('/api/reports/subContractorMonthlyStatement/'+id+'/'+startDate+'/'+endDate+'/'+jobId)).toPromise();
    var x=window.open();
    console.log(response.text());
    x.document.open().write(response.text());
    x.document.close();
  }

  async getBatchSubContractorMonthlyStat(startDate: string, endDate: string, jobIds: string) {
    var result = await this.http.get(this.getUniqueUrl('/api/reports/batchSubContractorMonthlyStatement/'+startDate+'/'+endDate+'/'+jobIds), { headers: this.headers }).toPromise()
    return result.text();
  }

  async emailSubContractorMonthlyStat(id: number, startDate: string, endDate: string, jobId: number) {
    var obj = {id:id, startDate:startDate, endDate:endDate, jobId:jobId};
    const response = await this.http.post(this.root+'/api/reports/email/subContractorMonthlyStatement/', obj, { headers: this.headers }).toPromise();
    var result = response.text();
    return result;
  }

  async getBatchInvoices(date: string, jobIds: string) {
    var result = await this.http.get(this.getUniqueUrl('/api/reports/batchSubContractorInvoice/'+date+'/'+jobIds), { headers: this.headers }).toPromise()
    return result.text();
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

   async delete(id: number): Promise<string>{ 
    var obj = {id:id};
    const response = await this.http.post(this.root+'/api/SubContractor/delete/', obj, {
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
