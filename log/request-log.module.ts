import { NgModule } from '@angular/core';
import { RequestLogComponent } from './request-log.component';
import { ShareModule } from 'van-skeleton';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [RequestLogComponent],
  exports: [RequestLogComponent]
})
export class RequestLogModule {
}
