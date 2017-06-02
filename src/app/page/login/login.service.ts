import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { RequesterService } from './../../service/requester.service';
import { StorageService } from './../../service/storage.service';
import { Admin } from './../../class/admin';
@Injectable()
export class LoginService {

  constructor(private toastService: ToastrService, private requesterService: RequesterService, private storageService: StorageService) { }

  //用户登入接口
  login(admin: Admin, success: Function, error: Function): void {
    this.requesterService.post('/admin/login', { account: admin.account, password: admin.password }, res => {
      if (res.result) {
        this.storageService.updateToken({ account: admin.account, token: res.datas.token });
        success();
      }
      else {
        error(res.message);
      }
    });
  }
}
