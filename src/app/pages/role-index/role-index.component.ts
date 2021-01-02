import { Component, OnInit } from '@angular/core';
import { BitService } from 'ngx-bit';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ListByPage } from 'ngx-bit/factory';
import { RoleService } from '@common/role.service';
import { PgService } from '@common/pg.service';

@Component({
  selector: 'app-role-index',
  templateUrl: './role-index.component.html'
})
export class RoleIndexComponent implements OnInit {
  lists: ListByPage;

  constructor(
    public bit: BitService,
    private notification: NzNotificationService,
    public roleService: RoleService,
    public pg: PgService
  ) {
  }

  ngOnInit(): void {
    this.bit.registerLocales(import('./language'));
    this.lists = this.bit.listByPage({
      id: 'role-index',
      query: [
        { field: this.pg.jsonb('name', 'zh_cn'), op: 'like', value: '' },
        { field: this.pg.jsonb('name', 'en_us'), op: 'like', value: '' }
      ]
    });
    this.lists.ready.subscribe(() => {
      this.getLists();
    });
  }

  /**
   * 获取列表数据
   */
  getLists(refresh = false, event?: number): void {
    this.roleService.lists(
      this.lists,
      refresh,
      event !== undefined
    ).subscribe(data => {
      this.lists.setData(data);
    });
  }

  /**
   * 删除数据
   */
  delete(id: any[]): void {
    this.roleService.delete(id).subscribe(res => {
      if (res.error) {
        this.notification.error(
          this.bit.l.operateError,
          this.bit.l.deleteError
        );
        return;
      }
      this.notification.success(
        this.bit.l.operateSuccess,
        this.bit.l.deleteSuccess
      );
      this.getLists(true);
    });
  }

  /**
   * 批量删除
   */
  bulkDelete(): void {
    this.delete(this.lists.getChecked().map(v => v.id));
  }
}
