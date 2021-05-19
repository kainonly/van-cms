import { NgModule } from '@angular/core';
import { ShareModule } from '@vanx/framework';
import { PageTableComponent } from './page-table/page-table.component';
import { PageTableSearchDirective } from './page-table/page-table-search.directive';
import { PageTableCellDirective } from './page-table/page-table-cell.directive';
import { PageFormComponent } from './page-form/page-form.component';
import { PageFormItemDirective } from './page-form/page-form-item.directive';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [
    PageTableComponent,
    PageTableSearchDirective,
    PageTableCellDirective,
    PageFormComponent,
    PageFormItemDirective
  ],
  exports: [
    PageTableComponent,
    PageTableSearchDirective,
    PageTableCellDirective,
    PageFormComponent,
    PageFormItemDirective
  ]
})
export class FrameworkComponentModule {
}
