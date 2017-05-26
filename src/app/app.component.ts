import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AppService } from './app.service';
import { Menu } from './class/menu';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]

})
export class AppComponent implements OnInit {

  //菜单折叠状态
  public isCollapsed: boolean[]=new Array<boolean>(false);;

  //菜单列表
  public menus: Menu[] = new Array<Menu>();

  constructor(public service: AppService, public http: Http) { }

  ngOnInit() {
    let menus: Menu[] = new Array<Menu>();
    let isCollapsed=new Array<boolean>(false);
    this.service.menus(this.http, datas => {
      datas.forEach(function (e) {
        menus.push(new Menu(e.mainmenu.title, e.mainmenu.ico, e.mainmenu.url, e.level, e.childmenulist));
        isCollapsed.push(false);
      });
      this.isCollapsed=isCollapsed;
      this.menus = menus;
    });
  }
}
