import { Injectable } from '@angular/core';
import  {io} from "socket.io-client"


@Injectable({
  providedIn: 'root'
})
export class SocketService {
private socket=null
  constructor() { 
    this.socket=io("https://calm-reef-30045.herokuapp.com")
    this.socket.on("connect", () => {

      console.log(this.socket.id); // x8WIv7-mJelg7on_ALbx
    });
    console.log("Socket service",this.socket)
  }
  getSocket(){
    return this.socket;
  }
}
