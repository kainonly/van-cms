import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { AppExtModule } from '@ext';


@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild([{
      path: '',
      component: WelcomeComponent
    }])
  ],
  declarations: [WelcomeComponent]
})
export class WelcomeModule {
}
