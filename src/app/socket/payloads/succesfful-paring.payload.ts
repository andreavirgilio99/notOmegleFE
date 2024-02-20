import { User } from "src/app/model/user.model";

export interface SuccessfulPairingPayload {
    camPartner: User;
    sharedInterests: string[];
    youCall: boolean; //determines wheter this user will be the caller or the receiver
}