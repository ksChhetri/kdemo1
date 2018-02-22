import { Component, OnInit } from '@angular/core';
//import {FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';
import {TransactionService} from '../services/transaction.service';
import {Http,Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-pricing-subscription',
  templateUrl: './pricing-subscription.component.html',
  styleUrls: ['../../assets/styles/pricing/subscriptions.min.css']
})
export class PricingSubscriptionComponent implements OnInit {

  constructor(private transactionService : TransactionService,) { }

  ngOnInit() {
    //this.newService.GetUser().subscribe(data =>  this.Repdata = data)
  }

  buyToken = function(data,isValid: boolean) {
    this.transactionService.buyToken(data)
    .subscribe(data =>  {
      this.ngOnInit();
    },
    error => this.errorMessage = error)
  }
}
