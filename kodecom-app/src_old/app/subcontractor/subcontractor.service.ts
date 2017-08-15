import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { SubContractor } from "./subcontractor.model";
import { SubContractorName } from "./subcontractor-list/subcontractorName.model";
import { Note } from '../shared/note.model';
import { Attachment } from '../shared/attachment.model';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SubContractorService {
    startedEditing = new Subject<number>();
    subContractorsChanged = new Subject<number>();
    subcontractorAttachmentsChanged = new Subject<number>();
    headers = new Headers();
    root = 'https://kode-com-kerrjp.c9users.io';

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
   }
  
  getSubContractors(id: number) : Observable<SubContractor[]>{
    return this.http.get(this.root+'/api/SubContractors/get/' + id).map((res:Response) => res.json());
  }
  
  getSubContractorNames(id: number, onlyActive: number) : Observable<SubContractorName[]>{
    return this.http.get(this.root+'/api/SubContractorNameById/get/'+ id + '/' + onlyActive).map((res:Response) => res.json());
  }

  getSubContractor(id: number) : Observable<SubContractor> {
    return this.http.get(this.root+'/api/SubContractor/get/'+id).map((res:Response) => res.json());
  }
  
  getSubContractorContractorId(id: number) : Observable<any> {
    return this.http.get(this.root+'/api/subcontractors/getContractorId/'+id).map((res:Response) => res.json());
  }

  getSubContractorNotes(id: number) : Observable<Note[]> {
    return this.http.get(this.root+'/api/SubContractorNote/get/'+id).map((res:Response) => res.json());
  }

  getSubContractorAttachments(id: number) : Observable<Attachment[]> {
    return this.http.get(this.root+'/api/subcontractorAttachments/get/'+id).map((res:Response) => res.json());
  }

  async getInvoice(id: number) {
    const response = await this.http.get(this.root+'/api/reports/subContractorInvoice/'+id).toPromise();
    var x=window.open();
    console.log(response.text());
    x.document.open().write(response.text());
    x.document.close();
  }
  
async getKodeComAnnualInvoice(id: number, date: string) {
    const response = await this.http.get(this.root+'/api/reports/KodeComAnnualInvoice/'+id+'/'+date).toPromise();
    var x=window.open();
    console.log(response.text());
    x.document.open().write(response.text());
    x.document.close();
  }

  async getSubContractorMonthlyStat(id: number, startDate: string, endDate: string) {
    console.log('requesting invoice');
    const response = await this.http.get(this.root+'/api/reports/subContractorMonthlyStatement/'+id+'/'+startDate+'/'+endDate).toPromise();
    var x=window.open();
    console.log(response.text());
    x.document.open().write(response.text());
    x.document.close();
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
