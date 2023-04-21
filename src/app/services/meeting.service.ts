import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { UserStreamService } from './user-stream.service';
import SimplePeer from "simple-peer/simplepeer.min"
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private configuration =  {
    iceServers: [
      {
        urls: "stun:stun4.l.google.com:19302",
      },
      {
        urls: "stun:stun.services.mozilla.com",
      },
    ],
  };
  showNav = new Subject<boolean>();
  private localStream;
  private displayStream
  private peers={}
  private streams={}
  private socket=null;
  private meetId=null
  private activeUser=new Subject<Array<string>>()
  constructor(private socketIo:SocketService,private userStream:UserStreamService,private router:Router) {
    this.socket=this.socketIo.getSocket()
    this.socket.on("invalidRoom", () => {
      alert("invalid room id");
    });
    this.socket.on("initReceive", (socket_id) => {
      console.log("init received", socket_id);
      this.addPeer(socket_id, false);
   
      this.socket.emit("initSend", socket_id);
      // if any user is share already screen media then the screen media will be added to the channel or RTC peer connection
      if(this.displayStream){
        
          this.peers[socket_id].addTrack(this.displayStream.getVideoTracks()[0],this.displayStream);
          this.peers[socket_id].addTrack(this.displayStream.getAudioTracks()[0],this.displayStream);
        
      }
    });
    
    this.socket.on("initSend", (socket_id) => {
      console.log("INIT SEND " + socket_id);
      // console.log(peers);
      this.addPeer(socket_id, true);
    });
    
    this.socket.on("removePeer", (socket_id) => {
      console.log("removing peer " + socket_id);
      this.removePeer(socket_id);
    });
    
    this.socket.on("disconnect", () => {
      console.log("GOT DISCONNECTED");
      for (let socket_id in this.peers) {
        this.removePeer(socket_id);
      }
    });
    this.socket.on("signal", (data) => {
      console.log("signal", this.peers);
      this.peers[data.socket_id].signal(data.signal);
    
      console.log(this.peers[data.socket_id]);
    });
   }

   join(meetId:string){
     this.meetId=meetId
     this.socket.emit("join", { roomId: meetId })
     this.localStream=this.userStream.getLocalStream()
    this.router.navigateByUrl(`/meeting?meetid=${meetId}`).finally(()=>{
      this.showNav.next(false)
    })
   }

   addPeer(socket_id, am_initiator) {
    console.log("peer added", am_initiator);
    console.log(this.peers)
    this.peers[socket_id] = new SimplePeer({
      initiator: am_initiator,
      stream: this.localStream,
      config: this.configuration,
    });
  
    this.peers[socket_id].on("signal", (data) => {
      console.log(data);
  
      this.socket.emit("signal", {
        signal: data,
        socket_id: socket_id,
      });
    });
  
    this.peers[socket_id].on("stream", (stream:MediaStream) => {
      // if (!this.streams[stream.id]) {
        console.log("Streaming new video");
        let videos = document.getElementById("videos")
        let newVid = document.createElement("video");
        newVid.srcObject = stream;
        newVid.id = socket_id;
        // newVid.playsInline = false;
        newVid.autoplay = true;
        newVid.controls=false
        newVid.className = "vid";
        newVid.style.width="100%"
                newVid.onclick = () => newVid.requestFullscreen();
                // newVid.onstalled=() => newVid.parentNode.removeChild(newVid)
                // newVid.onpause=() => newVid.parentNode.removeChild(newVid);
                //   newVid.onsuspend=() => newVid.parentNode.removeChild(newVid);
                //   newVid.onerror=() => newVid.parentNode.removeChild(newVid);
                //   newVid.onended=() => newVid.parentNode.removeChild(newVid);
                //   newVid.onwaiting=() => newVid.parentNode.removeChild(newVid);
                //   newVid.onratechange=() => newVid.parentNode.removeChild(newVid);

                // when user clicks on stop button then track will be removed from the stream
                stream.onremovetrack=() => newVid.parentNode.removeChild(newVid);
        // newVid.onclick = () => openPictureMode(newVid);
        // newVid.ontouchstart = (e) => openPictureMode(newVid);
        videos.appendChild(newVid);
        this.activeUser.next(Object.keys(this.peers));
        this.streams[stream.id] = stream;
      // }
    });
    this.peers[socket_id].on("track", (track, stream) => {
      console.log(stream);
    });
  }
  removePeer(socket_id) {
    let videoEl = document.getElementById(socket_id) as any;
    if (videoEl) {
      const tracks = videoEl.srcObject.getTracks();
  
      tracks.forEach(function (track) {
        track.stop();
      });
  
      videoEl.srcObject = null;
      videoEl.parentNode.removeChild(videoEl);
    }
    if (this.peers[socket_id]) this.peers[socket_id].destroy();
    delete this.peers[socket_id];
  }

 shareMedia(){
   
  let media:any = navigator.mediaDevices;
    media.getDisplayMedia({audio:true,video:true}).then((stream:MediaStream)=>{
      this.displayStream=stream


      // adding the event listner whenever user clicks on the stop sharing buttion and removing the tracks from the stream using event callback 
      stream.getVideoTracks()[0].addEventListener("ended",(event)=>{
        for(let peer in this.peers){
          this.peers[peer].removeTrack(this.displayStream.getVideoTracks()[0],this.displayStream);
          this.peers[peer].removeTrack(this.displayStream.getAudioTracks()[0],this.displayStream);
        }
      })
      console.log(stream.getVideoTracks(),stream.getAudioTracks())
      for(let peer in this.peers){
        this.peers[peer].addTrack(stream.getVideoTracks()[0],stream);
        this.peers[peer].addTrack(stream.getAudioTracks()[0],stream);
      }
    })
  }
  stopMedia(){
    
  }


  leaveMeeting() {
    for (let id in this.peers) {
      this.peers[id].destroy();
      delete this.peers[id];
    }
    let vidElm:any = document.getElementById("userStream_feedback");
    if(vidElm) {
      let streams = vidElm.srcObject.getTracks();
      streams.forEach(track => {
        track.stop()
      });
    }

    document.getElementById("videos").innerHTML = "";
    // videos.classList.remove("videos-container");
    // localVideo.classList.remove("vid-move");
    this.socket.off("disconnect");
    this.socket.close()
    this.socket.reconnect();
    // this.socket=null;

    this.userStream.closeMediaStream()
    this.router.navigate(["/"])
  }
  getMeetingId(){
    return this.meetId;
  }
  getActiveUsers(){
  
   return this.activeUser
  }

}
