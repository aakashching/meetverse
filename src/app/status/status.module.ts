import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusRoutingModule } from './status-routing.module';
import { StatusComponent } from '../components/status/status.component';

@NgModule({
  declarations: [StatusComponent],
  entryComponents:[StatusComponent],
  imports: [
    CommonModule,
    StatusRoutingModule
  ]
})
export class StatusModule { 
  static entry = StatusComponent
}
