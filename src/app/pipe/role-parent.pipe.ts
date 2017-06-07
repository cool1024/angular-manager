import { Pipe, PipeTransform } from '@angular/core';
import { Role } from './../class/role'

@Pipe({
  name: 'filterByParentId',
  pure: false
})

export class RoleParentPipe implements PipeTransform {

  transform(array: Role[], parentid: number): any {
    return array.filter(e => e.parentid == parentid);
  }

}
