import { Injectable } from '@angular/core';
import { Token } from './../class/token'

@Injectable()
export class StorageService {

  constructor() { }

  //获取Token数据
  getToken(): Token {
    return new Token(localStorage.getItem('account'), localStorage.getItem('token'));
  }

  //更新Token数据
  updateToken(data?: Token): void {
    localStorage.setItem('account', data.account);
    localStorage.setItem('token', data.token);
  }

  //检查本地Token数据是否存在
  checkToken(): boolean {
    return localStorage.getItem('account') && localStorage.getItem('token') ? true : false;
  }

  //清空本地Token数据
  cleanToken(): void {
    localStorage.clear();
  }
}
