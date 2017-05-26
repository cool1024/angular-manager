export class Menu {
    public title: string;
    public ico: string;
    public url: string;
    public level: string;
    public child: Menu[];
    constructor(title?: string, ico?: string, url?: string, level?: string, child?: Menu[]) {
        this.title = title || '';
        this.ico = ico || '';
        this.url = url || '';
        this.level = level || '';
        this.child = child||new Array<Menu>();
    }
    //获取图标
    public getIco() {
        return '<i class="' + this.ico + '"></i>';
    }
}
