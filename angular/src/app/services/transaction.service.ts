import { Injectable , Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TransactionService {

  _baseUrl;

  constructor(private http: Http, @Inject(Window) private _window: Window) {
    this._baseUrl = 'http://' + _window.location.hostname + ':3000';
  }

  buyToken(_data, _details) {

    console.log("details", _details);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = {
        "data": _data,
        "user_details": _details
    };

    let body = JSON.stringify(data);

    return this.http.post(this._baseUrl + '/api/transactions/buyToken', body, { headers: headers }).
      map(res => res.json());
  }
}
