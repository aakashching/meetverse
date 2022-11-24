import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingRoutingModule } from './meeting-routing.module';
import { MeetingComponent } from '../pages/meeting/meeting.component';
import { MessageComponent } from '../components/message/message.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MeetingComponent,MessageComponent],
  entryComponents:[MeetingComponent],
  imports: [
    CommonModule,
    MeetingRoutingModule,
    FormsModule
  ]
})
export class MeetingModule { }
