import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Role } from './../../class/role'
import { Permission, PermissionArray } from './../../class/permission'
import { RoleService } from './role.service'
import { PermissionService } from './../permission/permission.service';
import { RequesterService } from './../../service/requester.service';
import { StorageService } from './../../service/storage.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  providers: [RoleService, PermissionService, RequesterService, StorageService]
})

export class RoleComponent implements OnInit {

  constructor(private modalService: NgbModal, private service: RoleService, private permissionService: PermissionService) { }

  ngOnInit() {

    //获取权限模块列表
    this.permissionService.permissions(datas => {
      let that = this;
      datas.forEach(e => {
        that.permissionArrays.push(new PermissionArray(e.menu_id, e.menu_name, e.menu_ico, e.permissions, e.child_menus));
      })
    });

    //获取所有角色
    this.service.roles(datas => {
      let that = this;
      //获取所有角色列表
      datas.forEach(e => {
        that.roles.push(new Role(e.id, e.name, e.description, e.permissions, e.parentid));
        that.roles[that.roles.length - 1].permissions.forEach(e => {
          that.roles[that.roles.length - 1].checkbox_value.push(e.id);
        })
      });
      //设置上级角色
      for (var i = 0; i < this.roles.length; i++) {
        for (var j = 0; j < this.roles.length; j++) {
          if (this.roles[j].id == this.roles[i].parentid) {
            this.roles[i].parent = this.roles[j];
          }
        }
        if (this.roles[i].parent == undefined) this.roles[i].parent = new Role();
      }
    });
  }

  //角色列表
  public roles: Role[] = new Array<Role>();

  //面板显示角色
  public temp: Role = new Role();

  //正在编辑的角色
  public role: Role = new Role();

  //权限列表
  public permissionArrays = new Array<PermissionArray>();

  //弹出修改面板
  showChangePad(content: any, role: Role): void {
    this.role = role;
    this.temp = new Role(role.id, role.name, role.description, role.permissions, role.parentid, role.parent);
    this.temp.checkbox_value = role.checkbox_value.concat();
    this.modalService.open(content, { size: 'lg' });
  }

  //弹出添加面板
  showAddPad(content: any, parent: Role = new Role()): void {
    this.temp = new Role();
    this.temp.parentid = parent.id;
    this.temp.parent = parent;
    this.modalService.open(content, { size: 'lg' });
  }

  //添加角色
  addRole(): void {
    this.service.add(this.temp, id => {
      //this.permissionService.gets(this.temp.checkbox_value, this.);
      this.temp.id = id;
      this.roles.push(this.temp);
    })
  }

  //删除角色
  deleteRole(role: Role): void {
    this.service.delete(role.id, () => {
      this.roles.splice(this.roles.indexOf(role), 1);
      //置0所有parentid是删除角色的角色
      for (var i = 0; i < this.roles.length; i++) {
        if (this.roles[i].parentid == role.id) {
          this.roles[i].parent = new Role();
          this.roles[i].parentid = 0;
        }
      }
    });
  }

  //修改角色
  changeRole(): void {
    this.service.change(this.temp, () => {
      this.role.name = this.temp.name;
      this.role.description = this.temp.description;
      this.role.parentid = this.temp.parentid;
      this.role.checkbox_value = this.temp.checkbox_value;
    })
  }

  //权限设置
  permissionSet($event: any) {
    this.temp.checkbox($event);
  }
}
