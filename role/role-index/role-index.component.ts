import { Component, OnInit } from '@angular/core';
import { BitService, ListByPage } from 'ngx-bit';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PermissionService } from '@vanx/framework/permission';
import { PageTableColumn } from '@vanx/framework';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoleService } from '../role.service';
import * as packer from './language';
import { columnType } from '@vanx/framework/component';
import { BitSwalService } from 'ngx-bit/swal';

@Component({
  selector: 'v-role-index',
  templateUrl: './role-index.component.html'
})
export class RoleIndexComponent implements OnInit {
  lists!: ListByPage;
  permission: any = {};
  columns: PageTableColumn[] = [
    { key: 'name', width: '200px', format: 'i18n' },
    { key: 'key', width: '200px' },
    { key: 'permission', width: '300px', breakWord: true },
    columnType.status('status'),
    columnType.action('role-edit')
  ];

  constructor(
    public bit: BitService,
    private swal: BitSwalService,
    private message: NzMessageService,
    public roleService: RoleService,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.lists = this.bit.listByPage({
      id: 'role-index',
      query: [
        { field: 'name->zh_cn', op: 'like', value: '' },
        { field: 'name->en_us', op: 'like', value: '' }
      ]
    });
    this.lists.ready.subscribe(() => {
      this.getPermission();
    });
  }

  listsOperate = (observable: Observable<any>): Observable<any> => {
    return observable.pipe(
      map(data =>
        data.map((v: any) => {
          v.acl = !v.acl ? [] : v.acl.split(',').map((c: any) => c.split(':'));
          v.resource = !v.resource ? [] : v.resource.split(',');
          return v;
        })
      )
    );
  };

  getPermission(): void {
    this.permissionService.originLists().subscribe(data => {
      for (const x of data) {
        this.permission[x.key] = x.name;
      }
    });
  }
}
