import { AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { BitService, BitSwalService, ListByPage } from 'ngx-bit';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PageTableColumn, PageTableServiceInterface } from '@vanx/framework';
import { PageTableCellDirective } from './page-table-cell.directive';
import { PageTableSearchDirective } from './page-table-search.directive';

@Component({
  selector: 'v-page-table',
  templateUrl: './page-table.component.html'
})
export class PageTableComponent implements OnInit, AfterViewInit {
  @Input() lists: ListByPage;
  @Input() extra: TemplateRef<any>;
  @Input() columns: PageTableColumn[] = [];
  @Input() service: PageTableServiceInterface;
  @Input() batch = true;
  @ContentChildren(PageTableSearchDirective) searchItems: QueryList<PageTableSearchDirective>;
  @ContentChildren(PageTableCellDirective) items: QueryList<PageTableCellDirective>;
  columnDef: Map<string, TemplateRef<any>>;

  constructor(
    public bit: BitService,
    private swal: BitSwalService,
    private message: NzMessageService
  ) {
  }

  ngOnInit(): void {
    this.bit.registerLocales({});
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
    this.service.lists(this.lists, refresh, event !== undefined).subscribe(data => {
      this.lists.setData(data);
    });
  }

  delete(id: any[]): void {
    this.swal.deleteAlert(this.service.delete(id)).subscribe(res => {
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
