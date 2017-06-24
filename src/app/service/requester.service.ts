import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from './../service/storage.service';
import { Token } from './../class/token';
import { Config } from './../class/config';

@Injectable()
export class RequesterService {

  constructor(private http: Http, private toastrService: ToastrService, private storageService: StorageService, private router: Router) { }

  //数据提交
  post(url: string, params: any, success: Function = new Function(), final: Function = new Function()): void {
    let options: RequestOptions = new RequestOptions({ headers: this.getHeaders() });
    this.http.post(Config.SERVER_URL + url, params, options).subscribe(res => { success(res.json()); final() }, res => { this.toastrService.error("请求失败", "服务器错误"); final(); });
  }

  //数据获取
  get(url: string, params: any, success: Function = new Function(), final: Function = new Function()): void {
    let options: RequestOptions = new RequestOptions({ headers: this.getHeaders() });
    this.http.get(Config.SERVER_URL + url + '?' + this.parse(params), options).subscribe(res => { success(res.json()); final() }, res => { this.toastrService.error("请求失败", "服务器错误"); final(); });
  }

  //list方法
  list(url: string, params: any, success: Function): void {
    this.get(url, params, res => {
      if (res.message == "AUTH ERROR") {
        this.router.navigateByUrl('error');
        return;
      }
      res.result ? success(res.datas) : this.toastrService.warning(res.message, "失败消息");
    });
  }

  //分页请求
  page(url: string, params: { offset: number, limit: number, search?: string, order?: string }, success: Function): void {
    this.list(url, params, success);
  }

  //修改请求
  update(url: string, params: any, success: Function): void {
    let options: RequestOptions = new RequestOptions({ headers: this.getHeaders() });
    this.http.put(Config.SERVER_URL + url, params, options).subscribe(res => { let json: any = res.json(); if (json.result) { this.toastrService.success(json.message, "操作成功"); success(json); } else { this.toastrService.warning(json.message, "失败消息"); } }, res => { this.toastrService.error("请求失败", "服务器错误"); });
  }

  //删除请求
  delete(url: string, params: any, success: Function): void {
    let options: RequestOptions = new RequestOptions({ headers: this.getHeaders() });
    this.http.delete(Config.SERVER_URL + url + '?' + this.parse(params), options).subscribe(res => { let json: any = res.json(); if (json.result) { this.toastrService.success(json.message, "操作成功"); success(json); } else { this.toastrService.warning(json.message, "失败消息"); } }, res => { this.toastrService.error("请求失败", "服务器错误"); });
  }

  //添加请求
  add(url: string, params: any, success: Function): void {
    let options: RequestOptions = new RequestOptions({ headers: this.getHeaders() });
    this.http.post(Config.SERVER_URL + url, params, options).subscribe(res => { let json: any = res.json(); if (json.result) { this.toastrService.success(json.message, "操作成功"); success(json.datas.id); } else { this.toastrService.warning(json.message, "失败消息"); } }, res => { this.toastrService.error("请求失败", "服务器错误"); });
  }

  //排序请求
  sort(url: string, params: any): void {
    this.post(url, params, res => res.result ? this.toastrService.success('操作成功', '成功消息') : this.toastrService.warning('操作失败', '请求失败'));
  }

  //json文件获取
  json(url: string, success: Function): void {
    this.http.get(url).subscribe(res => success(res.json()));
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
    headers.append('ng-params-one', token.account);
    headers.append('ng-params-two', token.token);
    return headers;
  }

  //文件上传
  upload(url: string, files: { key: string, file: Blob }[], params: {}, success?: Function, doing: Function = new Function()): void {
    let requester: XMLHttpRequest = new XMLHttpRequest();
    let formData: FormData = new FormData();
    let token: Token = this.storageService.getToken();
    for (var key in params) formData.append(key, params[key]);
    for (var key in files) formData.append(files[key].key, files[key].file);
    requester.open('post', Config.SERVER_URL + url, true);
    requester.setRequestHeader('ng-params-one', token.account);
    requester.setRequestHeader('ng-params-two', token.token);
    requester.addEventListener('error', () => this.toastrService.error("请求失败"));
    requester.addEventListener('progress', e => doing(Math.round(e.loaded * 100 / e.total)));
    requester.addEventListener('load', e => { (requester.readyState == 4 && requester.status == 200) ? success(JSON.parse(requester.responseText)) : this.toastrService.warning("数据传输异常") });
    requester.send(formData);
  }

}
