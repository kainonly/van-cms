import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BitService, ListByPage } from 'ngx-bit';
import { PageTableColumn } from '@vanx/framework';
import { AclService } from '../acl.service';
import * as packer from './language';

@Component({
  selector: 'v-acl-index',
  templateUrl: './acl-index.component.html'
})
export class AclIndexComponent implements OnInit, AfterViewInit {
  lists: ListByPage;
  columnMap: Map<string, PageTableColumn> = new Map([
    ['name', { name: 'name', width: '200px', key: 'name', format: 'i18n' }],
    ['key', { name: 'key', width: '200px', key: 'key' }],
    ['read', { name: 'read', width: '300px', key: 'read' }],
    ['write', { name: 'write', width: '300px', key: 'write' }],
    ['status', { name: 'status', key: 'status', format: 'status' }],
    ['action', { name: 'action', width: '300px', key: 'action', format: 'action', edit: 'acl-edit' }]
  ]);

  constructor(
    public bit: BitService,
    public aclService: AclService
  ) {
  }

  get columns(): PageTableColumn[] {
    return [...this.columnMap.values()];
  }

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.lists = this.bit.listByPage({
      id: 'acl-index',
      query: [
        { field: 'name->zh_cn', op: 'like', value: '' },
        { field: 'name->en_us', op: 'like', value: '' }
      ]
    });
  }

  ngAfterViewInit(): void {
  }
}
