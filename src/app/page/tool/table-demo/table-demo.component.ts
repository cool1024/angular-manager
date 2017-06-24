import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-demo',
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.css']
})
export class TableDemoComponent implements OnInit {

  //分页参数
  public totalItems: number = 0;//数据总量
  public currentPage: number = 0;//当前页码
  public smallnumPages: number = 0;//最小页码数
  public limilCount: number = 10;//每页显示数量

  constructor() { }

  ngOnInit() { }

  //换页方法
  pageChanged($event) {
    let params = { offset: ($event.page - 1) * this.limilCount, limit: this.limilCount };
  }

}
