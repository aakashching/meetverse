import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
socket: { emit: (arg0: string) => void; on: (arg0: string, arg1: (data: { roomId: any; }) => void) => void; };
  constructor(private router: Router, private socketIo: SocketService,private meeting:MeetingService) { }

  ngOnInit() {
    this.socket = this.socketIo.getSocket();
    this.meeting.showNav.next(true)
  }
joinFn(meet: HTMLInputElement) {
  if (meet.value.trim().length === 0) { return; }
  this.router.navigateByUrl(`/preview?meetid=${meet.value}`);
}

createFn(meetInput: HTMLInputElement) {
  this.socket.emit('create');
  this.socket.on('created', (data: { roomId: any; }) => {
    const { roomId } = data;
    console.log(roomId);
    meetInput.value = roomId;
  });
}
}
