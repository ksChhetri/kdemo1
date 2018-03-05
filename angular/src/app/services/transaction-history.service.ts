import { Injectable , Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment.prod';

@Injectable()
export class TransactionHistoryService {

  _baseUrl;

  constructor(private http: HttpClient, @Inject(Window) private _window: Window) {
    this._baseUrl = 'http://' + environment.gloURL + ':3000';
  }

  getHistory() {
    var url = this._baseUrl + '/api/transactions/history';
    return this.http.get(url);
  }

  getTotalSale() {
  	var url = this._baseUrl + '/api/transactions/getTotalSale';
    return this.http.get(url);
  }

  getTotalSaleToday() {
  	var url = this._baseUrl + '/api/transactions/getTotalSale';
    return this.http.get(url);
  }

  getCurrentUserSale() {
  	var url = this._baseUrl + '/api/transactions/getTotalSale';
    return this.http.get(url);
  }

}
