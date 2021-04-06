import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MediaComponent } from './media.component';
import { ShareModule } from 'van-skeleton';

@NgModule({
  imports: [
    ShareModule,
    ScrollingModule,
    DragDropModule
  ],
  declarations: [
    MediaComponent
  ],
  exports: [
    MediaComponent
  ]
})
export class MediaModule {
}

