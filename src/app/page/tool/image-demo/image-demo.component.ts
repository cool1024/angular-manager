import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-demo',
  templateUrl: './image-demo.component.html',
  styleUrls: ['./image-demo.component.css']
})
export class ImageDemoComponent implements OnInit {

  //店铺图片
  public images = "";
  //店铺首页图
  public image = "";
  //图片上传配置
  public config = { add: '/images/add', delete: '/images/delete', path: 'shop' };

  constructor() { }

  ngOnInit() { }

}
