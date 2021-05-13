import { NgModule } from '@angular/core';
import { ShareModule } from '@vanx/framework';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminService } from './admin.service';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [
    AdminIndexComponent,
    AdminAddComponent,
    AdminEditComponent
  ],
  exports: [
    AdminIndexComponent,
    AdminAddComponent,
    AdminEditComponent
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule {
}
