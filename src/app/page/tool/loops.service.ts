import { Injectable } from '@angular/core';
import { RequesterService } from './../../service/requester.service';
import { LoopCard } from './../../tool/loop-card/loopcard';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class LoopsService {

  constructor(private requesterService: RequesterService, private toastrService: ToastrService) { }

  //添加幻灯片
  add(card: LoopCard, success: Function): void {
    this.requesterService.upload('/loop-card', [{ key: 'image', file: card.file }], { url: card.url }, res => {
      if (res.result) {
        this.toastrService.success(res.message, '操作成功');
        success(res.datas);
      }
      else {
        this.toastrService.warning(res.message, '操作失败');
      }
    });
  }
}
