import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../services/authentication.service';

@Component({
  selector: 'app-user-settings-contact-info',
  templateUrl: './user-settings-contact-info.component.html'
})
export class UserSettingsContactInfoComponent implements OnInit {

  details: UserDetails;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      console.log("usr", user);
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

  updateDetails(updated_details) {
    console.log("updated_details", updated_details);
    this.auth.updateProfile(updated_details).subscribe(() => {
      // this.router.navigateByUrl('/dashboard');
    }, (err) => {
      console.error(err);
    });
  }

}
