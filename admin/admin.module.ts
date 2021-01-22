import { NgModule } from '@angular/core';
import { ShareModule } from 'van-skeleton';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';

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
  ]
})
export class AdminModule {
}
