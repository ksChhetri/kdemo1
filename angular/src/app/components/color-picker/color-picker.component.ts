import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['../../../assets/styles/libs/jquery-minicolors/jquery.minicolors.min.css']
})
export class ColorPickerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('.demo').each( function() {
      
    });
  }
}
