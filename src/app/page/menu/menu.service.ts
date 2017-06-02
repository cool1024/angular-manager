import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { RequesterService } from './../../service/requester.service';
import { Menu } from './../../class/menu';

@Injectable()

export class MenuService {

  constructor(private toastService: ToastrService, private requesterService: RequesterService) { }

  //获取所有菜单
  menus(success: Function): void {
    this.requesterService.get('/menu/list', {}, res => {
      res.result ? success(res.datas) : this.toastService.warning(res.message, "失败消息");
    });
  }

  //添加新菜单
  add(menu: Menu, success: Function): void {
    this.requesterService.post('/menu/add', menu, res => {
      if (res.result) { success(res.datas.id); this.toastService.success(res.message, "操作成功") }
      else { this.toastService.warning(res.message, "失败消息"); };
    });
  }

  //菜单排序
  sort(ids: number[]) {
    this.requesterService.post('/menu/sort', { menuids: JSON.stringify(ids) }, res => {
      res.result ? this.toastService.success(res.message, "操作成功") : this.toastService.warning(res.message, "操作失败");
    });
  }

  //修改指定菜单
  change(menu: Menu, success: Function): void {
    this.requesterService.post('/menu/add', menu, res => {
      if (res.result) { success(); this.toastService.success(res.message, "操作成功") }
      else { this.toastService.warning(res.message, "失败消息"); };
    });
  }

  //删除指定菜单
  delete(id: number, success: Function): void {
    this.requesterService.get('/menu/delete', { menuid: id }, res => {
      if (res.result) { success(); this.toastService.success(res.message, "操作成功") }
      else { this.toastService.warning(res.message, "失败消息"); };
    });
  }
}
