export class Menu {
    // public title: string;
    // public ico: string;
    // public url: string;
    // public level: string;
    // public child: Menu[];
    // constructor(title?: string, ico?: string, url?: string, level?: string, child?: Menu[]) {
    //     this.title = title || '';
    //     this.ico = ico || '';
    //     this.url = url || '';
    //     this.level = level || '';
    //     this.child = child||new Array<Menu>();
    // }
     constructor(public id:number=0,public title:string="",public parentid:number=0,public url:string="",public ico:string="",public child:Menu[]=new Array<Menu>()){}
}
