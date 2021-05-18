import { Component, OnInit } from '@angular/core';
import { BitService, ListByPage } from 'ngx-bit';
import { PageTableColumn } from '@vanx/framework';
import { AclService } from '../acl.service';
import * as packer from './language';

@Component({
  selector: 'v-acl-index',
  templateUrl: './acl-index.component.html'
})
export class AclIndexComponent implements OnInit {
  lists: ListByPage;
  columns: PageTableColumn[] = [
    { key: 'name', width: '200px', format: 'i18n' },
    { key: 'key', width: '200px' },
    { key: 'read', width: '300px', breakWord: true },
    { key: 'write', width: '300px', breakWord: true },
    { key: 'status', format: 'status' },
    { key: 'action', width: '300px', left: true, format: 'action', extra: { edit: 'acl-edit' } }
  ];

  constructor(
    public bit: BitService,
    public aclService: AclService
  ) {
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
}
