import { Component, OnInit } from '@angular/core';
import { BitSwalService, BitService } from 'ngx-bit';
import { ListByPage } from 'ngx-bit/factory';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../admin.service';
import { RoleService } from '@vanx/framework/role';
import { PermissionService } from '@vanx/framework/permission';
import * as packer from './language';

@Component({
  selector: 'van-admin-index',
  templateUrl: './admin-index.component.html'
})
export class AdminIndexComponent implements OnInit {
  lists: ListByPage;
  role: any = {};
  permission: any = {};
  adminVisible = false;
  adminData: any;

  constructor(
    private swal: BitSwalService,
    public bit: BitService,
    public adminService: AdminService,
    private roleService: RoleService,
    private message: NzMessageService,
    private permissionService: PermissionService
  ) {
  }

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.lists = this.bit.listByPage({
      id: 'admin-index',
      query: [{ field: 'username', op: 'like', value: '' }]
    });
    this.lists.ready.subscribe(() => {
      this.getLists();
      this.getRole();
      this.getPermission();
    });
  }

  /**
   * 获取列表数据
   */
  getLists(refresh = false, event?: number): void {
    this.adminService.lists(this.lists, refresh, event !== undefined).subscribe(data => {
      this.lists.setData(data);
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

  /**
   * 删除单操作
   */
  deleteData(id: any[]): void {
    this.swal.deleteAlert(
      this.adminService.delete(id)
    ).subscribe(res => {
      if (!res.error) {
        this.message.success(this.bit.l.deleteSuccess);
        this.getLists(true);
      } else {
        if (res.msg === 'error:self') {
          this.message.error(this.bit.l.deleteSelfError);
        } else {
          this.message.error(this.bit.l.deleteError);
        }
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
