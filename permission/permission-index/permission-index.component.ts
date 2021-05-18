import { Component, OnInit } from '@angular/core';
import { BitService, ListByPage } from 'ngx-bit';
import { PermissionService } from '../permission.service';
import { PageTableColumn } from '@vanx/framework';
import * as packer from './language';

@Component({
  selector: 'v-permission-index',
  templateUrl: './permission-index.component.html'
})
export class PermissionIndexComponent implements OnInit {
  lists: ListByPage;
  columns: PageTableColumn[] = [
    { key: 'name', width: '200px', format: 'i18n' },
    { key: 'key', width: '200px' },
    { key: 'note', breakWord: true },
    { key: 'status', format: 'status' },
    { key: 'action', width: '300px', left: true, format: 'action', extra: { edit: 'permission-edit' } }
  ];

  constructor(
    public bit: BitService,
    public permissionService: PermissionService
  ) {
  }

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.lists = this.bit.listByPage({
      id: 'permission-index',
      query: [
        { field: 'name->zh_cn', op: 'like', value: '' },
        { field: 'name->en_us', op: 'like', value: '' }
      ]
    });
  }
}
