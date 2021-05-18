import { Component, OnInit } from '@angular/core';
import { BitSwalService, BitService, ListByPage } from 'ngx-bit';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RoleService } from '@vanx/framework/role';
import { PermissionService } from '@vanx/framework/permission';
import { UserService } from '../user.service';
import { PageTableColumn } from '@vanx/framework';
import * as packer from './language';
import { columnType } from '@vanx/framework/component';

@Component({
  selector: 'v-user-index',
  templateUrl: './user-index.component.html'
})
export class UserIndexComponent implements OnInit {
  lists: ListByPage;
  role: any = {};
  permission: any = {};
  adminVisible = false;
  adminData: any;
  columns: PageTableColumn[] = [
    { key: 'username', width: '200px' },
    { key: 'role', width: '200px' },
    { key: 'permission', breakWord: true },
    columnType.status('status'),
    columnType.action('admin-edit')
  ];

  constructor(
    private swal: BitSwalService,
    public bit: BitService,
    public userService: UserService,
    private roleService: RoleService,
    private message: NzMessageService,
    private permissionService: PermissionService
  ) {
  }

  ngOnInit(): void {
    this.userService.setModel('admin');
    this.bit.registerLocales(packer);
    this.lists = this.bit.listByPage({
      id: 'admin-index',
      query: [{ field: 'username', op: 'like', value: '' }]
    });
    this.lists.ready.subscribe(() => {
      this.getRole();
      this.getPermission();
    });
  }

  /**
   * 获取权限组
   */
  getRole(): void {
    this.roleService.originLists().subscribe(data => {
      for (const x of data) {
        this.role[x.key] = x;
      }
    });
  }

  /**
   * 获取特殊授权
   */
  getPermission(): void {
    this.permissionService.originLists().subscribe(data => {
      for (const x of data) {
        this.permission[x.key] = x.name;
      }
    });
  }

  openAdminVisable(data: any): void {
    this.adminVisible = true;
    this.adminData = data;
  }

  closeAdminVisable(): void {
    this.adminVisible = false;
    this.adminData = undefined;
  }

  // /**
  //  * 删除单操作
  //  */
  // deleteData(id: any[]): void {
  //   this.swal.deleteAlert(
  //     this.userService.delete(id)
  //   ).subscribe(res => {
  //     if (!res.error) {
  //       this.message.success(this.bit.l.deleteSuccess);
  //       this.getLists(true);
  //     } else {
  //       if (res.msg === 'error:self') {
  //         this.message.error(this.bit.l.deleteSelfError);
  //       } else {
  //         this.message.error(this.bit.l.deleteError);
  //       }
  //     }
  //   });
  // }

  /**
   * 自定义返回结果
   */
  statusFeedback(res: any): void {
    if (res.error === 1) {
      this.message.error(this.bit.l.StatusError);
    }
    if (res.error === 2) {
      this.message.error(this.bit.l.statusSelfError);
    }
  }
}
