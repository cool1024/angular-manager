import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { RequesterService } from './../../service/requester.service';
import { Permission } from './../../class/permission';

@Injectable()

export class PermissionService {

  constructor(private toastrService: ToastrService, private requesterService: RequesterService, private http: Http) { }

  //获取权限列表
  permissions(success: Function): void {
    this.requesterService.list('/permission/list', {}, success);
  }

  //修改指定权限
  change(permission: Permission, success: Function): void {
    this.requesterService.update('/permission/update', permission, res => success());
  }

  //添加权限
  add(permission: Permission, success: Function): void {
    this.requesterService.add('/permission/add', permission, res => success(res));
  }

  //删除权限
  delete(id: number, success: Function): void {
    this.requesterService.delete('/permission/delete', { id: id }, res => success());
  }

  gets(ids: number[], list: Permission[]): Permission[] {
    let permissions: Permission[] = new Array<Permission>();
    ids.forEach(id => {
      list.forEach(pem => {
        if (pem.id = id) { permissions.push(pem) }
      });
    });
    return permissions;
  }

}
