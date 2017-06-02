import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { RequesterService } from './../../service/requester.service';

@Injectable()

export class RoleService {

  constructor(private toastrService: ToastrService, private requesterService: RequesterService) { }

  roles(http: Http, success: Function): void {
    this.requesterService.get('/role/list', {}, res => success(res.datas));
  }

}
