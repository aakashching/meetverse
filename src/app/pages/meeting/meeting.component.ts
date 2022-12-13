import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting.service';
import { UserStreamService } from 'src/app/services/user-stream.service';
import { StreamConfig } from '../preview/preview.component';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit,AfterViewInit {
  streamCfg: StreamConfig = {
    audio: {
      enabled: true,
    },
    video: {
      enabled: true,
    }
  };
  showChat:boolean=false
  // tslint:disable-next-line: max-line-length
  constructor(private userStream: UserStreamService, private meeting: MeetingService, private route: ActivatedRoute, private router: Router) {
    this.meeting.getActiveUsers().subscribe(users=>console.log(users))
   }

  ngOnInit() {
    if (!this.userStream.getLocalStream()) {
      this.router.navigateByUrl(`/preview?meetid=${this.route.snapshot.queryParams.meetid}`);
    }

  }
  ngAfterViewInit(){
   let vidElem:HTMLVideoElement|any = document.getElementById("userStream_feedback");
   vidElem.srcObject=this.userStream.getLocalStream()
   vidElem.onloadedmetadata=function(){
     vidElem.muted=true;
     vidElem.play()
   }
   this.streamCfg.audio.enabled=this.userStream.getLocalStream().getAudioTracks()[0].enabled
   this.streamCfg.video.enabled=this.userStream.getLocalStream().getVideoTracks()[0].enabled
  }
toggleShowChat(){
  this.showChat=!this.showChat
}
  toggleMuteBtn() {
    const mic = this.userStream.toggleMute().enabled;
    this.streamCfg.audio.enabled = mic;
  }
  toggleVideoBtn() {
    this.streamCfg.video.enabled = this.userStream.toggleVideo().enabled;
  }
  shareMediaBtn(){
    this.meeting.shareMedia()
  }
  leaveMeeting(){
    this.meeting.leaveMeeting();
  }
}
