import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestPost, RequestGet, HtmlPost } from './../class/request';
@Injectable()
export class MenuService {

  constructor() { }

  menus(http: Http, success: Function): void {
    let reqeust = new RequestGet(http);
    reqeust.send('/menu/list', {}, json => {
      json.result ? success(json.datas) : alert(json.message);
    });
  }

  change(http: Http, params: any, success: Function): void {
    let reqeust = new RequestPost(http);
    reqeust.send('/menu/change', params, json => {
      alert(json.message);
    });
  }
}
