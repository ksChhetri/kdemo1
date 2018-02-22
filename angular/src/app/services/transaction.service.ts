import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class TransactionService {

  constructor(private http: Http) { }

  buyToken(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/transactions/buyToken', data, { headers: headers }).
      map(res => res.json());
  }
}
