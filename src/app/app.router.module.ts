import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppExtModule} from '@ext';
import {DashboardsComponent} from './dashboards/dashboards.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardsComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: '{empty}',
        loadChildren: () => import('./pages/empty/empty.module').then(m => m.EmptyModule)
      },
      {
        path: '{profile}',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
      },
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
