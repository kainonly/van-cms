import { NgModule } from '@angular/core';
import { ShareModule } from '@vanx/framework';
import { FrameworkComponentModule } from '@vanx/framework/component';
import { PermissionIndexComponent } from './permission-index/permission-index.component';
import { PermissionPageComponent } from './permission-page/permission-page.component';
import { PermissionService } from './permission.service';

@NgModule({
  imports: [
    ShareModule,
    FrameworkComponentModule
  ],
  declarations: [
    PermissionIndexComponent,
    PermissionPageComponent
  ],
  exports: [
    PermissionIndexComponent,
    PermissionPageComponent
  ],
  providers: [
    PermissionService
  ]
})
export class PermissionModule {
}
