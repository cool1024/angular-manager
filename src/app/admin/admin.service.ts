import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { RequestPost, RequestGet, HtmlPost } from './../class/request';
import { Admin } from './../class/admin';

@Injectable()

export class AdminService {

  constructor(private toastService: ToastrService) { }

  //添加新账号
  add(http: Http, admin: Admin, success: Function, error: Function): void {
    let reqeust = new RequestPost(http);
    reqeust.message(this.toastService);
    reqeust.send('/admin/add', { account: admin.account, password: admin.password }, json => { json.result ? success() : this.toastService.warning(json.message, "失败消息"); });
  }

  //获取所有账号
  list(http: Http, success: Function): void {
    let reqeust = new RequestGet(http);
    reqeust.message(this.toastService);
    reqeust.send('/admin/list', {}, json => { json.result ? success(json.datas) : this.toastService.warning(json.message, "失败消息"); });
  }
}
