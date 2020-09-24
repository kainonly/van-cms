import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { NZ_I18N, NzMessageModule, zh_CN } from 'ng-zorro-antd';
import { NgxBitModule } from 'ngx-bit';
import { environment } from '@env';

registerLocaleData(zh);

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { UpdateService } from '@common/update.service';
import { TokenService } from '@common/token.service';
import { MainService } from '@common/main.service';
import { AdminService } from '@common/admin.service';
import { RoleService } from '@common/role.service';
import { AclService } from '@common/acl.service';
import { ResourceService } from '@common/resource.service';
import { PolicyService } from '@common/policy.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app.router.module').then(m => m.AppRouterModule),
    canActivate: [TokenService]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/empty/empty.module').then(m => m.EmptyModule)
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NzMessageModule,
    NgxBitModule.forRoot(environment.bit),
    RouterModule.forRoot(routes, { useHash: true }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    UpdateService,
    TokenService,
    MainService,
    AclService,
    ResourceService,
    PolicyService,
    RoleService,
    AdminService,
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
