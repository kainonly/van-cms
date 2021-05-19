import { NgModule } from '@angular/core';
import { ShareModule } from '@vanx/framework';
import { FrameworkComponentModule } from '@vanx/framework/component';
import { RoleIndexComponent } from './role-index/role-index.component';
import { RolePageComponent } from './role-page/role-page.component';
import { RoleService } from './role.service';

@NgModule({
  imports: [
    ShareModule,
    FrameworkComponentModule
  ],
  declarations: [
    RoleIndexComponent,
    RolePageComponent
  ],
  exports: [
    RoleIndexComponent,
    RolePageComponent
  ],
  providers: [
    RoleService
  ]
})
export class RoleModule {
}
