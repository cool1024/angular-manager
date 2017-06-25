import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-dom',
  templateUrl: './form-dom.component.html',
  styleUrls: ['./form-dom.component.css']
})
export class FormDomComponent implements OnInit {

  public collFlag: Array<boolean> = new Array<boolean>();

  constructor() { }

  ngOnInit() { }

}
