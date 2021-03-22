import { NgModule } from '@angular/core';
import { ShareModule } from 'van-skeleton';
import { RequestLogComponent } from './request-log/request-log.component';
import { LoginLogComponent } from './login-log/login-log.component';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [
    RequestLogComponent,
    LoginLogComponent
  ],
  exports: [
    RequestLogComponent,
    LoginLogComponent
  ]
})
export class LogModule {
}
