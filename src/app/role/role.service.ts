import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { RequestPost, RequestGet, HtmlPost } from './../class/request';

@Injectable()

export class RoleService {

  constructor(private toastService: ToastrService) { }

  roles(http: Http, success: Function): void {
    let request = new RequestGet(http);
    request.message(this.toastService);
    request.send('/role/list', {}, json => {
      json.result ? success(json.datas) : this.toastService.warning(json.message, '失败消息');
    });
  }

}
