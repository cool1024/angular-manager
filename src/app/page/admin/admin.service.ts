import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { RequestPost, RequestGet, HtmlPost } from './../../class/request';
import { Admin } from './../../class/admin';
import { RequesterService } from './../../service/requester.service';
import { StorageService } from './../../service/storage.service';

@Injectable()

export class AdminService {

  constructor(private toastService: ToastrService, private requesterService: RequesterService, private http: Http) { }

  //添加新账号
  add(admin: Admin, success: Function): void {
    this.requesterService.add('/admin/add', { account: admin.account, password: admin.password, role: admin.role.id }, success);
  }

  //获取所有账号
  list(success: Function, params: any): void {
    this.requesterService.list('/admin/list', params, success);
  }

  //修改账号
  change(admin: Admin, success: Function): void {
    this.requesterService.update('/admin/update', { id: admin.id, password: admin.password, role: admin.role.id }, success);
  }

  //删除账号
  delete(id:number,success:Function):void{
    this.requesterService.delete('/admin/delete',{id:id},success);
  }
}
