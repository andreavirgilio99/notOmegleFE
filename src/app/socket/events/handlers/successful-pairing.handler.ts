import { SuccessfulPairingPayload } from "../../payloads/succesfful-paring.payload";
import { UserStatus } from "src/app/model/user-status.enum";
import { Errors } from "src/app/utils/errors.enum";
import { SocketService } from "src/app/services/socket.service";

export function successfulPairingHandler(ss: SocketService, payload: SuccessfulPairingPayload) {
    ss.camPartner = payload.camPartner;
    ss.status = UserStatus.Paired;
    ss.sharedInterests = payload.sharedInterests;

    if (payload.youCall) {
        ss.getPeerService().callDude(ss.camPartner!.peerId).then((receivedStream: MediaStream) => {
            ss.partnerStream = receivedStream;
        }).catch((error: Errors) => {
            alert(error)
        })
    }
}