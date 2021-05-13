import { NgModule } from '@angular/core';
import { NgParticlesModule } from 'ng-particles';
import { ShareModule } from '@vanx/framework';
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
