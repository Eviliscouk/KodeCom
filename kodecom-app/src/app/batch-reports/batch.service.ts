import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import 'rxjs/Rx';
import { Batch } from './batch.model';
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as glob from "../shared/globals";

declare var $:any;

@Injectable()
export class BatchService {
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

   getBatches() : Observable<Batch[]>{
    return this.http.get(this.getUniqueUrl('/api/reports/getBatches/')).map((res:Response) => res.json());
  }

  getBatch(id: string){
    window.open(this.root+'/api/reports/getBatch/'+id);
  }

  async deleteBatch(id: string): Promise<string>{
    var response = await this.http.get(this.getUniqueUrl('/api/reports/deleteBatch/'+id), { headers: this.headers })
    .toPromise();
    var result = response.text();
    return result;
  }

}
