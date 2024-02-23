import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SocketService } from 'src/app/services/socket.service';
import { Required } from 'src/app/utils/required.validator';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  newMessage = new FormControl('', Required)

  constructor(public socketService: SocketService) { }

  messageKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.sendMessage()
    }
  }

  sendMessage() {
    if (this.newMessage.valid) {
      this.socketService.sendMessage(this.newMessage.value!);
      this.newMessage.setValue('')
    }
  }

  detectLinks(messageContent: string): string {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return messageContent.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
  }
}
