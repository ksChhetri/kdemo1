import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { Router } from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      // this.router.navigateByUrl('/dashboard');
      this.refresh();
    }, (err) => {
      console.error(err);
    });
  }

  refresh(): void {
    window.location.href = '/login';
    // window.location.reload();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $.validate({
      modules : 'location, date, security, file, validate_strength'
    });
    $('#ks-maxlength-area').restrictLength($('#ks-maxlength-label'));
  }
}
