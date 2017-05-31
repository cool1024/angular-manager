import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import {Admin} from './../class/admin';
import {LoginService} from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

  constructor(private service:LoginService,public http:Http,public router:Router ) { }

  ngOnInit() {}

  public message:string="";
  public admin:Admin=new Admin();

  doLogin(){
    this.service.login(this.http,this.admin,()=>{this.router.navigateByUrl('/center')},msg=>this.message=msg);
  }

}
