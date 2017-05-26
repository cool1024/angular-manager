import { Permission } from "./permission";
export class Role {
    constructor(public id?: number, public name?: string, public permissions?: Permission[], public parentid?: number, public createtime?: string) {
        this.name = name || "";
        this.permissions = permissions || new Array<Performance>();
        this.parentid = parentid || 0;
        this.createtime = createtime || (new Date().toDateString());
    }
}
