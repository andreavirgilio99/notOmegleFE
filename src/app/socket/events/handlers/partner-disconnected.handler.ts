import { SocketService } from "src/app/services/socket.service";
import { returnToIdle } from "src/app/utils/return-to-idle";

export function partnerDisconnectedHandler(ss: SocketService) {
    returnToIdle(false, ss)
}