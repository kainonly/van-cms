import { NgModule } from '@angular/core';

import { TokenService } from './common/token.service';
import { LayoutService } from './common/system.service';
import { MainService } from './common/main.service';

@NgModule({
  providers: [TokenService, LayoutService, MainService]
})
export class FrameworkModule {}
