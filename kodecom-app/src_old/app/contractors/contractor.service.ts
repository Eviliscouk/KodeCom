import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Contractor } from "./contractor.model";
import { Note } from '../shared/note.model';
import { Attachment } from '../shared/attachment.model';
import { ContractorName } from "./contractor-list/contractorName.model";
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ContractorService {
    contractorsChanged = new Subject<number>();
    contractorAttachmentsChanged = new Subject<number>();
    headers = new Headers();
    root = 'https://kode-com-kerrjp.c9users.io';

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
   }

  getContractors() : Observable<Contractor[]>{
    return this.http.get( this.root+'/api/getContractors/').map((res:Response) => res.json());
  }
  
  getContractorNames() : Observable<ContractorName[]>{
    return this.http.get(this.root+'/api/getContractorNames/').map((res:Response) => res.json());
  }
  
  getContractor(id: number) : Observable<Contractor> {
    return this.http.get(this.root+'/api/contractor/get/'+id).map((res:Response) => res.json());
  }

  getContractorNotes(id: number) : Observable<Note[]> {
    return this.http.get(this.root+'/api/contractorNote/get/'+id).map((res:Response) => res.json());
  }

  getContractorAttachments(id: number) : Observable<Attachment[]> {
    return this.http.get(this.root+'/api/contractorAttachments/get/'+id).map((res:Response) => res.json());
  }

  getContractorAttachment(id: number)
  {
    console.log('getContractorAttachment');
    console.log(id);
    //return this.http.get(this.root+'/api/contractorAttachment/get/'+id).map((res:Response) => {
    window.open(this.root+'/api/contractorAttachment/get/'+id);
    //});
  }

  async getContractorWeeklyRemittance(id: number, paymentDate: string) {
    console.log('requesting remittance');
    const response = await this.http.get(this.root+'/api/reports/contractorWeeklyRemittance/'+id+'/'+paymentDate).toPromise();
    var x=window.open();
    console.log(response.text());
    x.document.open().write(response.text());
    x.document.close();
  }

  async getContractorMonthlyReturn(id: number, monthEnd: string) {
    console.log('requesting remittance');
    const response = await this.http.get(this.root+'/api/reports/contractorMonthlyReturn/'+id+'/'+monthEnd).toPromise();
    var x=window.open();
    console.log(response.text());
    x.document.open().write(response.text());
    x.document.close();
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
