import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Owner } from '../shared/owner.model';

@Injectable()
export class OwnerService {
  headers = new Headers();
  ownerChanged = new Subject<number>();
  root = 'https://kode-com-kerrjp.c9users.io';

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
   }

  getOwner() : Observable<Owner>{
    return this.http.get(this.root+'/api/getOwner/').map((res:Response) => res.json());
  }

  async updateOwner(values: string): Promise<string>{ 

    const response = await this.http.post(this.root+'/api/owner/save/', values, {
        headers: this.headers
      }).toPromise();

      var result = response.text();
      if (result == 'ok')
        this.ownerChanged.next(1);
      return response.text();
  }

}
