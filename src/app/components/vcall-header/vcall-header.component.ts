import { Component } from '@angular/core';
import { UserStatus } from 'src/app/model/user-status.enum';
import { SocketService } from 'src/app/services/socket.service';
import { getUserData } from 'src/app/utils/get-user-data';

@Component({
  selector: 'app-vcall-header',
  templateUrl: './vcall-header.component.html',
  styleUrls: ['./vcall-header.component.css']
})
export class VcallHeaderComponent {
  UserStatus = UserStatus;
  userInterests: string[] = getUserData()?.interests || []

  constructor(public socketService: SocketService) { }
}
