import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MeetingService } from './meeting.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  socket: any;
  messages:any=[];
  message = new Subject<{ id: number, message: string }>();
  constructor(private socketService: SocketService,private meeting:MeetingService) {
    this.socket = this.socketService.getSocket();
    this.socket.on("msgRecive", (data) => {
      this.messages.push(data)
      this.message.next(data);
    })
  }

  sendMsg(message: string) {
    this.messages.push({ message: message, roomId: this.meeting.getMeetingId(),socketId:this.socket.id })
    this.socket.emit("sendMsg", { message: message, roomId: this.meeting.getMeetingId(),socketId:this.socket.id })
  }
  getAllMsg(){
    return this.messages
  }
}
