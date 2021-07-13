import { NgModule } from '@angular/core';
import { ShareModule } from '@vanx/framework';
import { FrameworkComponentModule } from '@vanx/framework/component';
import { AclIndexComponent } from './acl-index/acl-index.component';
import { AclPageComponent } from './acl-page/acl-page.component';
import { AclService } from './acl.service';

@NgModule({
  imports: [ShareModule, FrameworkComponentModule],
  declarations: [AclIndexComponent, AclPageComponent],
  exports: [AclIndexComponent, AclPageComponent],
  providers: [AclService]
})
export class AclModule {}
