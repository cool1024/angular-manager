import { Role } from "./role"
export class Admin {
    constructor(public id?: number, public account?: string, public password?: string, public role?: Role, public createtime?: string) {
        this.id = id || 0;
        this.account = account || "";
        this.password = password || "";
        this.role = role || new Role();
        this.createtime = createtime || (new Date().toDateString());
    }
    //附加字段
    public thumb:string = "";
}
