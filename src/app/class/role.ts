import { Permission } from "./permission";
export class Role {
    constructor(public id: number = 0, public name: string = "", public description: string = "", public permissions: Permission[] = new Array<Permission>(), public parentid: number = 0, public parent?: Role) { }
    public checkbox_value: number[] = new Array<number>();
    checkbox($event: any): void {
        if ($event.checked == true) {
            //尝试添加进入权限组
            if (this.checkbox_value.indexOf($event.source.value) == -1) {
                this.checkbox_value.push($event.source.value);
            }
        }
        else {
            //尝试移除权限组
            this.checkbox_value.splice(this.checkbox_value.indexOf($event.source.value), 1);
        }
    }
}
