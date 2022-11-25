import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStreamService {
  private userStream: MediaStream;
  private screenStream: MediaStream;
  constraints = {
    audio: true,
    video: {
      width: {
        min: 360,
        max: 480,
      },
      height: {
        min: 240,
        max: 360,
      },
    },
  };
  constructor() { 


  }

  getLocalStream(){
    return this.userStream
  }
  getUserStream() {
    let observ = new Observable((sub) => {

      navigator.mediaDevices.getUserMedia(this.constraints).then(stream => {
        this.userStream = stream;

        sub.next(this.userStream)
      })

    })
    return observ

  }
  getScreenStream() {
    let observ = new Observable((sub) => {
//@ts-ignore
      navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(stream => {
        this.screenStream = stream;
        sub.next(this.screenStream)
      })

    })
    return observ

  }
  toggleMute() {
    this.userStream.getAudioTracks()[0].enabled = !this.userStream.getAudioTracks()[0].enabled

    return { enabled: this.userStream.getAudioTracks()[0].enabled }
  }
  toggleVideo() {
    this.userStream.getVideoTracks()[0].enabled = !this.userStream.getVideoTracks()[0].enabled
    
    return { enabled: this.userStream.getVideoTracks()[0].enabled }
  }
  closeMediaStream(){
  this.userStream.removeTrack(this.userStream.getVideoTracks()[0])
  this.userStream.removeTrack(this.userStream.getAudioTracks()[0])
  }
}
