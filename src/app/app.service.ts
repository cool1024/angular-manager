import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestPost, RequestGet, HtmlPost } from './class/request';
@Injectable()
export class AppService {

  constructor() { }

  menus(http: Http, success: Function): void {
    let reqeust = new RequestGet(http);
    reqeust.send('/menu/list', {}, json => {
      json.result ? success(json.datas) : alert(json.message);
    });
  }

}