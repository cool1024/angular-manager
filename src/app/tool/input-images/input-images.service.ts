import { Injectable } from '@angular/core';
import { RequesterService } from './../../service/requester.service'
@Injectable()
export class InputImagesService {

  constructor(private requesterService: RequesterService) { }

  reads(files: Array<Blob>, reading: Function, callback: Function = new Function()): void {
    let cx: number = 0;
    for (let i = 0; i < files.length; i++)this.read(files[i], base64 => {
      if (++cx == files.length) callback();
      reading(base64);
    });
  }

  read(file: Blob, callback: Function) {
    var reader = new FileReader();
    reader.onload = function (res: any) { callback(res.target.result); }
    reader.readAsDataURL(file);
  }

  remove(config: { add: string, delete: string, path: string }, url: string) {
    this.requesterService.delete(config.delete, { url: url }, () => { });
  }

  add(config: { add: string, delete: string, path: string }, file: Blob, success: Function) {
    this.requesterService.upload(config.add, [], { image: file, path: config.path }, success);
  }

}
