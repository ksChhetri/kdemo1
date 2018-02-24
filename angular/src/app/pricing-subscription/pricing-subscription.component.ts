import { Component, OnInit } from '@angular/core';
//import {FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';
import {TransactionService} from '../services/transaction.service';
import {Http,Response, Headers, RequestOptions } from '@angular/http';

import { AuthenticationService, UserDetails } from '../services/authentication.service';

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
      this.ngOnInit();
    },
    error => this.errorMessage = error)
  }

  sellToken = function(data, isValid: boolean) {
    this.transactionService.sellToken(data)
    .subscribe(data =>  {
      this.ngOnInit();
    },
    error => this.errorMessage = error)
  }

  transferToken = function(data, isValid: boolean) {
    this.transactionService.transferToken(data)
    .subscribe(data =>  {
      this.ngOnInit();
    },
    error => this.errorMessage = error)
  }
}
