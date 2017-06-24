import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from './app.service';
import { Menu } from './class/menu';
import { Admin } from './class/admin';
import { Config } from './class/config';
import { RequesterService } from './service/requester.service';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService,RequesterService,StorageService]

})
export class AppComponent implements OnInit {

  //菜单折叠状态
  public isCollapsed: boolean[] = new Array<boolean>(false);

  //设置菜单状态
  public isMenuShow: boolean = false;

  //设置菜单样式
  public isMenuSmall = false;

  //是否显示左侧菜单
  public isMenuPadShow: boolean = true;

  //菜单列表
  public menus: Menu[] = AppService.menu;

  //当前登入的管理员
  public admin: Admin = AppService.admin;

  //管理员修改面板数据
  public temp: Admin = new Admin();

  //系统配置
  public config = Config.SYSTEM_SETTING;

  //资源路径
  public source = Config.SOURCE_URL;

  constructor(private ngbModal: NgbModal, public service: AppService, public router: Router) { }

  ngOnInit() {
    this.service.reloadApp();
  }

  //弹出管理员信息面板
  showAdminInfo(content: any): void {
    this.temp = new Admin(this.admin.id, this.admin.account, "", this.admin.role);
    this.ngbModal.open(content, { size: 'lg' });
  }

  //修改管理员信息
  changeAdminInfo(): void {
    this.service.changeAdminInfo(this.temp, () => {
      this.admin = this.temp;
      this.temp = new Admin();
    })
  }

  //退出登入
  signOut(): void {
    this.service.out(() => {
      this.admin.account="";
      this.admin.role.name="";
    })
  }

  //折叠菜单
  collapseClose(index: number): void {
    for (let i: number = 1; i < this.isCollapsed.length - 1; i++) {
      if (i != index) this.isCollapsed[i] = false;
    }
  }
}
