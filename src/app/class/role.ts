import { Permission } from "./permission";
export class Role {
    constructor(public id?: number, public name?: string, public permissions?: Permission[], public parentid?: number) {
        this.name = name || "";
        this.permissions = permissions || new Array<Performance>();
        this.parentid = parentid || 0;
        //this.createtime = createtime || (new Date().toDateString());
    }
    //附加字段
    public checkbox_value: number[] = new Array<number>();
    checkbox($event: any): void {
        if ($event.checked == true) {
            //尝试添加进入权限组
            if(this.checkbox_value.indexOf($event.source.value)==-1){
                this.checkbox_value.push($event.source.value);
            }
        }
        else {
            //尝试移除权限组
            this.checkbox_value.splice(this.checkbox_value.indexOf($event.source.value), 1);
        }
    }
}
