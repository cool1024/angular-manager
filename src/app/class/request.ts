import { HttpModule, Http, Response, RequestOptions, Headers } from '@angular/http';
import { Config } from './config';
import { Storage } from './storage';
export class RequestPost {
    constructor(public http: Http, public error?: Function) {
        this.error = error || function () { alert("请求失败"); };
    }
    send(url: string, params: any, success: Function, final?: Function) {
        var final: Function = final || function () { };
        var success: Function = success || function () { };
        let headers = new Headers();
        headers.append('authorization', Storage.insertToken().account);
        headers.append('content-type', Storage.insertToken().token);
        let options = new RequestOptions({ headers: headers });
        this.http.post(Config.SERVER_URL + url, params).subscribe(res => { success(res.json()); final() }, res => { this.error(); final(); });
    }
}
export class RequestGet {
    constructor(public http: Http, public error?: Function) {
        this.error = error || function () { alert("请求失败"); };
    }
    send(url: string, params: any, success: Function, final?: Function) {
        var final: Function = final || function () { };
        var success: Function = success || function () { };
        let headers = new Headers();
        headers.append('authorizatioN', Storage.insertToken().account);
        headers.append('content-type', Storage.insertToken().token);
        let options = new RequestOptions({ headers: headers });
        this.http.get(Config.SERVER_URL + url + '?' + this.parse(params), options).subscribe(res => { success(res.json()); final() }, res => { this.error(); final(); });
    }
    parse(json: any) {
        var key: any;
        var query: string[] = [];
        for (key in json) {
            query.push(key + "=" + json[key]);
        }
        return query.join('&');
    }
}
export class HtmlPost {
    method: string;
    url: string;
    suc: Function;
    err: Function;
    formData = new FormData();
    constructor(method: string, url: string, suc: Function, err: Function) {
        this.url = url;
        this.method = method;
        this.suc = suc;
        this.err = err;
    }
    append(key, value): void {
        this.formData.append(key, value);
    }
    files(key, files): void {
        for (var i = 0; i < files.length; i++) {
            this.append(key + i, files[i]);
        }
        this.append(key, files.length);
    }
    send(): void {
        var http = new XMLHttpRequest();
        var suc = this.suc;
        var err = this.err;
        http.open(this.method, Config.SERVER_URL + this.url, true);
        http.onload = function (data) {
            (http.readyState == 4 || http.status == 200) ? suc(http.responseText) : err();
        }
        http.onerror = function () { err() };
        http.send(this.formData);
    }
    params(json: any): HtmlPost {
        var key: any;
        var query: string[] = [];
        for (key in json) {
            this.append(key, json[key]);
        }
        return this;
    }
}