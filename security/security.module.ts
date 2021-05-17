import { NgModule } from '@angular/core';
import { ShareModule } from '@vanx/framework';
import { LogService } from './log.service';
import { LogsComponent } from './logs/logs.component';
import { ActivitiesComponent } from './activities/activities.component';

@NgModule({
  imports: [
    ShareModule
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
    LogService
  ]
})
export class SecurityModule {
}
