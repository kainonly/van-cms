import { NgModule } from '@angular/core';
import { ShareModule } from '@vanx/framework';
import { LogsComponent } from './logs/logs.component';
import { ActivitiesComponent } from './activities/activities.component';
import { FrameworkComponentModule } from '@vanx/framework/component';
import { LogsService } from './logs.service';
import { ActivitiesService } from './activities.service';

@NgModule({
  imports: [
    ShareModule,
    FrameworkComponentModule
  ],
  declarations: [
    LogsComponent,
    ActivitiesComponent
  ],
  exports: [
    LogsComponent,
    ActivitiesComponent
  ],
  providers: [
    LogsService,
    ActivitiesService
  ]
})
export class SecurityModule {
}
