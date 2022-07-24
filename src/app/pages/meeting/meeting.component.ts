import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting.service';
import { UserStreamService } from 'src/app/services/user-stream.service';
import { StreamConfig } from '../preview/preview.component';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  streamCfg: StreamConfig = {
    audio: {
      enabled: true,
    },
    video: {
      enabled: true,
    }
  }
  constructor(private userStream:UserStreamService,private meeting:MeetingService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    if(!this.userStream.getLocalStream()){
      this.router.navigateByUrl(`/preview?meetid=${this.route.snapshot.queryParams.meetid}`)
    }
    
  }

  toggleMuteBtn() {
    let mic = this.userStream.toggleMute().enabled
    this.streamCfg.audio.enabled = mic;
  }
  toggleVideoBtn() {
    this.streamCfg.video.enabled = this.userStream.toggleVideo().enabled
  }
  leaveMeeting(){
    this.meeting.leaveMeeting();
  }
}
