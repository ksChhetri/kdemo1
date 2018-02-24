import { Component, OnInit } from '@angular/core';
import {TransactionHistoryService} from '../../services/transaction-history.service';
import {Http,Response, Headers, RequestOptions } from '@angular/http';

declare let $: any;

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['../../../assets/styles/payment/billing.min.css']
})
export class BillingComponent implements OnInit {

  constructor(private transactionHistoryService : TransactionHistoryService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('table').stacktable();
  }

  getHistory = function() {
    this.transactionHistoryService.getHistory();
  }
}
