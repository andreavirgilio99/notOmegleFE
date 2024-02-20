import { BoxMessage } from "../model/box-message.model";
import { UserStatus } from "../model/user-status.enum";
import { SocketService } from "../services/socket.service";

export function returnToIdle(youLeft: boolean, ss: SocketService) {
    ss.camPartner = undefined;
    ss.partnerStream = undefined;
    ss.status = UserStatus.Idle;
    ss.sharedInterests = [];

    const partnerLeft: BoxMessage = {
        isSystem: true,
        isYou: false,
        content: youLeft ? "You left" : "Partner left"
    };

    ss.messages.push(partnerLeft);

    if (youLeft) {
        ss.getPeerService().closeCall();
    }
}