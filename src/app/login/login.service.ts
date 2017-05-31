import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { RequestPost, RequestGet, HtmlPost } from './../class/request';
import { Storage } from './../class/storage';
import { Admin } from './../class/admin';
@Injectable()
export class LoginService {

  constructor(private toastService:ToastrService) { }

  //用户登入
  login(http: Http, admin: Admin, success: Function, error: Function): void {
    let reqeust = new RequestPost(http);
    reqeust.message(this.toastService);
    reqeust.send('/admin/login', { account: admin.account, password: admin.password }, json => {
      if (json.result) {
        //更新本地Token
        Storage.updateToken({ account: admin.account, token: json.datas.token });
        success();
      }
      else {
        error(json.message);
      }
    });
  }
}
