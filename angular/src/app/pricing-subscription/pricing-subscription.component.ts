import { Component, OnInit } from '@angular/core';
//import {FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';
import {TransactionService} from '../services/transaction.service';
import {Http,Response, Headers, RequestOptions } from '@angular/http';

import { AuthenticationService, UserDetails } from '../services/authentication.service';

declare let $: any;

@Component({
  selector: 'app-pricing-subscription',
  templateUrl: './pricing-subscription.component.html',
  styleUrls: ['../../assets/styles/pricing/subscriptions.min.css']
})
export class PricingSubscriptionComponent implements OnInit {
  details: UserDetails;

  constructor(private transactionService : TransactionService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

  buyToken = function(data, isValid: boolean) {
    this.transactionService.buyToken(data, this.details)
    .subscribe(data =>  {
        console.log("buy: ", data);
        alert("buy successful tx id: " + data.transactionHash);
    },
    error => this.errorMessage = error)
  }

  sellToken = function(data, isValid: boolean) {
    this.transactionService.sellToken(data, this.details)
    .subscribe(data =>  {
      console.log("ss: ", data);
      //  TODO do error checks
      //  sell order saved in backend now open metamask
      this.transactionService.sendToken(data).then(response => {
        console.log("response", response);
        alert("your transaction id: " + response);
      });
    },
    error => this.errorMessage = error)
  }

  transferToken = function(data, isValid: boolean) {
    this.transactionService.transferToken(data, this.details)
    .subscribe(data =>  {
      console.log("transferData: ", data);
      //  TODO do error checks
      //  transfer order saved in backend now open metamask
      this.transactionService.sendToken(data).then(response => {
        console.log("response", response);
        alert("your transaction id: " + response);
      });
    },
    error => this.errorMessage = error)
  }

  omit_special_char(event){
      var k;
      k = event.charCode;  //         k = event.keyCode;  (Both can be used)
      return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    }

  take_special_char(event){
      var l;
      l = event.charCode;  //         k = event.keyCode;  (Both can be used)
      return((l > 64 && l < 91) || (l > 96 && l < 123) || l == 8 || l == 32 || (l >= 48 && l <= 57) || l==46);
    }

  ngAfterViewInit() {
    $.validate({
      modules : 'location, date, security, file, validate_strength'
    });
    $('#ks-maxlength-area').restrictLength($('#ks-maxlength-label'));
  }
}
