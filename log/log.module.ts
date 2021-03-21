import { NgModule } from '@angular/core';
import { ShareModule } from 'van-skeleton';
import { RequestLogComponent } from './request-log/request-log.component';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [RequestLogComponent],
  exports: [RequestLogComponent]
})
export class LogModule {
}
