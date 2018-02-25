import { Injectable , Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Web3 from 'web3';

declare let require: any;
declare let window: any;


@Injectable()
export class TransactionService {

  _baseUrl;

  private _account: string = null;
  private _web3: any;

  constructor (private http: Http, @Inject(Window) private _window: Window) {
    this._baseUrl = 'http://' + _window.location.hostname + ':3000';

    if (typeof window.web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        this._web3 = new Web3(window.web3.currentProvider);
        if (this._web3.version.network !== '3') {
          alert('Please connect to the Ropsten network');
        }
    } else {
        console.warn('Please use a dapp browser like mist or MetaMask plugin for chrome');
    }
  }

  private async getAccount(): Promise<string> {
    if (this._account == null) {
      this._account = await new Promise((resolve, reject) => {
        this._web3.eth.getAccounts((err, accs) => {
          if (err != null) {
            alert('There was an error fetching your accounts.');
            return;
          }

          if (accs.length === 0) {
            alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
            return;
          }
          resolve(accs[0]);
        })
      }) as string;

      this._web3.eth.defaultAccount = this._account;
    }

    console.log(this._account);
    return Promise.resolve(this._account);
  }

  public async sendToken(data): Promise<number> {
    let account = await this.getAccount();
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;

      var _tokenContractAddress = data.tokenContractAddress;
      var _tokenContractAbi = data.tokenContractAbi;
      var _tokenContract = this._web3.eth.contract(_tokenContractAbi).at(_tokenContractAddress);
      var _amount = data.data.amount;
      var _toAddress = data.toAddress;

      _tokenContract.transfer.sendTransaction(_toAddress, _amount, {
          from: account,
          gas: 60000
        }, function (err, result) {
          if (err != null) {
            console.log("err" , err);
            reject(err);
          }
          console.log("result " , result);
          resolve(result);
          // resolve(_web3.fromWei(result));
       });
    }) as Promise<number>;
  }

  buyToken(_data, _details) {
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

  sellToken(_data, _details) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = {
        "data": _data,
        "user_details": _details
    };

    let body = JSON.stringify(data);

    return this.http.post(this._baseUrl + '/api/transactions/sellToken', body, { headers: headers }).
      map(res => res.json());
  }

  transferToken(_data, _details) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = {
        "data": _data,
        "user_details": _details
    };

    let body = JSON.stringify(data);

    return this.http.post(this._baseUrl + '/api/transactions/transferToken', body, { headers: headers }).
      map(res => res.json());
  }
}
