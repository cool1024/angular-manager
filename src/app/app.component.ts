import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { Menu } from './class/menu';
import { Admin } from './class/admin';
import { Config } from './class/config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]

})
export class AppComponent implements OnInit {

  //菜单折叠状态
  public isCollapsed: boolean[] = new Array<boolean>(false);

  //设置菜单状态
  public isMenuShow: boolean = false;

  //是否显示左侧菜单
  public isMenuPadShow: boolean = true;

  //菜单列表
  public menus: Menu[] = new Array<Menu>();

  //当前登入的管理员
  public admin: Admin = new Admin();

  //系统配置
  public config = Config.SYSTEM_SETTING;

  //资源路径
  public source = Config.SOURCE_URL;

  constructor(public service: AppService, public http: Http, public router: Router) { }

  ngOnInit() {

    //校验登入
    this.service.checkAuth(this.http, info => {
      this.isMenuPadShow = true;
      this.admin.account = info.account;
      this.admin.thumb = info.thumb;
    }, () => {
      this.router.navigateByUrl('/login');
    })

    //载入菜单
    let menus: Menu[] = new Array<Menu>();
    let isCollapsed = new Array<boolean>(false);
    this.service.menus(this.http, datas => {
      datas.forEach(function (e) {
        menus.push(new Menu(e.mainmenu.title, e.mainmenu.ico, e.mainmenu.url, e.level, e.childmenulist));
        isCollapsed.push(false);
      });
      this.isCollapsed = isCollapsed;
      this.menus = menus;
    });
  }
}
