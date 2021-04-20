import { NgModule } from '@angular/core';
import { ShareModule } from 'van-skeleton';
import { SchemaIndexComponent } from './schema-index/schema-index.component';
import { SchemaAddComponent } from './schema-add/schema-add.component';
import { SchemaEditComponent } from './schema-edit/schema-edit.component';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [
    SchemaIndexComponent,
    SchemaAddComponent,
    SchemaEditComponent
  ],
  exports: [
    SchemaIndexComponent,
    SchemaAddComponent,
    SchemaEditComponent
  ]
})
export class SchemaModule {
}
