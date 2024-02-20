import { Injectable } from '@angular/core';
import Peer, { MediaConnection } from 'peerjs';
import { Subject } from 'rxjs';
import { Errors } from '../utils/errors.enum';

@Injectable({
  providedIn: 'root'
})
export class PeerService {
  MyPeer?: Peer
  call?: MediaConnection
  myStream?: MediaStream
  $callReceived = new Subject<MediaStream>();

  async startPeer(onOpen: (peer: Peer) => Promise<void>) {
    this.MyPeer = new Peer();
    await onOpen(this.MyPeer);

    this.MyPeer.on('disconnected', () => {
      this.MyPeer!.reconnect()
    })

    this.MyPeer!.on('call', (call: MediaConnection) => {
      this.dudeCalledYou(call)
    })
  }

  setMyStream(stream: MediaStream) {
    this.myStream = stream;
  }

  closeCall = () => {
    if (this.call) {
      this.call.close();
      this.call = undefined;
    }
  }

  callDude(dude: string): Promise<MediaStream> {
    return new Promise<MediaStream>((resolve, reject) => {
      if (this.MyPeer) {
        if (this.myStream) {
          this.call = this.MyPeer.call(dude, this.myStream);

          this.call.on('stream', (remoteStream) => {

            if (this.call) {
              this.call.peerConnection.oniceconnectionstatechange = () => {

                if (this.call && this.call.peerConnection.iceConnectionState == 'disconnected') {
                  this.closeCall()
                }
              }
            }
            else {
              reject(Errors.MissingConnection)
            }

            resolve(remoteStream);
          })
        }
        else {
          reject(Errors.MissingStream)
        }
      }
      else {
        reject(Errors.MissingPeer)
      }
    })
  }

  dudeCalledYou(call: MediaConnection) {
    if (this.myStream) {
      call.answer(this.myStream);
      call.on('stream', (remoteStream) => {
        this.$callReceived.next(remoteStream)
        if (call.peerConnection.iceConnectionState == 'disconnected') {
          this.closeCall()
        }
      })
    }
    else {
      alert(Errors.MissingStream)
    }
  }

  cleanSlatePart2() {
    if (this.MyPeer) {
      this.MyPeer.removeAllListeners();
      this.MyPeer.destroy();
      this.MyPeer = undefined;
    }

    if (this.call) {
      this.call.close();
      this.call = undefined;
    }
  }
}
