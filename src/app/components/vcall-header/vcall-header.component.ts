import { Component } from '@angular/core';
import { UserStatus } from 'src/app/model/user-status.enum';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-vcall-header',
  templateUrl: './vcall-header.component.html',
  styleUrls: ['./vcall-header.component.css']
})
export class VcallHeaderComponent {
  UserStatus = UserStatus;

  constructor(public socketService: SocketService) { }
}
