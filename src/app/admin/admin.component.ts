import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Admin } from "./../class/admin";
import { Role } from "./../class/role";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    let that=this;
    this.admin = new Admin();
    this.temp = new Admin();
    this.admins=new Array<Admin>();

    //载入角色列表

    //载入账户列表
    that.admins.push(new Admin(1,'admin','123456789',new Role()));
  }

  //处于活跃状态的admin
  public admin: Admin;

  //用户表单编辑的admin
  public temp: Admin;

  //账户列表admins
  public admins:Admin[];

  //弹出添加面板
  showAddPad(content: any): void {
    this.temp = new Admin();
    this.modalService.open(content, { size: 'lg' }).result.then(result => { }, reason => { });
  }

  //弹出修改面板
  showChangePad(content: any, admin: Admin):void {
    this.temp = new Admin(admin.id, admin.account, admin.password, admin.role);
    this.admin=admin;
    this.modalService.open(content, { size: 'lg' }).result.then(result => { }, reson => { });
  }

  //删除账号
  removeAdmin(admin:Admin):void{
    this.admins.splice(this.admins.indexOf(admin),1);
  }

  //添加账号
  addAdmin(){
    this.admins.push(new Admin(this.temp.id,this.temp.account,this.temp.password,this.temp.role));
  }

  //修改账号
  changeAdmin(){
    this.admin=
  }
}
