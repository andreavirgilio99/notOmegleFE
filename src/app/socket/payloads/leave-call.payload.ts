import { UserStatus } from "src/app/model/user-status.enum";

export interface LeaveCallPayload {
    status: UserStatus;
    isMinor: boolean;
}