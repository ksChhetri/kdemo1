import { Injectable , Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class TransactionHistoryService {

  _baseUrl;

  constructor(private http: HttpClient, @Inject(Window) private _window: Window) {
    this._baseUrl = 'http://' + _window.location.hostname + ':3000';
  }

  getHistory() {
    var url = this._baseUrl + '/api/transactions/history';
    return this.http.get(url);
  }

}
