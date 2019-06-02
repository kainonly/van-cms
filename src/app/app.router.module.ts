import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppExtModule} from './app.ext.module';
import {DashboardsComponent} from './dashboards/dashboards.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardsComponent,
    children: [
      {path: '', loadChildren: './pages/welcome/welcome.module#WelcomeModule'},
      {path: '{empty}', loadChildren: './pages/empty/empty.module#EmptyModule'},
    ]
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardsComponent
  ],
})
export class AppRouterModule {
}
