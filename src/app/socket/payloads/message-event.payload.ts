import { Message } from "src/app/model/message.model";

//used for both message events
export interface MessageEventPayload {
    data: Message
}