import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InputImage } from './../input-images/input-image';
import { InputImagesService } from './../input-images/input-images.service';
import { Config } from './../../class/config';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  template: `
  <div class="form-group row">
      <label for="example-text-input" class="col-2 col-form-label">{{title}}</label>
      <div class="col-10">
          <div class="input-group">
              <input type="text" class="form-control" placeholder="点击右侧上传按钮添加图片" value="{{image}}" readonly>
              <span class="input-group-btn">
                  <button class="btn btn-secondary" (click)="input_images.click()" type="button"><i class="fa fa-file-image-o"></i> 选择图片</button>
                  <input [hidden]="true" accept="image/*" #input_images type="file" multiple="false" (change)="uploadFile($event.target.files[0])" />
              </span>
          </div>
      </div>
  </div>
  <div class="form-group row">
      <label for="example-text-input" class="col-2 col-form-label"></label>
      <div class="col-sm-10">
          <div class="d-inline-block">
              <img src="{{inputImage.image}}" [hidden]="!inputImage.image" class="img-thumbnail" />
          </div>
      </div>
  </div>
  `,
  styleUrls: ['./input-image.component.css'],
  providers: [InputImagesService]
})
export class InputImageComponent implements OnInit {

  @Input() image: string = "";
  @Input() title: string = "图片上传";
  @Input() config: { add: string, delete: string, path: string } = { add: '', delete: "", path: '' };
  @Output() onChange = new EventEmitter<string>();

  //图片数据对象
  public inputImage: InputImage = new InputImage('', this.service);

  constructor(private service: InputImagesService) { }

  ngOnInit() {
    this.inputImage = new InputImage(this.image ? Config.SOURCE_URL + this.image : '', this.service);
  }

  uploadFile(file: Blob) {
    this.inputImage.image = '/assets/system/loading.gif';
    this.inputImage.upload(this.config, file, url => { this.image = url; this.onChange.emit(url) });
  }
}
