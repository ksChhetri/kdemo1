import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'

@Component({
  selector: 'app-pricing-subscription',
  templateUrl: './pricing-subscription.component.html',
  styleUrls: ['../../assets/styles/pricing/subscriptions.min.css']
})
export class PricingSubscriptionComponent implements OnInit {

  amount:Number;
  address:String;
  email:String;
  comment:String;

  constructor(private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }
  onRegisterSubmit() {
    // testing console.log(this.name);
    //creating object from above field
    const user = {
      amount:this.amount,
      address:this.address,
      email:this.email,
      comment:this.comment
    }
  //register user 
  this.authService.registerUser(user).subscribe(data => {
    if (data.success) {
      this.flashMessagesService.show('Registeration Success', { cssClass: 'alert-success', timeout: 1000 });
      //this.router.navigate(['/login']);
    }
    else {
      this.flashMessagesService.show('Woops Something Gone Wrong', { cssClass: 'alert-danger', timeout: 1000 });
      this.router.navigate(['/register']);
    }
  });
  }
}
