import { NgModule } from '@angular/core';

import { ShareModule } from '@vanx/framework';
import { FrameworkComponentModule } from '@vanx/framework/component';

import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [ShareModule, FrameworkComponentModule],
  declarations: [ProfileComponent],
  exports: [ProfileComponent]
})
export class ProfileModule {}
