import { NgModule } from '@angular/core';
import { ShareModule } from 'van-skeleton';
import { PermissionIndexComponent } from './permission-index/permission-index.component';
import { PermissionAddComponent } from './permission-add/permission-add.component';
import { PermissionEditComponent } from './permission-edit/permission-edit.component';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [
    PermissionIndexComponent,
    PermissionAddComponent,
    PermissionEditComponent
  ],
  exports: [
    PermissionIndexComponent,
    PermissionAddComponent,
    PermissionEditComponent
  ]
})
export class PermissionModule {
}
