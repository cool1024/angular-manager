import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { RequestPost, RequestGet, HtmlPost } from './../class/request';

@Injectable()

export class MenuService {

  constructor(private toastService: ToastrService) { }

  menus(http: Http, success: Function): void {
    let reqeust = new RequestGet(http);
    reqeust.send('/menu/list', {}, json => {
      json.result ? success(json.datas) : this.toastService.warning(json.message, "失败消息");
    });
  }

  change(http: Http, params: any, success: Function): void {
    let reqeust = new RequestPost(http);
    reqeust.send('/menu/change', params, json => this.toastService.warning(json.message, "失败消息"));
  }
}
