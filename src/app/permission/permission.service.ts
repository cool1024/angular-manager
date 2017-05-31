import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { RequestPost, RequestGet, HtmlPost } from './../class/request';

@Injectable()
export class PermissionService {

  constructor(private toastService: ToastrService) { }

  permissions(http: Http, success: Function): void {
    let request = new RequestGet(http);
    request.message(this.toastService);
    request.send('/permission/list', {}, json => {
      json.result ? success(json.datas) : this.toastService.warning(json.message, "失败消息");
    });
  }
  change(http: Http, params): void {
    let request = new RequestPost(http);
    request.message(this.toastService);
    request.send('/permission/change', params, json => this.toastService.info(json.message, "提示消息"));
  }
}
