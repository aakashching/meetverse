import { Injectable } from '@angular/core';
import  {io} from "socket.io-client"


@Injectable({
  providedIn: 'root'
})
export class SocketService {
private socket=null
  constructor() { 
    this.socket=io(/* enter your socket server url*/)
    this.socket.on("connect", () => {

      console.log(this.socket.id); // x8WIv7-mJelg7on_ALbx
    });
    console.log("Socket service",this.socket)
  }
  getSocket(){
    return this.socket;
  }
}
