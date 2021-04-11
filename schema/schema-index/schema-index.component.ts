import { Component, OnInit } from '@angular/core';
import { BitService, BitSwalService } from 'ngx-bit';
import { ListByPage } from 'ngx-bit/factory';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'van-schema-index',
  templateUrl: './schema-index.component.html'
})
export class SchemaIndexComponent implements OnInit {

  ngOnInit(): void {
  }

  /**
   * 获取列表数据
   */
  getLists(refresh = false, event?: any): void {
  }

  /**
   * 删除单操作
   */
  deleteData(id: any[]): void {
  }
}
