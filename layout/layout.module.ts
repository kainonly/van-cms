import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareModule } from '@vanx/framework';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [ShareModule, RouterModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {}
