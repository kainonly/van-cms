import { NgModule } from '@angular/core';
import { ShareModule } from '@vanx/framework';
import { FrameworkComponentModule } from '@vanx/framework/component';
import { RoleIndexComponent } from './role-index/role-index.component';
import { RoleAddComponent } from './role-add/role-add.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleService } from './role.service';

@NgModule({
  imports: [
    ShareModule,
    FrameworkComponentModule
  ],
  declarations: [
    RoleIndexComponent,
    RoleAddComponent,
    RoleEditComponent
  ],
  exports: [
    RoleIndexComponent,
    RoleAddComponent,
    RoleEditComponent
  ],
  providers: [
    RoleService
  ]
})
export class RoleModule {
}
