import { Component, Input } from '@angular/core';
import { Role } from './../../class/role'

@Component({
  selector: 'role-for',
  template: `
    <ul class="role-ul">
        <li *ngFor="let item of (roles|filterByParentId:parentid)">
            {{item.name}}
            <role-for [roles]="roles" [parentid]="item.id"></role-for>
        </li>
    </ul>
  `,
  styles:['.role-ul{color:#cc1b1b;}','.role-ul ul{color:green}','.role-ul li{line-height:35px;}','.role-ul ul ul{color:skyblue}']
})

export class RoleForComponent {
  @Input() roles: Role[];
  @Input() parentid: number;
}
