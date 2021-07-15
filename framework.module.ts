import { NgModule } from '@angular/core';

import { TokenService } from './common/token.service';
import { LayoutService } from './common/system.service';
import { AppService } from './common/main.service';

@NgModule({
  providers: [TokenService, LayoutService, AppService]
})
export class FrameworkModule {}
