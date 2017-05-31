import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Role } from './../class/role'
import { Permission, PermissionArray } from './../class/permission'
import { RoleService } from './role.service'
import { PermissionService } from './../permission/permission.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  providers: [RoleService, PermissionService]
})
export class RoleComponent implements OnInit {

  constructor(private modalService: NgbModal, private service: RoleService, private permissionService: PermissionService, public http: Http) { }

  ngOnInit() {

    //获取权限列表
    this.permissionService.permissions(this.http, datas => {
      let that = this;
      datas.forEach(e => {
        that.permissionArrays.push(new PermissionArray(e.menu_id, e.menu_name, e.menu_ico, e.permissions, e.child_menus));
      });
    });

    //获取所有角色
    this.service.roles(this.http, datas => {
      let that = this;
      datas.forEach(e => {
        that.roles.push(new Role(e.id, e.name, e.permissions, e.parentid));
      });
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
    this.temp = new Role(role.id, role.name, role.permissions);
    this.modalService.open(content, { size: 'lg' }).result.then(result => { }, reason => { });
  }

  //弹出添加面板
  showAddPad(content: any): void {
    this.temp=new Role();
    this.modalService.open(content, { size: 'lg' }).result.then(result => { }, reason => { });
  }

  //添加角色
  addRole():void{
    console.log(this.temp);
  }

  //权限设置
  permissionSet($event:any){
    this.temp.checkbox($event);
  }
}
