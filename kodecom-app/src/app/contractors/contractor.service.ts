import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import 'rxjs/Rx';
import { Contractor } from "./contractor.model";
import { Note } from '../shared/note.model';
import { Job } from '../shared/job.model';
import { Attachment } from '../shared/attachment.model';
import { ContractorName } from "./contractor-list/contractorName.model";
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as glob from "../shared/globals";

declare var $:any;

@Injectable()
export class ContractorService {
    contractorsChanged = new Subject<number>();
    contractorAttachmentsChanged = new Subject<number>();
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

  getContractors() : Observable<Contractor[]>{
    return this.http.get(this.getUniqueUrl('/api/getContractors/')).map((res:Response) => res.json());
  }
  
  getContractorNames() : Observable<ContractorName[]>{
    return this.http.get(this.getUniqueUrl('/api/getContractorNames/')).map((res:Response) => res.json());
  }
  
  getContractor(id: number) : Observable<Contractor> {
    return this.http.get(this.getUniqueUrl('/api/contractor/get/'+id)).map((res:Response) => res.json());
  }

  getContractorNotes(id: number) : Observable<Note[]> {
    return this.http.get(this.getUniqueUrl('/api/contractorNote/get/'+id)).map((res:Response) => res.json());
  }

  getContractorJobs(id: number) : Observable<Job[]> {
    return this.http.get(this.getUniqueUrl('/api/contractorJob/get/'+id)).map((res:Response) => res.json());
  }

  getContractorAttachments(id: number) : Observable<Attachment[]> {
    return this.http.get(this.getUniqueUrl('/api/contractorAttachments/get/'+id)).map((res:Response) => res.json());
  }

  getContractorAttachment(id: number)
  {
    console.log('getContractorAttachment');
    console.log(id);
    //return this.http.get(this.root+'/api/contractorAttachment/get/'+id).map((res:Response) => {
    window.open(this.root+'/api/contractorAttachment/get/'+id);
    //});
  }

  async getContractorWeeklyRemittance(id: number, paymentDate: string, jobId: number) {
    const response = await this.http.get(this.getUniqueUrl('/api/reports/contractorWeeklyRemittance/'+id+'/'+paymentDate+'/'+jobId)).toPromise();
    var x=window.open();
    console.log(response.text());
    x.document.open().write(response.text());
    x.document.close();
  }

  async getBatchContractorWeeklyRemittance(paymentDate: string, jobIds: string) {
    var result = await this.http.get(this.getUniqueUrl('/api/reports/batchContractorWeeklyRemittance/'+paymentDate+'/'+jobIds), { headers: this.headers }).toPromise()
    return result.text();
  }

  getContractorWeeklyRemittanceText(id: number, paymentDate: string, jobId: number) {
    window.open(this.root+'/api/reports/contractorWeeklyText/'+id+'/'+paymentDate+'/'+jobId);
  }

  getContractorData() {
    window.open(this.root+'/api/reports/contractorData/');
  }

  getContractorWeeklyRemittanceBanking(id: number, paymentDate: string, jobId: number) {
    window.open(this.root+'/api/reports/contractorWeeklyBanking/'+id+'/'+paymentDate+'/'+jobId);
  }

  createAnchorForFile(url : string, name : string) : any {
      var anchor = document.createElement("a");
      anchor.download = name;
      anchor.href = url;
      return anchor;
  }

  createDateString(d : Date) : string
  {
      var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
      d.getHours() + "-" + d.getMinutes();

      return datestring;
  }

  getGeneratedReport(id: string)
  {
    //return this.http.get(this.root+'/api/contractorAttachment/get/'+id).map((res:Response) => {
    window.open(this.root+'/api/contractorReport/get/'+id);
    //});
  }

  async emailContractorWeeklyRemittance(id: number, paymentDate: string, jobId: number) {
    var obj = {id:id, paymentDate:paymentDate, jobId:jobId};
    const response = await this.http.post(this.root+'/api/reports/email/contractorWeeklyRemittance/', obj, { headers: this.headers }).toPromise();
    var result = response.text();
    return result;
  }

  async getContractorMonthlyReturn(id: number, monthEnd: string, jobId: number) {
    const response = await this.http.get(this.getUniqueUrl('/api/reports/contractorMonthlyReturn/'+id+'/'+monthEnd+'/'+jobId)).toPromise();
    var x=window.open();
    console.log(response.text());
    x.document.open().write(response.text());
    x.document.close();
  }

  async getBatchContractorMonthlyReturn(monthEnd: string, jobIds: string) {
    var result = await this.http.get(this.getUniqueUrl('/api/reports/batchContractorMonthlyReturn/'+monthEnd+'/'+jobIds), { headers: this.headers }).toPromise()
    return result.text();
  }

  async emailContractorMonthlyReturn(id: number, monthEnd: string, jobId: number) {
    var obj = {id:id, monthEnd:monthEnd, jobId:jobId};
    const response = await this.http.post(this.root+'/api/reports/email/contractorMonthlyReturn/', obj, { headers: this.headers }).toPromise();
    var result = response.text();
    return result;
  }
  
  async updateContractor(values: string): Promise<string>{ 

    const response = await this.http.post(this.root+'/api/contractor/save/', values, {
        headers: this.headers
      }).toPromise();

      var result = response.text();
      if (result == 'ok')
        this.contractorsChanged.next(1);
      return response.text();
  }
  
  async deleteContractor(id: number) : Promise<string>{
    var obj = {id:id,deleted:1};
    const response = await this.http.post(this.root+'/api/contractor/delete/', obj, {
        headers: this.headers
      }).toPromise();

      var result = response.text();
      if (result == 'ok')
        this.contractorsChanged.next(1);
      return response.text();
  }

  async deleteContractorAttachment(id: number) : Promise<string>{
    var obj = {id:id};
    const response = await this.http.post(this.root+'/api/contractorAttachment/delete/', obj, {
        headers: this.headers
      }).toPromise();

      var result = response.text();
      if (result == 'ok')
        this.contractorAttachmentsChanged.next(1);
      return response.text();
  }

  async addContractorNote(values: string): Promise<string>{ 

    const response = await this.http.post(this.root+'/api/contractorNote/save/', values, {
        headers: this.headers
      }).toPromise();

      var result = response.text();
      return result;
  }

  async addContractorJob(values: string): Promise<string>{ 

    const response = await this.http.post(this.root+'/api/contractorJob/save/', values, {
        headers: this.headers
      }).toPromise();

      var result = response.text();
      return result;
  }

  async lockPayroll(id: number, fromDate: string, toDate: string): Promise<string>{ 
    var obj = {id:id, fromDate:fromDate, toDate:toDate };
    const response = await this.http.post(this.root+'/api/contractor/lockPayroll/',obj, {
        headers: this.headers
      }).toPromise();

      var result = response.text();
      return result;
  }

   async saveAttachment(id: string, file: File): Promise<string>{ 

    let headers = new Headers();
    /** No need to include Content-Type in Angular 4 */
    //headers.append('Content-Type', 'multipart/form-data');
    //headers.append('Accept', 'application/json');
    
    headers.append('object_id', id);
    headers.append('filename', file.name);
    
    let options = new RequestOptions({ headers: headers });
    const response = await this.http.post(this.root+'/api/contractorAttachment/save/', file, options).toPromise();
    var result = response.text();
    return result;
  } 

}
