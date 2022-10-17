import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviewRoutingModule } from './preview-routing.module';
import { PreviewComponent } from '../pages/preview/preview.component';
import {LottieModule} from "ngx-lottie"
import player from "lottie-web"
import { FormsModule, NgForm } from '@angular/forms';
export function playerFactory(){

  return player;
}

@NgModule({
  declarations: [PreviewComponent],
  entryComponents:[PreviewComponent],
  imports: [
    CommonModule,
    PreviewRoutingModule,
    LottieModule.forRoot({player:playerFactory}),
    FormsModule
  ]
})
export class PreviewModule { }
