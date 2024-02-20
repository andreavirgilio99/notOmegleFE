export interface Message {
    sender: string; //sender username
    content: string;
    to: string; //receiver socketId
}