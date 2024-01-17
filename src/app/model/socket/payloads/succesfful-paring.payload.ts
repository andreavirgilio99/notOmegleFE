import { User } from "../../user.model";

export interface SuccessfulPairingPayload {
    camPartner: User;
    youCall: boolean; //determines wheter this user will be the caller or the receiver
}