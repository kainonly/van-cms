import { NgModule } from '@angular/core';
import { ShareModule } from 'van-skeleton';
import { RouterModule } from '@angular/router';
import { DashboardsComponent } from './dashboards.component';

@NgModule({
  imports: [
    ShareModule,
    RouterModule
  ],
  declarations: [
    DashboardsComponent
  ],
  exports: [
    DashboardsComponent
  ]
})
export class DashboardsModule {
}
