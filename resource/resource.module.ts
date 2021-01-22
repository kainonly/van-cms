import { NgModule } from '@angular/core';
import { ShareModule } from 'van-skeleton';
import { ResourceIndexComponent } from './resource-index/resource-index.component';
import { ResourceAddComponent } from './resource-add/resource-add.component';
import { ResourceEditComponent } from './resource-edit/resource-edit.component';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [
    ResourceIndexComponent,
    ResourceAddComponent,
    ResourceEditComponent
  ],
  exports: [
    ResourceIndexComponent,
    ResourceAddComponent,
    ResourceEditComponent
  ]
})
export class ResourceModule {
}
