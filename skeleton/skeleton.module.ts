import { NgModule } from '@angular/core';
import { ShareModule } from 'van-skeleton';
import { RouterModule } from '@angular/router';
import { NgParticlesModule } from 'ng-particles';
import { DashboardsComponent } from './dashboard/dashboards.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  imports: [
    ShareModule,
    RouterModule,
    NgParticlesModule
  ],
  declarations: [
    DashboardsComponent,
    LoginComponent,
    ProfileComponent
  ],
  exports: [
    DashboardsComponent,
    LoginComponent,
    ProfileComponent
  ]
})
export class SkeletonModule {
}
