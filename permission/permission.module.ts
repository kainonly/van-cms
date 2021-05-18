import { NgModule } from '@angular/core';
import { ShareModule } from '@vanx/framework';
import { FrameworkComponentModule } from '@vanx/framework/component';
import { PermissionIndexComponent } from './permission-index/permission-index.component';
import { PermissionAddComponent } from './permission-add/permission-add.component';
import { PermissionEditComponent } from './permission-edit/permission-edit.component';
import { PermissionService } from './permission.service';

@NgModule({
  imports: [
    ShareModule,
    FrameworkComponentModule
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
  ],
  providers: [
    PermissionService
  ]
})
export class PermissionModule {
}
