import { AfterViewInit, Component, OnInit, ViewChild,OnDestroy } from '@angular/core';
import { from, Observable, Subscriber } from 'rxjs';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { WeatherService } from 'src/app/services/weather.service';
import { UserStreamService } from 'src/app/services/user-stream.service';
import { ActivatedRoute } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit, AfterViewInit,OnDestroy {
  options: AnimationOptions = {
    path: 'assets/01d.json',
  };
  stream: MediaStream;
  weatherData: any = {};
  streamCfg: StreamConfig = {
    audio: {
      enabled: true,
    },
    video: {
      enabled: true,
    },
  };
  @ViewChild('video', { static: false }) vid: HTMLVideoElement;
  nameModel:string='';
  time = new Observable((sub) => {
    setInterval(() => {
      sub.next(Date.now());
    }, 1000);
  });
  user:any=null;
  // tslint:disable-next-line: max-line-length
  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private userStream: UserStreamService,
    private meeting: MeetingService,
    private auth:AuthService
  ) {}
  ngAfterViewInit() {
    // tslint:disable-next-line: deprecation
    this.userStream.getUserStream().subscribe((stream: MediaStream) => {
      // this.stream=stream
      // if(stream)
      //    this.vid.srcObject = stream;
      const user: any = document.getElementById('userStream');
      user.srcObject = stream;

      console.log(stream);

      user.onloadedmetadata = () => {
        user.muted = true;

        user.play();
      };
    });
    console.log('view init');
    this.nameModel=this.user.firstName+" "+this.user.lastName
  }

  ngOnInit() {
    // tslint:disable-next-line: no-unused-expression
    this.route.snapshot.queryParams.meetid;
this.user=this.auth.getUser()
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

    navigator.geolocation.getCurrentPosition((pos) => {
      this.weatherService
        .getWeatherByLatitude(pos.coords.latitude, pos.coords.longitude)
        // tslint:disable-next-line: deprecation
        .subscribe((data) => {
          this.weatherData = data;
          this.options = {
            ...this.options,
            path: `assets/${
              this.weatherData.weather[0].icon
                ? this.weatherData.weather[0].icon
                : 'assets/01d.json'
            }.json`,
          };
          console.log(data);
        });
    });
  }
  ngOnDestroy(){
    // const user: any = document.getElementById('userStream');
    //   let tracks = user.srcObject.getTracks();
    //   tracks.forEach(track => track.stop());
    //   user.srcObject=null;
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  toggleMuteBtn() {
    const mic = this.userStream.toggleMute().enabled;
    this.streamCfg.audio.enabled = mic;
  }
  toggleVideoBtn() {
    this.streamCfg.video.enabled = this.userStream.toggleVideo().enabled;
  }
  joinAction() {
    this.meeting.join(this.route.snapshot.queryParams.meetid);
  }
}

export interface StreamConfig {
  audio: {
    enabled: boolean;
  };
  video: {
    enabled: boolean;
  };
}
