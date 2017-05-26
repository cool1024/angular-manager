import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() { }

  showAddPad(content: any): void {
    this.modalService.open(content, { size: 'lg' }).result.then(
      (result) => { },
      (reason) => { }
    );
  }

  showChangePad(content: any): void {
    this.modalService.open(content, { size: 'lg' }).result.then(
      (result) => { },
      (reason) => { }
    );
  }
}
