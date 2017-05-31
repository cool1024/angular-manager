import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestPost, RequestGet, HtmlPost } from './../class/request';
@Injectable()
export class RoleService {

  constructor() { }

  roles(http: Http, success: Function): void {
    let reqeust = new RequestGet(http);
    reqeust.send('/role/list', {}, json => {
      json.result ? success(json.datas) : alert(json.message);
    });
  }

}
