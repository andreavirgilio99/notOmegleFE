import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCache } from 'src/app/model/user-cache.model';
import { UserData } from 'src/app/model/user-data.model';
import { SocketService } from 'src/app/services/socket.service';
import { getUserData } from 'src/app/utils/get-user-data';

@Component({
  selector: 'app-videocall-page',
  templateUrl: './videocall-page.component.html',
  styleUrls: ['./videocall-page.component.css']
})
export class VideocallPageComponent implements OnInit {

  username = "JamesFranko"
  purpose = "I\'d like to beat it to human beings of dubious ages"
  sharedInterests = ["hunting", "fishing", "fucking"]
  chatMessages = [{
    text: "Hi how are you doing?",
    isYou: true
  },
  {
    text: "I hate people",
    isYou: false
  }, {
    text: "Hi how are you doing?",
    isYou: true
  },
  {
    text: "I hate people",
    isYou: false
  }, {
    text: "Hi how are you doing?",
    isYou: true
  },
  {
    text: "I hate people",
    isYou: false
  }, {
    text: "Hi how are you doing?",
    isYou: true
  },
  {
    text: "I hate people",
    isYou: false
  }, {
    text: "Hi how are you doing?",
    isYou: true
  },
  {
    text: "I hate people",
    isYou: false
  }, {
    text: "Hi how are you doing?",
    isYou: true
  },
  {
    text: "I hate people",
    isYou: false
  }, {
    text: "Hi how are you doing?",
    isYou: true
  },
  {
    text: "I hate people",
    isYou: false
  }, {
    text: "Hi how are you doing?",
    isYou: true
  },
  {
    text: "I hate people",
    isYou: false
  }, {
    text: "Hi how are you doing?",
    isYou: true
  },
  {
    text: "I hate people",
    isYou: false
  }, {
    text: "Hi how are you doing?",
    isYou: true
  },
  {
    text: "I hate people",
    isYou: false
  }, {
    text: "I hate people",
    isYou: false
  }, {
    text: "Hi how are you doing?",
    isYou: true
  },
  {
    text: "I hate people",
    isYou: false
  }, {
    text: "I hate people",
    isYou: false
  }, {
    text: "Hi how are you doing?",
    isYou: true
  },
  {
    text: "I hate people",
    isYou: false
  }, {
    text: "I hate people",
    isYou: false
  }, {
    text: "Hi how are you doing?",
    isYou: true
  },
  {
    text: "I hate people",
    isYou: false
  },]
  isStreaming: boolean = false;

  constructor(private router: Router, public socketService: SocketService) { }

  ngOnInit(): void {
    const userData = getUserData();

    if (!userData) {
      this.router.navigate(['/'])
    }
    else {
      this.socketService.socketInit()
    }
  }

  onVideoLoaded(e: any) {
    e.target.play();
  }

  startStreaming() {
    // Logica per iniziare lo streaming
    this.isStreaming = true;
    // ... (altro codice di avvio streaming)
  }

  stopStreaming() {
    // Logica per interrompere lo streaming
    this.isStreaming = false;
    // ... (altro codice di arresto streaming)
  }
}
