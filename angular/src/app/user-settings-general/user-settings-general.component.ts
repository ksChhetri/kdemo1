import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../services/authentication.service';

@Component({
  selector: 'app-user-settings-general',
  templateUrl: './user-settings-general.component.html',
  styleUrls: ['./user-settings-general.component.css']
})
export class UserSettingsGeneralComponent implements OnInit {

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
