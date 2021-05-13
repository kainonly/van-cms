import { NgModule } from '@angular/core';
import { ShareModule } from '@vanx/framework';
import { RequestLogComponent } from './request-log/request-log.component';
import { LoginLogComponent } from './login-log/login-log.component';
import { LoginLogService } from './login-log.service';
import { RequestLogService } from './request-log.service';

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
  ],
  providers: [
    LoginLogService,
    RequestLogService
  ]
})
export class LogModule {
}
