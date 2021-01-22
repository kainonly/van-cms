import { NgModule } from '@angular/core';
import { ShareModule } from 'van-skeleton';
import { AclIndexComponent } from './acl-index/acl-index.component';
import { AclAddComponent } from './acl-add/acl-add.component';
import { AclEditComponent } from './acl-edit/acl-edit.component';

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
  ]
})
export class AclModule {
}
