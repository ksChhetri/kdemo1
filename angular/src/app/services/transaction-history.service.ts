import { Injectable , Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TransactionHistoryService {

  _baseUrl;

  constructor(private http: Http, @Inject(Window) private _window: Window) {
    this._baseUrl = 'http://' + _window.location.hostname + ':3000';
  }

  getHistory() {
    var url = this._baseUrl + '/api/transactions/history';
    console.log("get serv", url);
    return this.http.get(`http://localhost:3000/api/transactions/history`)
    .map((res:Response) => res.json());
    // return this.http.get(url).pipe(map(res => res));
    // return this.http.get(url).map((response:Response) => {response.json();});
  }

}
