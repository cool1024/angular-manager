import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestPost, RequestGet, HtmlPost } from './class/request';
import { Storage } from './class/storage';
@Injectable()
export class AppService {

  constructor() { }

  //获取用户菜单
  menus(http: Http, success: Function): void {
    let reqeust = new RequestGet(http);
    reqeust.send('/menu/list', {}, json => {
      json.result ? success(json.datas) : alert(json.message);
    });
  }

  //校验用户登入(成功提供用户信息回调方法,如果本地数据校验成功返回false)
  checkAuth(http: Http, success: Function, error?: Function): void {
    var error: Function = error || function () { };
    //校验本地数据
    if (Storage.checkToken()) {
      let reqeust = new RequestGet(http, error);
      reqeust.send('/admin/info', {}, json => { json.result ? success(json.datas) : error(); }, );
    }
    else {
      error();
    }
  }
}