import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { from, Observable, Subscriber } from 'rxjs';
import { AnimationItem } from "lottie-web"
import { AnimationOptions } from "ngx-lottie"
import { WeatherService } from 'src/app/services/weather.service';
import { UserStreamService } from 'src/app/services/user-stream.service';
import { ActivatedRoute } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting.service';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit, AfterViewInit {
  options: AnimationOptions = {
    path: 'assets/01d.json'
  }
  stream: MediaStream;
  weatherData: any = {};
  streamCfg: StreamConfig = {
    audio: {
      enabled: true,
    },
    video: {
      enabled: true,
    }
  }
  @ViewChild("video", { static: false }) vid: HTMLVideoElement;
  time = new Observable((sub) => {
    setInterval(() => {
      sub.next(Date.now())
    }, 1000)
  })
  constructor(private route: ActivatedRoute, private weatherService: WeatherService, private userStream: UserStreamService,private meeting:MeetingService) {

  }
  ngAfterViewInit() {
    this.userStream.getUserStream().subscribe((stream: MediaStream) => {
      // this.stream=stream
      // if(stream)
      //    this.vid.srcObject = stream;
      let user: any = document.getElementById("userStream")
      user.srcObject = stream;

      console.log(stream)

      user.onloadedmetadata = () => {
        user.muted = true

        user.play()
      }
    })
    console.log("view init")
  }

  ngOnInit() {
  this.route.snapshot.queryParams.meetid



    // weather by city name
    /*
    this.weatherService.getWeatherByCityName("Goa").subscribe((data)=>{
      this.weatherData=data;
      this.options={
        ...this.options,
        path: `assets/${this.weatherData.weather[0].icon? this.weatherData.weather[0].icon :'assets/01d.json' }.json`
      }
      console.log(data)
    },(err)=>alert(err.message))
    */

    // weather by lat & lon

    navigator.geolocation.getCurrentPosition(pos => {
      this.weatherService.getWeatherByLatitude(pos.coords.latitude, pos.coords.longitude).subscribe((data) => {
        this.weatherData = data;
        this.options = {
          ...this.options,
          path: `assets/${this.weatherData.weather[0].icon ? this.weatherData.weather[0].icon : 'assets/01d.json'}.json`
        }
        console.log(data)
      })
    })
  }
  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  toggleMuteBtn() {
    let mic = this.userStream.toggleMute().enabled
    this.streamCfg.audio.enabled = mic;
  }
  toggleVideoBtn() {
    this.streamCfg.video.enabled = this.userStream.toggleVideo().enabled
  }
joinAction(){
  this.meeting.join(this.route.snapshot.queryParams.meetid)
}
}

export interface StreamConfig {
  audio: {
    enabled: boolean,
  },
  video: {
    enabled: boolean
  }
}

