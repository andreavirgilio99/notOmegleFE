import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Events } from '../socket/events/events.enum';
import { PeerService } from './peer.service';
import { User } from '../model/user.model';
import { SuccessfulPairingPayload } from '../socket/payloads/succesfful-paring.payload';
import Peer from 'peerjs';
import { DataRegistrationPayload } from '../socket/payloads/data-registration.payload';
import { getUserData } from '../utils/get-user-data';
import { UserStatus } from '../model/user-status.enum';
import { SearchStartPayload } from '../socket/payloads/search-start.payload';
import { MessageEventPayload } from '../socket/payloads/message-event.payload';
import { BoxMessage } from '../model/box-message.model';
import { Errors } from '../utils/errors.enum';
import { Subscription } from 'rxjs';
import { lostSocketConnectionMessage } from '../utils/constants';
import { successfulPairingHandler } from '../socket/events/handlers/successful-pairing.handler';
import { partnerDisconnectedHandler } from '../socket/events/handlers/partner-disconnected.handler';
import { messageReceivedHandler } from '../socket/events/handlers/message-received.handler';
import { returnToIdle } from '../utils/return-to-idle';
import { LeaveCallPayload } from '../socket/payloads/leave-call.payload';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  status: UserStatus = UserStatus.Idle;
  socket?: Socket //to take down listeners = off('eventName')
  myStream?: MediaStream
  partnerStream?: MediaStream
  camPartner?: User //the user we are in call with
  sharedInterests: string[] = [];
  messages: BoxMessage[] = [];
  subs: Subscription[] = []

  constructor(private peerService: PeerService) { }

  socketInit() {
    this.getUserStream();
    this.socket = io(environment.apiUrl);

    if (!environment.production) {
      this.socket.onAny((eventName: string, data: any[]) => {
        console.log('EVENT LOGGER:', eventName, data)
      })
    }

    this.socket.on(Events.Welcome, () => {
      this.handlersConfig()
      this.registerUser()
    })
  }

  registerUser() {
    this.peerService.startPeer((peer: Peer) => {
      return new Promise((resolve) => {
        peer.on('open', (peerId: string) => {

          const payload: DataRegistrationPayload = {
            data: {
              userData: getUserData()!,
              peerId: peerId
            }
          }

          this.socket!.emit(Events.DataRegistration, payload);
          resolve();
        })
      })
    })
  }

  handlersConfig() {
    if (this.socket) {
      this.peerService.$callReceived.subscribe((partnerStream: MediaStream) => {
        this.partnerStream = partnerStream
      })
      this.socket.on(`${this.socket!.id!}-${Events.SuccessfulPairing}`, (payload: SuccessfulPairingPayload) => {
        successfulPairingHandler(this, payload);

      })
      this.socket.on(`${this.socket!.id!}-${Events.PartnerDisconnected}`, () => {
        partnerDisconnectedHandler(this)
      })
      this.socket.on(`${this.socket.id}-${Events.MessageReceived}`, (payload: MessageEventPayload) => {
        messageReceivedHandler(this, payload);
      })
      this.socket.on(Events.Disconnect, () => {
        alert(lostSocketConnectionMessage);
        location.reload();
      });
    }
  }

  searchStart() {
    const payload: SearchStartPayload = {
      data: getUserData()!,
      status: this.status
    }

    this.socket!.emit(Events.SearchStart, payload);
    this.status = UserStatus.Pending;
    this.messages = [];
  }

  cancelSearch() {
    if (this.status == UserStatus.Pending) {
      this.socket!.emit(Events.SearchStop)
      this.status = UserStatus.Idle;
    }
  }

  sendMessage(content: string) {
    if (this.socket) {
      const mex: MessageEventPayload = {
        data: {
          content: content,
          sender: this.socket.id!,
          to: this.camPartner?.socketId!
        }
      }
      this.socket.emit(Events.SendMessage, mex)
    }
    else {
      alert(Errors.MissingSocket)
    }
  }

  getUserStream() {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      }
    }).then((stream) => {
      this.myStream = stream;
      this.peerService.setMyStream(this.myStream!)
    }).catch(err => {
      console.error(err)
      alert(err)
    })
  }

  stopCall() {
    const mex: LeaveCallPayload = {
      status: this.status,
      isMinor: getUserData()!.isMinor
    }

    this.socket!.emit(Events.LeaveCall, mex)
    returnToIdle(true, this);
  }

  //used to access peerService in socketEventsHandlers
  getPeerService(): PeerService {
    return this.peerService;
  }

  //called on VideoCall OnDestroy
  cleanSlate() {
    if (this.myStream) {
      this.myStream.getTracks().forEach(track => track.stop())
      this.myStream = undefined;
    }

    if (this.partnerStream) {
      this.partnerStream.getTracks().forEach(track => track.stop())
      this.partnerStream = undefined;
    }

    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.close();
      this.socket = undefined;
    }

    if (this.camPartner) {
      this.camPartner = undefined;
    }

    this.subs.forEach(sub => sub.unsubscribe())
    this.subs = [];

    this.status = UserStatus.Idle;
    this.sharedInterests = [];
    this.messages = [];

    this.peerService.cleanSlatePart2();
  }
}
