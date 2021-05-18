import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BitSwalService, BitService, ListByPage } from 'ngx-bit';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RoleService } from '@vanx/framework/role';
import { PermissionService } from '@vanx/framework/permission';
import { columnType } from '@vanx/framework/component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageTableColumn } from '@vanx/framework';
import { UserService } from '../user.service';
import * as packer from './language';

@Component({
  selector: 'v-user-index',
  templateUrl: './user-index.component.html'
})
export class UserIndexComponent implements OnInit {
  lists: ListByPage;
  columns: PageTableColumn[] = [
    { key: 'username', width: '200px' },
    { key: 'role', width: '200px' },
    { key: 'permission', breakWord: true },
    columnType.status('status', true, (res) => {
      if (res.error === 1) {
        this.message.error(this.bit.l.StatusError);
      }
      if (res.error === 2) {
        this.message.error(this.bit.l.statusSelfError);
      }
    }),
    columnType.action('admin-edit')
  ];
  role: any = {};
  permission: any = {};
  userData: any;
  @ViewChild('userDataInfoTpl') userDataInfoTpl: TemplateRef<any>;

  constructor(
    private swal: BitSwalService,
    public bit: BitService,
    public userService: UserService,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private message: NzMessageService,
    private drawer: NzDrawerService
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

  openUserVisable(data: any): void {
    this.userData = data;
    this.drawer.create({
      nzContent: this.userDataInfoTpl,
      nzWidth: 540
    });
  }

  deleteOperate = (observable: Observable<any>) => {
    return observable.pipe(
      map(res => {
        if (res.error) {
          if (res.msg === 'error:self') {
            this.message.error(this.bit.l.deleteSelfError);
          } else {
            this.message.error(this.bit.l.deleteError);
          }
          return;
        }
        return res;
      })
    );
  };
}
