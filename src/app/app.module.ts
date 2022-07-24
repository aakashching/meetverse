import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { SocketService } from './services/socket.service';
import {HttpClientModule} from "@angular/common/http"
import {LottieModule} from "ngx-lottie"
import player from "lottie-web";
import { MeetingComponent } from './pages/meeting/meeting.component'

export function playerFactory(){

  return player;
}


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PreviewComponent,
    MeetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LottieModule.forRoot({player:playerFactory})
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
