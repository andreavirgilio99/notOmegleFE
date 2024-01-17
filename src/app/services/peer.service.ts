import { Injectable } from '@angular/core';
import Peer from 'peerjs';

@Injectable({
  providedIn: 'root'
})
export class PeerService {
  MyPeer?: Peer

  async startPeer(onOpen: (peer: Peer) => Promise<void>) {
    this.MyPeer = new Peer();
    await onOpen(this.MyPeer);
  }
}
