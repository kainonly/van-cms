import { NgModule } from '@angular/core';

import { TokenService } from './common/token.service';
import { UpdateService } from './common/update.service';
import { SystemService } from './common/system.service';
import { MainService } from './common/main.service';

@NgModule({
  providers: [
    TokenService,
    UpdateService,
    SystemService,
    MainService
  ]
})
export class FrameworkModule {
}
