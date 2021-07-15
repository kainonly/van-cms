import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

import { ShareModule } from '@vanx/framework';

import { PageFormItemDirective } from './page-form/page-form-item.directive';
import { PageFormComponent } from './page-form/page-form.component';
import { PageTableCellDirective } from './page-table/page-table-cell.directive';
import { PageTableSearchDirective } from './page-table/page-table-search.directive';
import { PageTableComponent } from './page-table/page-table.component';
import { TransportComponent } from './transport/transport.component';

@NgModule({
  imports: [ShareModule, ScrollingModule],
  declarations: [
    TransportComponent,
    PageTableComponent,
    PageTableSearchDirective,
    PageTableCellDirective,
    PageFormComponent,
    PageFormItemDirective
  ],
  exports: [
    TransportComponent,
    PageTableComponent,
    PageTableSearchDirective,
    PageTableCellDirective,
    PageFormComponent,
    PageFormItemDirective
  ]
})
export class FrameworkComponentModule {}
