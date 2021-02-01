import { Component, OnInit } from '@angular/core';
import { BitSwalService, BitService } from 'ngx-bit';
import { ListByPage } from 'ngx-bit/factory';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RoleService } from '../role.service';
import * as packer from './language';
import { PermissionService } from 'van-skeleton/permission';

@Component({
  selector: 'van-role-index',
  templateUrl: './role-index.component.html'
})
export class RoleIndexComponent implements OnInit {
  lists: ListByPage;
  permission: any = {};

  constructor(
    public bit: BitService,
    private swal: BitSwalService,
    private message: NzMessageService,
    public roleService: RoleService,
    private permissionService: PermissionService
  ) {
  }

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
      this.getLists();
    });
  }

  /**
   * 获取列表数据
   */
  getLists(refresh = false, event?: number): void {
    this.roleService.lists(this.lists, refresh, event !== undefined).subscribe(data => {
      this.lists.setData(
        data.map(v => {
          v.acl = v.acl.split(',').map(c => c.split(':'));
          v.resource = v.resource.split(',');
          return v;
        })
      );
    });
  }

  getPermission(): void {
    this.permissionService.originLists().subscribe(data => {
      for (const x of data) {
        this.permission[x.key] = x.name;
      }
    });
  }

  /**
   * 删除单操作
   */
  deleteData(id: any[]): void {
    this.swal.deleteAlert(
      this.roleService.delete(id)
    ).subscribe(res => {
      if (!res.error) {
        this.message.success(this.bit.l.deleteSuccess);
        this.getLists(true);
      } else {
        this.message.error(this.bit.l.deleteError);
      }
    });
  }

  /**
   * 选中删除
   */
  deleteCheckData(): void {
    const id = this.lists.getChecked().map(v => v.id);
    this.deleteData(id);
  }
}
