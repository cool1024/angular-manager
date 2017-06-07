import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RequestPost, RequestGet, HtmlPost } from './class/request';
import { Storage } from './class/storage';
import { Admin } from './class/admin';
import { Menu } from './class/menu';
import { AdminService } from './page/admin/admin.service';
import { RequesterService } from './service/requester.service';

@Injectable()

export class AppService {

  constructor(private toastService: ToastrService, public router: Router, public http: Http, private requesteServicer: RequesterService) { }

  //获取用户菜单
  menus(success: Function): void {
    this.requesteServicer.get('/admin/dynamicmenu', {}, res => {
      res.result ? success(res.datas) : this.toastService.warning(res.message, "失败消息");
    });
  }

  //校验用户登入
  checkAuth(success: Function, error?: Function): void {
    var error: Function = error || function () { };
    //校验本地数据
    if (Storage.checkToken()) {
      this.requesteServicer.get('/admin/info', {}, res => { res.result ? success(res.datas) : error(); })
      let request = new RequestGet(this.http, error);
    }
    else {
      error();
    }
  }

  //管理员修改个人信息
  changeAdminInfo(admin: Admin, success: Function): void {
    this.requesteServicer.post('/admin/change/self', { password: admin.password }, json => {
      json.result ? success() : this.toastService.warning(json.message, "失败消息");
    });
  }

  //退出登入
  out(callback:Function): void {
    this.requesteServicer.get('/admin/logout', {}, res => {
      this.toastService.info(res.message, "提示信息");
      Storage.cleanToken();
      callback();
      this.router.navigateByUrl('/login');
    });
  }

  //数据重载
  reloadApp(): void {
    let that = this;
    AppService.menu.splice(0, AppService.menu.length) 
    this.checkAuth(datas => {
      AppService.admin.id = datas.id;
      AppService.admin.account = datas.account;
    }, () => { that.router.navigateByUrl('/login') });
    this.menus(datas => {
      datas.forEach(function (e) {
        AppService.menu.push(new Menu(e.mainmenu.id, e.mainmenu.title, e.mainmenu.parentid, e.mainmenu.url, e.mainmenu.ico, e.childmenulist));
      });
    });
  }

  //菜单载入
  loadMenus(): void {
    AppService.menu.splice(0, AppService.menu.length);
    this.menus(datas => {
      datas.forEach(function (e) {
        AppService.menu.push(new Menu(e.mainmenu.id, e.mainmenu.title, e.mainmenu.parentid, e.mainmenu.url, e.mainmenu.ico, e.childmenulist));
      });
    });
  }

  public static admin: Admin = new Admin();
  public static menu: Menu[] = new Array<Menu>();
}