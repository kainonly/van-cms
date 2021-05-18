import { NgModule } from '@angular/core';
import { ShareModule } from '@vanx/framework';
import { PageTableComponent } from './page-table/page-table.component';
import { PageTableSearchDirective } from './page-table/page-table-search.directive';
import { PageTableCellDirective } from './page-table/page-table-cell.directive';

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
