import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingRoutingModule } from './meeting-routing.module';
import { MeetingComponent } from '../pages/meeting/meeting.component';
import { MessageComponent } from '../components/message/message.component';

@NgModule({
  declarations: [MeetingComponent,MessageComponent],
  entryComponents:[MeetingComponent],
  imports: [
    CommonModule,
    MeetingRoutingModule
  ]
})
export class MeetingModule { }
