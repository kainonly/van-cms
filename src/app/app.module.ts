import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';

registerLocaleData(zh);

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({appId: 'vanCMS'}),
  ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
