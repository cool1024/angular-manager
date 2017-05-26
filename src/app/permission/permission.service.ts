import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestPost, RequestGet, HtmlPost } from './../class/request';

@Injectable()
export class PermissionService {

  constructor() { }

  permissions(http: Http, success: Function): void {
    let reqeust = new RequestGet(http);
    reqeust.send('/permission/list', {}, json => {
      json.result ? success(json.datas) : alert(json.message);
    });
  }
  change(http: Http, params): void {
    let reqeust = new RequestPost(http);
    reqeust.send('/permission/change', params, json => {
       alert(json.message);
    });
  }
}
