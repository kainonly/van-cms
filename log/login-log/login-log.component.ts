import { Component, OnInit } from '@angular/core';
import { BitService, ListByPage } from 'ngx-bit';
import { LoginLogService } from '../login-log.service';
import * as packer from './language';

@Component({
  selector: 'van-login-log',
  templateUrl: './login-log.component.html'
})
export class LoginLogComponent implements OnInit {
  lists: ListByPage;

  constructor(
    public bit: BitService,
    private loginLogService: LoginLogService
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
    this.loginLogService.lists(this.lists, refresh, event !== undefined).subscribe(data => {
      this.lists.setData(data);
    });
  }
}
