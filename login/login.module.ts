import { NgModule } from '@angular/core';
import { ShareModule } from 'van-skeleton';
import { NgParticlesModule } from 'ng-particles';
import { LoginComponent } from './login.component';


@NgModule({
  imports: [
    ShareModule,
    NgParticlesModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule {
}
