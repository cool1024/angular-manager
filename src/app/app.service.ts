import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RequestPost, RequestGet, HtmlPost } from './class/request';
import { Storage } from './class/storage';
import { Admin } from './class/admin';
import { Menu } from './class/menu';
import { AdminService } from './page/admin/admin.service';

@Injectable()

export class AppService {

  constructor(private toastService: ToastrService, public router: Router, public http: Http) { }

  //获取用户菜单
  menus(http: Http, success: Function): void {
    let request = new RequestGet(http);
    request.message(this.toastService);
    request.send('/menu/list', {}, json => {
      json.result ? success(json.datas) : this.toastService.warning(json.message, "失败消息");
    });
  }

  //校验用户登入
  checkAuth(http: Http, success: Function, error?: Function): void {
    var error: Function = error || function () { };
    //校验本地数据
    if (Storage.checkToken()) {
      let request = new RequestGet(http, error);
      request.message(this.toastService);
      request.send('/admin/info', {}, json => { json.result ? success(json.datas) : error(); }, );
    }
    else {
      error();
    }
  }

  //管理员修改个人信息
  changeAdminInfo(http: Http, admin: Admin, success: Function): void {
    let request = new RequestPost(http);
    request.message(this.toastService);
    request.send('/admin/change/self', { password: admin.password }, json => {
      json.result ? success() : this.toastService.warning(json.message, "失败消息");
    });
  }

  //退出登入
  out(http: Http, callback: Function): void {
    let request = new RequestGet(http);
    request.message(this.toastService);
    request.send('/admin/logout', {}, json => { this.toastService.success("退出成功", "操作成功") });
    Storage.cleanToken();
    this.router.navigateByUrl('/login');
  }

  //数据重载
  reloadApp(http: Http): void {
    let that = this;
    AppService.menu.splice(0, AppService.menu.length)
    this.checkAuth(http, datas => {
      AppService.admin.id = datas.id;
      AppService.admin.account = datas.account;
    }, () => { that.router.navigateByUrl('/login') });
    this.menus(http, datas => {
      datas.forEach(function (e) {
        AppService.menu.push(new Menu(e.mainmenu.id, e.mainmenu.title, e.mainmenu.parentid, e.mainmenu.url, e.mainmenu.ico, e.childmenulist));
      });
    });
  }

  public static admin: Admin = new Admin();
  public static menu: Menu[] = new Array<Menu>();
}