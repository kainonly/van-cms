import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {registerLocaleData} from '@angular/common';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import en from '@angular/common/locales/en';
import {NgZorroAntdModule, NZ_I18N, en_US} from 'ng-zorro-antd';
import {NgxBitModule} from 'ngx-bit';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

registerLocaleData(en);

import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {TokenService} from './guard/token.service';
import {MainService} from './api/main.service';

const routes: Routes = [
  {path: '', loadChildren: './app.router.module#AppRouterModule', canActivate: [TokenService]},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
];

const perfectBar: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'VanXsrf',
    }),
    NgZorroAntdModule,
    PerfectScrollbarModule,
    NgxBitModule.forRoot(environment.bit),
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  providers: [
    TokenService,
    MainService,
    {provide: NZ_I18N, useValue: en_US},
    {provide: PERFECT_SCROLLBAR_CONFIG, useValue: perfectBar}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
