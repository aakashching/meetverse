import { Component, OnInit } from '@angular/core';
import { SocketService } from './services/socket.service';
import { WeatherService } from './services/weather.service';
import {AnimationItem} from "lottie-web"
import {AnimationOptions} from "ngx-lottie"
import { ActivatedRoute } from '@angular/router';
import { MeetingService } from './services/meeting.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'meetverse';
  showNav=true;
  options:AnimationOptions={
    path:'assets/01d.json'
  }
  constructor(private route: ActivatedRoute,private socket: SocketService,private weatherService:WeatherService,private meeting:MeetingService) {
this.meeting.showNav.subscribe(bool=>{
  console.log(bool);
  
  this.showNav=bool;
})

  }
  ngOnInit() {
    console.log(window.location.pathname)
    
    setTimeout(()=>{
      console.log(this.socket.getSocket())
      // console.log(this.weatherService.getWeatherByCityName("muzaffarpur"))
      
    },2000)
    
  }
  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}