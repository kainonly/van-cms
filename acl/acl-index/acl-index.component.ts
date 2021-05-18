import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BitService, ListByPage } from 'ngx-bit';
import { AclService } from '../acl.service';
import * as packer from './language';
import { PageTableColumn } from '@vanx/framework';

@Component({
  selector: 'v-acl-index',
  templateUrl: './acl-index.component.html'
})
export class AclIndexComponent implements OnInit {
  lists: ListByPage;
  columns: PageTableColumn[] = [
    { key: 'name', style: { width: '200px' }, format: 'i18n' },
    { key: 'key', style: { width: '200px' } },
    { key: 'read', style: { width: '300px' } },
    { key: 'write', style: { width: '300px' } },
    { key: 'status', style: { width: '200px' }, format: 'status' },
    { key: 'action', style: { width: '300px' }, format: 'action', extra: { edit: 'acl-edit' } }
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
