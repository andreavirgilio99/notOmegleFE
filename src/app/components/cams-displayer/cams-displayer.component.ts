import { Component } from '@angular/core';
import { UserStatus } from 'src/app/model/user-status.enum';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-cams-displayer',
  templateUrl: './cams-displayer.component.html',
  styleUrls: ['./cams-displayer.component.css']
})
export class CamsDisplayerComponent {
  UserStatus = UserStatus;

  constructor(public socketService: SocketService) { }

  onVideoLoaded(e: any) {
    e.target.play();
  }
}
