import { NgModule } from '@angular/core';
import { ShareModule } from 'van-skeleton';
import { SchemaIndexComponent } from './schema-index/schema-index.component';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [
    SchemaIndexComponent
  ],
  exports: [
    SchemaIndexComponent
  ]
})
export class SchemaModule {
}
