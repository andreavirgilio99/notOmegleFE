import { BoxMessage } from "src/app/model/box-message.model";
import { MessageEventPayload } from "../../payloads/message-event.payload";
import { SocketService } from "src/app/services/socket.service";

export function messageReceivedHandler(ss: SocketService, payload: MessageEventPayload) {
    if (ss.camPartner && ss.socket) {
        const bm: BoxMessage = {
            isSystem: false,
            isYou: ss.socket.id === payload.data.sender,
            content: payload.data.content
        }

        ss.messages.push(bm);
    }
}