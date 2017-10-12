import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import 'rxjs/Rx';
import { Note } from '../shared/note.model';
import { Attachment } from '../shared/attachment.model';
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as glob from "../shared/globals";

declare var $:any;

@Injectable()
export class BatchService {
headers = new Headers();
root = '';//'https://kode-com-kerrjp.c9users.io';
batchesChanged = new Subject<number>();

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.root = glob.serviceRoot;
   }

   getUniqueUrl(url: string) : string
   {
     return this.root + url + '?tsp=' + new Date();
   }

   getBatches() : Observable<string[]>{
    return this.http.get(this.getUniqueUrl('/api/reports/getBatches/')).map((res:Response) => res.json());
  }

  getBatch(name: string){
    window.open(this.root+'/api/reports/getBatch/'+name);
  }

  async deleteBatch(name: string) : Promise<string>{
    var obj = {id:name};
    const response = await this.http.post(this.root+'/api/reports/deleteBatch/', obj, {
        headers: this.headers
      }).toPromise();

      var result = response.text();
      if (result == 'ok')
        this.batchesChanged.next(1);
      return response.text();
  }

}
