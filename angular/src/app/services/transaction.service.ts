import { Injectable , Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class TransactionService {

  _baseUrl;
  constructor(private http: Http, @Inject(Window) private _window: Window) {
    this._baseUrl = 'http://' + _window.location.hostname + ':3000';
  }

  buyToken(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(this._baseUrl);
    return this.http.post(this._baseUrl + '/transactions/buyToken', data, { headers: headers }).
      map(res => res.json());
  }
}
