import { NgModule } from '@angular/core';
import { ShareModule } from 'van-skeleton';
import { RouterModule } from '@angular/router';

import { DashboardsComponent } from './dashboard/dashboards.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    ShareModule,
    RouterModule
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
