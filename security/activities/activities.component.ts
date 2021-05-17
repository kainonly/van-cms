import { Component, OnInit } from '@angular/core';
import { BitService, ListByPage } from 'ngx-bit';
import { LogService } from '../log.service';
import * as packer from './language';

@Component({
  selector: 'v-activities',
  templateUrl: './activities.component.html'
})
export class ActivitiesComponent implements OnInit {
  lists: ListByPage;

  constructor(
    public bit: BitService,
    private logService: LogService
  ) {
  }

  ngOnInit(): void {
    this.logService.setModel('activities');
    this.bit.registerLocales(packer);
    this.lists = this.bit.listByPage({
      id: 'activities',
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
    this.logService.lists(this.lists, refresh, event !== undefined).subscribe(data => {
      this.lists.setData(data);
    });
  }
}
