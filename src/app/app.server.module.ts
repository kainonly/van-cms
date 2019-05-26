import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {en_US, NZ_I18N, NzI18nModule} from 'ng-zorro-antd/i18n';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    NoopAnimationsModule,
    HttpClientModule,
    NzI18nModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: NZ_I18N, useValue: en_US}
  ]
})
export class AppServerModule {
}
