import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Permission, PermissionArray } from './../class/permission';
import { PermissionService } from './permission.service';
@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css'],
  providers: [PermissionService]
})
export class PermissionComponent implements OnInit {

  public items=[1,2,3,4];

  constructor(private modalService: NgbModal, public http: Http, private service: PermissionService) { }

  ngOnInit() {
    this.service.permissions(this.http, datas => {
      let permissions = new Array<PermissionArray>();
      datas.forEach(e => {
        permissions.push(new PermissionArray(e.menu_id,e.menu_name,e.menu_ico,e.permissions,e.child_menus));
      });
      this.permissions = permissions;
    });
  }

  //权限列表
  public permissions: PermissionArray[];

  //活跃状态的权限模块
  public permissionArray: PermissionArray=new PermissionArray();

  //权限模型
  public permission: Permission = new Permission();

  //修改权限模型
  public update: Permission;

  //弹出添加权限菜单
  showAddPad(permissionArray: PermissionArray, content: any): void {
    this.permissionArray = permissionArray;
    this.modalService.open(content, { size: 'sm' }).result.then(
      (result) => { },
      (reason) => { }
    );
  }

  //弹出修改权限菜单
  showChangePad(permissionArray: PermissionArray,permission: Permission, content: any): void {
    this.permissionArray = permissionArray;
    this.update = permission;
    this.permission.title = this.update.title;
    this.permission.key = this.update.key;
    this.permission.child_menuid = this.update.child_menuid;
    this.modalService.open(content, { size: 'sm' }).result.then(
      (result) => { },
      (reason) => { }
    );
  }

  //添加权限
  addPermission() {
    this.permissionArray.permissions.push(this.permission);
    this.permission = new Permission();
  }

  //移除权限
  removePermission(permissionArray: PermissionArray, permission: Permission) {
    permissionArray.permissions.splice(permissionArray.permissions.indexOf(permission), 1)
  }

  //修改权限
  changePermission() {
    this.update.title = this.permission.title;
    this.update.child_menuid = this.permission.child_menuid;
    this.update.key = this.permission.key;
    this.permission = new Permission();
  }

  //提交权限修改
  confirmPermission(){
    this.service.change(this.http,{permissions:JSON.stringify(this.permissions)});
  }

}
