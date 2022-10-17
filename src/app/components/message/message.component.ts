import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message: any = []
  mySocketId: string;
  @ViewChild("ref", { static: true }) divRef: HTMLDivElement;
  constructor(private msgService: MessageService, private socketServie: SocketService) {

  }

  ngOnInit() {
    this.message = [...this.msgService.getAllMsg()]
    this.msgService.message.subscribe(data => {
      let sound = new Audio("../../../assets/goldencookie0-43081.mp3")
      sound.play()
      this.message.push(data);
      // console.log(data)
      this.scroll()
    })
    this.mySocketId = this.socketServie.getSocket().id
  }

  onSend(msg: HTMLInputElement) {
    if (msg.value == '') return;
    this.message.push({ message: msg.value, socketId: this.mySocketId });
    this.msgService.sendMsg(msg.value);
    msg.value = ""
    this.scroll()
  }
  scroll() {
    try {

      setTimeout(() => {
        // document.getElementById("divRef").scrollIntoView({ behavior: "smooth" })
        this.divRef.scrollIntoView({ behavior: "smooth" })

      }, 100);

    } catch (error) {
      console.log(error);
    }
  }
}
