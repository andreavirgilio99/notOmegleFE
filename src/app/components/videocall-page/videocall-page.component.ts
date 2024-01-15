import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCache } from 'src/app/model/user-cache.model';
import { UserData } from 'src/app/model/user-data.model';

@Component({
  selector: 'app-videocall-page',
  templateUrl: './videocall-page.component.html',
  styleUrls: ['./videocall-page.component.css']
})
export class VideocallPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    const userData = this.getUserData();

    if (!userData) {
      this.router.navigate(['/'])
    }
    else {
      //connect to websocket
    }
  }

  getUserData(): UserData | undefined {
    const sessionCachedData = sessionStorage.getItem('userData');
    const localCachedData = localStorage.getItem('userData');
    let userData: UserData | undefined = undefined;

    if (sessionCachedData) {
      const parsedData: UserCache = JSON.parse(sessionCachedData);
      userData = parsedData.data;
    }

    else if (localCachedData) {
      const parsedData: UserCache = JSON.parse(localCachedData);
      userData = parsedData.data;
    }

    return userData;
  }
}
