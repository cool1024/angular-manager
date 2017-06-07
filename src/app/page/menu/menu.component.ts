import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { Menu } from './../../class/menu';
import { MenuService } from './menu.service';
import { AppService } from './../../app.service';
import { RequesterService } from './../../service/requester.service';
import { StorageService } from './../../service/storage.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MenuService, RequesterService, StorageService, AppService]
})
export class MenuComponent implements OnInit {

  constructor(private modalService: NgbModal, public http: Http, private service: MenuService, private appService: AppService) { }

  ngOnInit() { this.loadMenu(); }

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
    this.childs = menu.child;
    this.modalService.open(content, { size: 'lg' });
  }

  //弹出添加面板
  showAddPad(content: any): void {
    this.modalService.open(content, { size: 'sm' });
  }

  //弹出主菜单修改面板
  showMainChangePad(menu: Menu, content: any) {
    this.update.id = menu.id;
    this.update.title = menu.title;
    this.update.ico = menu.ico;
    this.update.child = [menu];//保存原对象
    this.modalService.open(content, { size: 'sm' });
  }

  //弹出子菜单修改面板
  showChildChangePad(menu: Menu, content: any) {
    this.update = new Menu(menu.id, menu.title, menu.parentid, menu.url, menu.ico, [menu]);
    this.modalService.open(content, { size: 'sm' });
  }

  //添加主菜单
  addMainMenu(): void {
    this.service.add(this.add, id => {
      let menus: any[] = this.menus.concat();
      let menu = new Menu();
      menu.title = this.add.title;
      menu.ico = this.add.ico;
      menu.id = id;
      menus.push(menu);
      this.menus = menus;
      this.add = new Menu();
    });
  }

  //添加子菜单
  addChildMenu(): void {
    this.menu.parentid = this.parent.id;
    this.service.add(this.menu, id => {
      this.menu.id = id;
      this.childs.push(new Menu(this.menu.id, this.menu.title, this.menu.parentid, this.menu.url, this.menu.ico, new Array<Menu>()));
      this.menu = new Menu();
    });
  }
  //删除主菜单
  deleteMainMenu(id: number, index: number): void {
    this.service.delete(id, () => {
      let menus: any[] = this.menus.concat();
      menus.splice(index, 1);
      this.menus = menus;
    });
  }

  //删除子菜单
  deleteChildMenu(id: number, index: number): void {
    this.service.delete(id, () => {
      this.childs.splice(index, 1);
    });
  }

  //修改主菜单
  changeMainMenu(): void {
    this.service.change(this.update, () => {
      this.update.child[0].title = this.update.title;
      this.update.child[0].ico = this.update.ico;
    });
  }

  //修改子菜单
  changeChildMenu(): void {
    this.service.change(this.update, () => {
      this.update.child[0].title = this.update.title;
      this.update.child[0].ico = this.update.ico;
    });
  }

  //修改主菜单排序
  changeMainMenuSort(): void {
    let ids: number[] = new Array<number>();
    this.menus.forEach(function (e) {
      ids.push(e.id);
    })
    this.service.sort(ids);
  }

  //载入菜单
  loadMenu(): void {
    let menus: Menu[] = new Array<Menu>();
    this.service.menus(datas => {
      datas.forEach(function (e) {
        menus.push(new Menu(e.mainmenu.id, e.mainmenu.title, e.mainmenu.parentid, e.mainmenu.url, e.mainmenu.ico, e.childmenulist));
      });
      this.menus = menus;
    });
  }

  //刷新系统菜单
  flashMenu(): void { this.appService.loadMenus(); }
}
