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
import { FormsModule, } from '@angular/forms';
import { MessageComponent } from './components/message/message.component';
import { StatusComponent } from './components/status/status.component';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
export function playerFactory(){

  return player;
}


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    // LoginComponent,
    // RegisterComponent,
    // PreviewComponent,
    // MeetingComponent,
    // MessageComponent,
    // StatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // LoginModule,
    // RegisterModule,
    HttpClientModule,
    FormsModule,
    LottieModule.forRoot({player:playerFactory})
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
