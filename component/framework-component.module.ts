import { NgModule } from '@angular/core';
import { ShareModule } from '@vanx/framework';
import { PageTableComponent } from './page-table/page-table.component';
import { PageTableCellDirective } from './page-table/page-table-cell.directive';
import { PageTableSearchDirective } from './page-table/page-table-search.directive';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [
    PageTableComponent,
    PageTableSearchDirective,
    PageTableCellDirective
  ],
  exports: [
    PageTableComponent,
    PageTableSearchDirective,
    PageTableCellDirective
  ]
})
export class FrameworkComponentModule {
}
