import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Admin} from './../class/admin';
import {LoginService} from './login.service';
import {AppService} from './../app.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService,AppService]
})
export class LoginComponent implements OnInit {

  constructor(private service:LoginService,public http:Http,public router:Router,private appService:AppService ) { }

  ngOnInit() {}

  public message:string="";
  public admin:Admin=new Admin();

  doLogin(){
    this.service.login(this.http,this.admin,()=>{this.router.navigateByUrl('/center');this.appService.reloadApp(this.http);},msg=>this.message=msg);
  }

}
