import { NgModule } from '@angular/core';

import { ShareModule } from '@vanx/framework';
import { FrameworkComponentModule } from '@vanx/framework/component';

import { ActivitiesService } from './activities.service';
import { ActivitiesComponent } from './activities/activities.component';
import { LogsService } from './logs.service';
import { LogsComponent } from './logs/logs.component';

@NgModule({
  imports: [ShareModule, FrameworkComponentModule],
  declarations: [LogsComponent, ActivitiesComponent],
  exports: [LogsComponent, ActivitiesComponent],
  providers: [LogsService, ActivitiesService]
})
export class SecurityModule {}
