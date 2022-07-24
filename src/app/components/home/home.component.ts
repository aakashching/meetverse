import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
socket;
  constructor(private router:Router,private socketIo:SocketService) { }

  ngOnInit() {
    this.socket=this.socketIo.getSocket();
  }
joinFn(meet:HTMLInputElement){
  if(meet.value.trim().length==0) return;
  this.router.navigateByUrl(`/preview?meetid=${meet.value}`)
}

createFn(meetInput:HTMLInputElement){
  this.socket.emit("create");
  this.socket.on("created", (data) => {
    let { roomId } = data;
    console.log(roomId);
    meetInput.value=roomId;
  });
}
}
