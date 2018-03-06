import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../services/authentication.service';

@Component({
  selector: 'app-user-settings-contact-info',
  templateUrl: './user-settings-contact-info.component.html'
})
export class UserSettingsContactInfoComponent implements OnInit {

  details: UserDetails;

  url = '';

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

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

}
