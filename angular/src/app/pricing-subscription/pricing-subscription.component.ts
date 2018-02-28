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
        if (!data.success) {
          alert("buy unsuccessful: " + data.msg);
          return;
        }
        alert("buy successful tx id: " + data.transactionHash);
    },
    error => this.errorMessage = error)
  }

  sellToken = function(data, isValid: boolean) {
    this.transactionService.sellToken(data, this.details)
    .subscribe(data =>  {
      console.log("sell: ", data);
      if (!data.success) {
        alert("sell unsuccessful: " + data.msg);
        return;
      }
        //  sell order saved in backend now open metamask
      this.transactionService.sendToken(data).then(response => {
        alert("your transaction id: " + response);
      });
    },
    error => this.errorMessage = error)
  }

  transferToken = function(data, isValid: boolean) {
    this.transactionService.transferToken(data, this.details)
    .subscribe(data =>  {
      console.log("transfer: ", data);
      if (!data.success) {
        alert("transfer unsuccessful: " + data.msg);
        return;
      }
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

    $('#ks-izi-modal-basic').iziModal();
    $('#ks-izi-modal-primary').iziModal();
    $('#ks-izi-modal-alert-primary').iziModal();
    $('#ks-izi-modal-success').iziModal();
    $('#ks-izi-modal-alert-success').iziModal();
    $('#ks-izi-modal-info').iziModal();
    $('#ks-izi-modal-alert-info').iziModal();
    $('#ks-izi-modal-warning').iziModal();
    $('#ks-izi-modal-alert-warning').iziModal();
    $('#ks-izi-modal-danger').iziModal();
    $('#ks-izi-modal-alert-danger').iziModal();

    $('#ks-izi-modal-large').iziModal({
      autoOpen: false,
      padding: 20,
      headerColor: '#3a529b',
      restoreDefaultContent: true,
      title: "Welcome to the iziModal",
      fullscreen: true,
      subtitle: 'Elegant, responsive, flexible and lightweight modal plugin with jQuery.',
      transitionIn: 'fadeInDown'
    });

    $("#ks-izi-modal-alert").iziModal({
      title: "Your message has been sent successfully",
      icon: 'la la-check',
      headerColor: '#00af66',
      width: 600,
      timeout: 10000,
      timeoutProgressbar: true,
      transitionIn: 'fadeInUp',
      transitionOut: 'fadeOutDown',
      attached: 'top',
      pauseOnHover: true,
      autoOpen: false
    });

    $("#ks-izi-modal-alert2").iziModal({
      title: "Attention",
      subtitle: 'you are being disconnected..',
      icon: 'la la-home',
      headerColor: '#BD5B5B',
      width: 600,
      timeout: 5000,
      timeoutProgressbar: true,
      transitionIn: 'fadeInDown',
      transitionOut: 'fadeOutDown',
      pauseOnHover: true,
      autoOpen: false
    });

    $("#ks-izi-modal-video").iziModal({
      headerColor: '#000',
      title: 'iziModal with iframe',
      subtitle: 'Video example using the Vimeo embed.',
      icon: 'icon-settings_system_daydream',
      overlayClose: true,
      iframe : true,
      iframeURL: 'https://player.vimeo.com/video/22439234?autoplay=1',
      fullscreen: true,
      openFullscreen: false,
      autoOpen: false
    });

    $('.ks-izi-modal-trigger').on('click', function (e) {
      $($(this).data('target')).iziModal('open');
    });
  }
}
