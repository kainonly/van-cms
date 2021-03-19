import { NgModule } from '@angular/core';
import { BreezeShareModule } from '@breeze/core';
import { LoginLogComponent } from './login-log.component';

@NgModule({
  imports: [
    BreezeShareModule
  ],
  declarations: [LoginLogComponent],
  exports: [LoginLogComponent]
})
export class LoginLogLibModule {
}
