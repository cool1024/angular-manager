import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Admin } from "./../../class/admin";
import { Role } from "./../../class/role";
import { AdminService } from './admin.service';
import { RoleService } from './../role/role.service';
import { Http } from '@angular/http';
import { RequesterService } from './../../service/requester.service';
import { StorageService } from './../../service/storage.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AdminService, RoleService, RequesterService, StorageService]
})
export class AdminComponent implements OnInit {

  constructor(private modalService: NgbModal, private service: AdminService, private roleService: RoleService, public http: Http) { }

  ngOnInit() {
    let that = this;
    this.admin = new Admin();
    this.temp = new Admin();
    this.admins = new Array<Admin>();

    //载入角色列表
    this.roleService.roles(datas => {
      let that = this;
      this.roles = new Array<Role>();
      datas.forEach(element => {
        that.roles.push(element);
      });
    });

    //载入账户列表
    this.service.list(datas => {
      this.totalItems = datas.total;
      for (var i = 0; i < datas.rows.length; i++) {
        let temp = datas.rows[i];
        this.admins.push(new Admin(temp.id, temp.account, "", new Role(temp.roleid, temp.role), temp.createtime));
      }
    }, { offset: 0, limit: this.limilCount });
  }

  //角色列表
  public roles: Role[];

  //处于活跃状态的admin
  public admin: Admin;

  //用户表单编辑的admin
  public temp: Admin;

  //账户列表admins
  public admins: Admin[];

  //分页参数
  public totalItems: number = 0;//数据总量
  public currentPage: number = 0;//当前页码
  public smallnumPages: number = 0;
  public limilCount: number = 10;//每页显示数量

  //弹出添加面板
  showAddPad(content: any): void {
    this.temp = new Admin();
    this.modalService.open(content, { size: 'lg' }).result.then(result => { }, reason => { });
  }

  //弹出修改面板
  showChangePad(content: any, admin: Admin): void {
    this.temp = new Admin(admin.id, admin.account, admin.password, admin.role);
    this.admin = admin;
    this.modalService.open(content, { size: 'lg' }).result.then(result => { }, reson => { });
  }

  //删除账号
  removeAdmin(admin: Admin): void {
    this.service.delete(admin.id, () => {
      this.admins.splice(this.admins.indexOf(admin), 1);
    })
  }

  //添加账号
  addAdmin() {
    this.service.add(this.temp, id => {
      this.admins.push(new Admin(id, this.temp.account, this.temp.password, this.roleService.get(this.temp.role.id, this.roles)));
    });
  }

  //修改账号
  changeAdmin() {
    this.service.change(this.temp, () => {
      this.admin.role = this.roleService.get(this.temp.role.id, this.roles);
    });
  }

  //换页方法
  pageChanged($event) {
    this.service.list(datas => {
      this.totalItems = datas.total;
      this.admins = new Array<Admin>();
      for (var i = 0; i < datas.rows.length; i++) {
        let temp = datas.rows[i];
        this.admins.push(new Admin(temp.id, temp.account, "", new Role(temp.roleid, temp.role), temp.createtime));
      }
    }, { offset: ($event.page - 1) * this.limilCount, limit: this.limilCount });
  }
}
