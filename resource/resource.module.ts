import { NgModule } from '@angular/core';
import { ShareModule } from '@vanx/framework';
import { ResourceIndexComponent } from './resource-index/resource-index.component';
import { ResourceAddComponent } from './resource-add/resource-add.component';
import { ResourceEditComponent } from './resource-edit/resource-edit.component';
import { ResourceService } from './resource.service';
import { PolicyService } from './policy.service';

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
  ],
  providers: [
    ResourceService,
    PolicyService
  ]
})
export class ResourceModule {
}
