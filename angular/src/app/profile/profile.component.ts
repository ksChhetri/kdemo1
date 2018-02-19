import { Component, OnInit } from '@angular/core';
import { ScriptLoaderService } from '../services/script-loader.service';

declare let plyr: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  constructor(private scriptLoader: ScriptLoaderService) {
    this.scriptLoader.load('plyr');
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    plyr.setup();
  }
}
