import { Component, OnInit } from '@angular/core';
import { BitService, ListByPage } from 'ngx-bit';
import { LogService } from '../log.service';
import * as packer from './language';

@Component({
  selector: 'v-logs',
  templateUrl: './logs.component.html'
})
export class LogsComponent implements OnInit {
  lists: ListByPage;

  constructor(
    public bit: BitService,
    private logService: LogService
  ) {
  }

  ngOnInit(): void {
    this.logService.setModel('logs');
    this.bit.registerLocales(packer);
    this.lists = this.bit.listByPage({
      id: 'logs',
      query: [
        { field: 'username', op: 'like', value: '' },
        { field: 'time', op: 'between', value: [], format: 'unixtime' }
      ]
    });
    this.lists.ready.subscribe(() => {
      this.getLists();
    });
  }

  getLists(refresh = false, event?: any): void {
    this.logService.lists(this.lists, refresh, event !== undefined).subscribe(data => {
      this.lists.setData(data);
    });
  }
}
