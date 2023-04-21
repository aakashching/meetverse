import { Injectable } from '@angular/core';
import  {io} from "socket.io-client"
import {socketUrl} from "../env/env"

@Injectable({
  providedIn: 'root'
})
export class SocketService {
private socket=null
  constructor() { 
    this.connect()
  }
  connect(){
    this.socket=io(socketUrl)
    // this.socket=io("http://localhost:3000")
    this.socket.on("connect", () => {

      console.log(this.socket.id); // x8WIv7-mJelg7on_ALbx
    });
    console.log("Socket service",this.socket)
  }
  getSocket(){
    if(this.socket)
    return this.socket;
  }
  reconnect(){
    this.socket=null;
    this.connect()
  }
}
