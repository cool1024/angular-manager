import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Http } from '@angular/http';
import { Menu } from './../class/menu';
import { MenuService } from './menu.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [ MenuService ]
})
export class MenuComponent implements OnInit {

  constructor(private modalService: NgbModal, public http: Http,private service:MenuService ) { }

  ngOnInit() {
    let menus: Menu[] = new Array<Menu>();
    this.service.menus(this.http, datas => {
      datas.forEach(function (e) {
        menus.push(new Menu(e.mainmenu.title, e.mainmenu.ico, e.mainmenu.url, e.level, e.childmenulist));
      });
      this.menus = menus;
    });
  }

  //菜单列表
  public menus: Menu[];

  //主菜单模型
  public parent: Menu = new Menu();

  //子菜单列表
  public childs: Menu[];

  //表单菜单模型
  public menu: Menu = new Menu();

  //菜单添加模型
  public add: Menu = new Menu();

  //菜单修改模型
  public update: Menu = new Menu();

  //弹出子菜单面板
  showMenuPad(menu: Menu, content: any): void {
    this.parent = menu;
    this.childs = menu.child.concat();
    this.modalService.open(content, { size: 'lg' }).result.then(
      (result) => { },
      (reason) => { }
    );
  }

  //弹出添加面板
  showAddPad(content: any): void {
    this.modalService.open(content, { size: 'sm' }).result.then(
      (result) => { },
      (reason) => { }
    );
  }

  //弹出修改面板
  showChangePad(menu: Menu, content: any) {
    this.update.title = menu.title;
    this.update.ico = menu.ico;
    this.update.child = [menu];
    this.modalService.open(content, { size: 'sm' }).result.then(
      (result) => { },
      (reason) => { }
    );
  }

  //添加主菜单
  addMenu(): void {
    let menus: any[] = this.menus.concat();
    menus.push(new Menu(this.add.title, this.add.ico));
    this.menus = menus;
    this.add = new Menu();
  }

  //修改主菜单
  changeMenu(): void {
    this.update.child[0].title = this.update.title;
    this.update.child[0].ico = this.update.ico;
  }

  //删除指定主菜单
  removeMenuItem(index: number): void {
    let menus: any[] = this.menus.concat();
    menus.splice(index, 1);
    this.menus = menus;
  }

  //添加子菜单
  addMenuItemChild(): void {
    this.childs.push(this.menu);
    this.menu = new Menu();
  }


  //修改指定菜单的子菜单
  changeMenuItem(): void {
    this.parent.child = this.childs;
  }

  //删除指定二级菜单
  removeMenuItemChild(item: Menu): void {
    this.childs.splice(this.childs.indexOf(item), 1);
  }

  //还原菜单
  resetMenu(): void {
    let service = new MenuService();
    let menus: Menu[] = new Array<Menu>();
    service.menus(this.http, datas => {
      datas.forEach(function (e) {
        menus.push(new Menu(e.mainmenu.title, e.mainmenu.ico, e.mainmenu.url, e.level, e.childmenulist));
      });
      this.menus = menus;
    });
  }

  //提交菜单修改
  confirmChange(){
    this.service.change(this.http,{menus:JSON.stringify(this.menus)},res=>{alert(res.message);});
  }

}
