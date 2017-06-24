import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Config } from './../../class/config';
import { InputImagesService } from './input-images.service';
import { InputImage } from './input-image'

@Component({
  selector: 'app-input-images',
  //templateUrl: './input-images.component.html',
  styleUrls: ['./input-images.component.css'],
  template: `
    <div class="form-group row">
        <label for="example-text-input" class="col-2 col-form-label">{{title}}</label>
        <div class="col-10">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="点击右侧上传按钮添加图片" value="{{getImages()}}" readonly>
                <span class="input-group-btn">
                    <button class="btn btn-secondary" (click)="input_images.click()" type="button"><i class="fa fa-file-image-o"></i> 选择图片</button>
                    <input [hidden]="true"  accept="image/*" #input_images type="file" multiple="true" (change)="readFile($event.target.files)" />
                </span>
            </div>
        </div>
    </div>
    <div class="form-group row">
        <label for="example-text-input" class="col-2 col-form-label"></label>
        <div class="col-sm-10">
            <div *ngFor="let item of inputImages;index as i;" class="d-inline-block">
                <p class="tool"><i (click)="removeImage(item,i)" class="ml-1 fa fa-remove text-danger pointer"></i></p>
                <img src="{{item.image}}" class="img-thumbnail" />
            </div>
        </div>
    </div>
  `,
  providers: [InputImagesService]
})
export class InputImagesComponent implements OnInit {

  @Input() files: Array<Blob> = new Array<Blob>();
  @Input() images = "";
  @Input() title: string = "选择图片";
  @Input() config: { add: string, delete: string, path: string } = { add: "", delete: "", path: "" };
  @Output() onChange = new EventEmitter<string>();

  public inputImages: Array<InputImage> = new Array<InputImage>();

  constructor(private service: InputImagesService) { }

  ngOnInit() {
    this.images.split(',').forEach(url => {
      if (url) this.inputImages.push(new InputImage(Config.SOURCE_URL + url, this.service));
    });
  }

  readFile(files: Array<Blob>) {
    this.files = files;
    for (let i = 0; i < files.length; i++) {
      let inputImage = new InputImage('/assets/system/loading.gif', this.service);
      inputImage.upload(this.config, files[i], () => {
        this.images = InputImage.getImages(this.inputImages);
        this.onChange.emit(this.images);
      });
      this.inputImages.push(inputImage);
    }
  }

  removeImage(inputImage: InputImage, index: number) {
    this.service.remove(this.config, this.inputImages[index].image.substring(Config.SOURCE_URL.length));
    this.inputImages.splice(index, 1);
    this.images = InputImage.getImages(this.inputImages);
    this.onChange.emit(this.images);
  }

  getImages() {
    return InputImage.getImages(this.inputImages);
  }

}
