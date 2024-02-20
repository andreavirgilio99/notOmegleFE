import { UserData } from "./user-data.model";

type SocketClient = any; //the type doesn't exist on the client, this property is used only in the BackEnd.

export interface User {
    userData: UserData;
    peerId: string;
    socketId?: string;
    camPartner?: SocketClient
    socket?: SocketClient;
}