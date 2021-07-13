import { NgModule } from '@angular/core';
import { ShareModule } from '@vanx/framework';
import { ProfileComponent } from './profile.component';
import { FrameworkComponentModule } from '@vanx/framework/component';

@NgModule({
  imports: [ShareModule, FrameworkComponentModule],
  declarations: [ProfileComponent],
  exports: [ProfileComponent]
})
export class ProfileModule {}
