import { Component, OnInit } from '@angular/core';
import { BitService } from 'ngx-bit';
import { ListByPage } from 'ngx-bit/factory';
import * as packer from './language';

@Component({
  selector: 'van-login-log',
  templateUrl: './login-log.component.html'
})
export class LoginLogComponent implements OnInit {
  lists: ListByPage;
  detailVisible = false;
  detailData: any;

  constructor(
    public bit: BitService
  ) {
  }

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.lists = this.bit.listByPage({
      id: 'login-log',
      query: [
        { field: 'username', op: 'like', value: '' },
        { field: 'time', op: 'between', value: [], format: 'unixtime' }
      ]
    });
    this.lists.ready.subscribe(() => {
      this.getLists();
    });
  }

  /**
   * 获取列表数据
   */
  getLists(refresh = false, event?: any): void {
    // this.loginLogService.lists(this.lists, refresh, event !== undefined).subscribe(data => {
    //   this.lists.setData(data.map(v => {
    //     v.isp = JSON.parse(v.isp);
    //     return v;
    //   }));
    // });
  }

  openDetailPanel(data: any): void {
    this.detailVisible = true;
    this.detailData = data;
  }

  closeDetailPanel(): void {
    this.detailVisible = false;
    this.detailData = undefined;
  }
}
