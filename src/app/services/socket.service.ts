import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Events } from '../model/socket/events.enum';
import { PeerService } from './peer.service';
import { User } from '../model/user.model';
import { SuccessfulPairingPayload } from '../model/socket/payloads/succesfful-paring.payload';
import Peer from 'peerjs';
import { DataRegistrationPayload } from '../model/socket/payloads/data-registration.payload';
import { getUserData } from '../utils/get-user-data';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  camPartner?: User //the user we are in call with
  socket?: Socket //to take down listeners = off('eventName')
  myStream?: MediaStream
  partnerStream?: MediaStream

  constructor(private peerService: PeerService) { }

  socketInit() {
    this.getStream();
    this.socket = io(environment.apiUrl);

    if (!environment.production) {
      this.socket.onAny((eventName: string, data: any[]) => {
        console.log('EVENT LOGGER:', eventName, data)
      })
    }

    this.socket.on(Events.Welcome, (message: string) => {
      console.log(message);

      if (this.socket) {
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

        this.socket.on(`${this.socket!.id!}-${Events.SuccessfulPairing}`, (payload: SuccessfulPairingPayload) => {
          this.camPartner = payload.camPartner;
        })

        this.socket.on(`${this.socket!.id!}-${Events.PartnerDisconnected}`, () => {
          this.camPartner = undefined
        })
      }
    })
  }

  getStream() {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      }
    }).then((stream) => {
      this.myStream = stream;
    }).catch(err => {
      console.error(err)
    })
  }
}
