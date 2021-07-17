import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShareModule } from '@vanx/framework';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [ShareModule, RouterModule, NzAvatarModule, NzAutocompleteModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {}
