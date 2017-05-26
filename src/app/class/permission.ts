import{Menu} from './menu'
export class Permission {
    constructor(public id?: number, public title?: string, public key?: string, public parent_menuid?: number, public child_menuid?: number) {
        this.id = id || 0;
        this.title = title || '';
        this.key = key || '';
        this.parent_menuid = parent_menuid || 0;
        this.child_menuid = child_menuid || 0;
    }
}
export class PermissionArray {
    constructor(public menu_id?: number, public menu_name?: string, public menu_ico?: string, public permissions?: Permission[],public child_menus?:Menu[]) {
        this.menu_id = menu_id || 0;
        this.menu_name = menu_name || "";
        this.menu_ico = menu_ico || "";
        this.permissions = permissions || new Array<Permission>();
        this.child_menus=child_menus||new Array<Menu>();
    }
}
