import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoopCard } from './loopcard';
import { Config } from './../../class/config';

@Component({
  selector: 'app-loop-card',
  // templateUrl: './loop-card.component.html',
  template: `
  <div class="card rounded-0 d-inline-block mb-1">
      <div class="cardiimg-top text-center card-div-img pointer m-1 rounded-0" (click)="file.click()">
          <img src="{{((loopCard.image?header+loopCard.image:'')||loopCard.base64)||'/assets/system/file-open.svg'}}" alt="Card image cap">
      </div>
      <hr>
      <div class="input-group input-group-sm p-2">
          <span class="input-group-addon bg-white" id="sizing-addon2">链接</span>
          <input type="text" class="form-control" (keyup)="loopCard.status=false;" [(ngModel)]="loopCard.url" name="url" placeholder="请输入图片跳转链接" />
      </div>
      <div class="text-right pl-2 pr-2 pb-2">
          <span class="badge badge-success pull-left" [hidden]="!loopCard.status">生效</span>
          <span class="badge badge-warning pull-left" [hidden]="loopCard.status">未保存</span>
          <button class="btn btn-info btn-sm" (click)="_onSave()"><i class="fa-fw fa fa-check"></i> 修改</button>
          <button class="btn btn-danger btn-sm" (click)="_onClose()"><i class="fa-fw fa fa-remove"></i> 删除</button>
      </div>
      <input type="file" class="d-none" name="file" #file (change)="loopCard.status=false;readFile($event.target.files[0])" />
  </div>
  `,
  styleUrls: ['./loop-card.component.css']
})
export class LoopCardComponent {

  @Input() loopCard: LoopCard;
  @Output() onClose = new EventEmitter();
  @Output() onSave = new EventEmitter();

  public header = Config.SOURCE_URL;

  constructor() { }

  readFile(file: Blob): void {
    let reader: FileReader = new FileReader();
    reader.addEventListener('load', () => { this.loopCard.base64 = reader.result; this.loopCard.file = file; this.loopCard.image = ""; });
    reader.addEventListener("error", e => console.error(e));
    reader.readAsDataURL(file);
  }

  _onClose(): void {
    this.onClose.emit();
  }
  _onSave(): void {
    this.onSave.emit();
  }
  _onChange(): void {

  }
}
