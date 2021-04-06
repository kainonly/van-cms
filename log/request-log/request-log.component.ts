import { Component, OnInit } from '@angular/core';
import { BitService } from 'ngx-bit';
import { ListByPage } from 'ngx-bit/factory';
import { RequestLogService } from '../request-log.service';
import * as packer from './language';

@Component({
  selector: 'van-request-log',
  templateUrl: './request-log.component.html'
})
export class RequestLogComponent implements OnInit {
  lists: ListByPage;
  apiVisible = false;
  apiData: any;

  constructor(
    public bit: BitService,
    private requestLogService: RequestLogService
  ) {
  }

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.lists = this.bit.listByPage({
      id: 'request-log',
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
    this.requestLogService.lists(this.lists, refresh, event !== undefined).subscribe(data => {
      this.lists.setData(data);
    });
  }

  openApiPanel(data: any): void {
    this.apiVisible = true;
    this.apiData = data;
  }

  closeApiPanel(): void {
    this.apiVisible = false;
    this.apiData = undefined;
  }
}
