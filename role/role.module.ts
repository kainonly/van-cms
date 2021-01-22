import { NgModule } from '@angular/core';
import { ShareModule } from 'van-skeleton';
import { RoleIndexComponent } from './role-index/role-index.component';
import { RoleAddComponent } from './role-add/role-add.component';
import { RoleEditComponent } from './role-edit/role-edit.component';

@NgModule({
  imports: [
    ShareModule
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
  ]
})
export class RoleModule {
}
