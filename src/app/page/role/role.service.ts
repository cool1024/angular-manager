import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { RequesterService } from './../../service/requester.service';
import { Role } from './../../class/role'

@Injectable()

export class RoleService {

  constructor(private toastrService: ToastrService, private requesterService: RequesterService) { }

  roles(success: Function): void {
    this.requesterService.get('/role/list', {}, res => success(res.datas));
  }

  add(role: Role, success: Function): void {
    this.requesterService.add('/role/add', { name: role.name, description: role.description, permissions: role.checkbox_value.join(), parentid: role.parentid }, id => success(id));
  }

  delete(id: number, success: Function): void {
    this.requesterService.delete('/role/delete', { roleid: id }, success);
  }

  change(role: Role, success: Function): void {
    this.requesterService.update('/role/update', { id: role.id, name: role.name, description: role.description, parentid: role.parentid, permissions: role.checkbox_value.join() }, success);
  }

  get(id: number, roles: Role[]): Role {
    let role = new Role(id);
    for (var i = 0; i < roles.length; i++) {
      if (roles[i].id == id) role.name = roles[i].name
    }
    return role;
  }

}
