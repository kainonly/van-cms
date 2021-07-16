import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  QueryList,
  TemplateRef
} from '@angular/core';
import { Observable } from 'rxjs';

import { PageTableColumn } from '@vanx/framework';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Api, BitService, ListByPage } from 'ngx-bit';
import { BitSwalService } from 'ngx-bit/swal';

import { PageTableCellDirective } from './page-table-cell.directive';
import { PageTableSearchDirective } from './page-table-search.directive';

@Component({
  selector: 'v-page-table',
  templateUrl: './page-table.component.html',
  styleUrls: ['./page-table.component.scss']
})
export class PageTableComponent implements OnInit, AfterViewInit {
  @Input() extra!: TemplateRef<any>;
  @Input() scroll: any;
  @Input() batch = true;
  @Input() columns: PageTableColumn[] = [];
  @Input() lists!: ListByPage;
  @Input() api!: Api;
  @Input() listsOperate!: (observable: Observable<any>) => Observable<any>;
  @Input() listsDataChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() deleteOperate!: (observable: Observable<any>) => Observable<any>;

  @ContentChildren(PageTableSearchDirective) searchItems!: QueryList<PageTableSearchDirective>;
  @ContentChildren(PageTableCellDirective) items!: QueryList<PageTableCellDirective>;

  columnDef!: Map<string, TemplateRef<any>>;

  constructor(public bit: BitService, private swal: BitSwalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.lists.ready.subscribe(() => {
      this.getLists();
    });
  }

  ngAfterViewInit(): void {
    this.columnDef = new Map(this.items.map(v => [v.vPageTableCell, v.templateRef]));
  }

  context(data: any, column: any): any {
    return { $implicit: data, column };
  }

  getLists(refresh = false, event?: number): void {
    let observable = this.api.lists!(this.lists, refresh, event !== undefined);
    if (this.listsOperate) {
      observable = this.listsOperate(observable);
    }
    observable.subscribe((data: any) => {
      this.lists.setData(data);
      this.listsDataChange.emit(data);
    });
  }

  delete(id: any[]): void {
    let observable = this.swal.deleteAlert(this.api.delete!(id) as Observable<Record<string, unknown>>);
    if (this.deleteOperate) {
      observable = this.deleteOperate(observable);
    }
    observable.subscribe(res => {
      if (!res) {
        return;
      }
      if (!res.error) {
        this.message.success(this.bit.l.deleteSuccess);
        this.getLists(true);
      } else {
        this.message.error(this.bit.l.deleteError);
      }
    });
  }

  bulkDelete(): void {
    this.delete(this.lists.getChecked().map(v => v.id));
  }
}
