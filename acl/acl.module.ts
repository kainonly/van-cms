import { NgModule } from '@angular/core';
import { ShareModule } from '@vanx/framework';
import { AclIndexComponent } from './acl-index/acl-index.component';
import { AclAddComponent } from './acl-add/acl-add.component';
import { AclEditComponent } from './acl-edit/acl-edit.component';
import { AclService } from './acl.service';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [
    AclIndexComponent,
    AclAddComponent,
    AclEditComponent
  ],
  exports: [
    AclIndexComponent,
    AclAddComponent,
    AclEditComponent
  ],
  providers: [
    AclService
  ]
})
export class AclModule {
}
