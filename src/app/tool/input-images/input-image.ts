import { InputImagesService } from './input-images.service';
import { Config } from './../../class/config';

export class InputImage {
    constructor(public image, private service: InputImagesService) { }
    upload(config: { add: string, delete: string, path: string }, file: Blob, success: Function = new Function) {
        this.service.add(config, file, res => { this.image = Config.SOURCE_URL + res.datas; success(res.datas) });
    }
    public static getImages(inputImages: Array<InputImage>) {
        let images = new Array<string>();
        inputImages.forEach(e => images.push(e.image.substring(Config.SOURCE_URL.length)));
        return images.join();
    }
}
