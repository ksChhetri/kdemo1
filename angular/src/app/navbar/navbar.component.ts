import { Component, OnInit } from '@angular/core';

import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor() { }

  logout(){
  	
  }


  ngOnInit() {
  }

}
