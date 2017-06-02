import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http'
import { ToastrService } from 'ngx-toastr';
import { StorageService } from './../service/storage.service';
import { Token } from './../class/token';
import { Config } from './../class/config';

@Injectable()
export class RequesterService {

  constructor(private http: Http, private toastrService: ToastrService, private storageService: StorageService) { }

  //数据提交
  post(url: string, params: any, success: Function = new Function(), final: Function = new Function()): void {
    let options: RequestOptions = new RequestOptions(this.getHeaders());
    this.http.post(Config.SERVER_URL + url, params, options).subscribe(res => { success(res.json()); final() }, res => { this.toastrService.error("请求失败", "服务器错误"); final(); });
  }

  //数据获取
  get(url: string, params: any, success: Function = new Function(), final: Function = new Function()): void {
    let options: RequestOptions = new RequestOptions(this.getHeaders());
    this.http.get(Config.SERVER_URL + url + '?' + this.parse(params), options).subscribe(res => { success(res.json()); final() }, res => { this.toastrService.error("请求失败", "服务器错误"); final(); });
  }

  //修改请求
  update(url: string, params: any, success: Function): void {
    let options: RequestOptions = new RequestOptions(this.getHeaders());
    this.http.put(Config.SERVER_URL + url, params, options).subscribe(res => { let json: any = res.json(); if (json.result) { this.toastrService.success(json.message, "操作成功"); success(json); } else { this.toastrService.warning(json.message, "失败消息"); } }, res => { this.toastrService.error("请求失败", "服务器错误"); });
  }

  //删除请求
  delete(url: string, params: any, success: Function): void {
    let options: RequestOptions = new RequestOptions(this.getHeaders());
    this.http.delete(Config.SERVER_URL + url + '?' + this.parse(params), options).subscribe(res => { let json: any = res.json(); if (json.result) { this.toastrService.success(json.message, "操作成功"); success(json); } else { this.toastrService.warning(json.message, "失败消息"); } }, res => { this.toastrService.error("请求失败", "服务器错误"); });
  }

  //添加请求
  add(url: string, params: any, success: Function) {
    let options: RequestOptions = new RequestOptions(this.getHeaders());
    this.http.post(Config.SERVER_URL + url, params, options).subscribe(res => { let json: any = res.json(); if (json.result) { this.toastrService.success(json.message, "操作成功"); success(json.datas.id); } else { this.toastrService.warning(json.message, "失败消息"); } }, res => { this.toastrService.error("请求失败", "服务器错误"); });
  }

  parse(json: any): string {
    let key: any;
    let query: string[] = new Array<string>();
    for (key in json) {
      query.push(key + "=" + json[key]);
    }
    return query.join('&');
  }

  getHeaders(): Headers {
    let token: Token = this.storageService.getToken();
    let headers = new Headers();
    headers.append('authorization', token.account);
    headers.append('content-type', token.token);
    return headers;
  }

}
