import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { dontTouchMyStorage } from 'src/app/utils/constants';
import { getUserData } from 'src/app/utils/get-user-data';

@Component({
  selector: 'app-videocall-page',
  templateUrl: './videocall-page.component.html',
  styleUrls: ['./videocall-page.component.css']
})
export class VideocallPageComponent implements OnInit, OnDestroy {

  constructor(private router: Router, public socketService: SocketService) { }

  ngOnInit(): void {
    const userData = getUserData();

    if (!userData) {
      this.router.navigate(['/'])
    }
    else {
      this.socketService.socketInit()
      window.addEventListener('storage', this.lulz)
    }
  }

  lulz = () => {
    const justDont = dontTouchMyStorage;
    justDont.forEach(youSuck => alert(youSuck));
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.socketService.cleanSlate();
    window.removeEventListener('storage', this.lulz)
  }
}
