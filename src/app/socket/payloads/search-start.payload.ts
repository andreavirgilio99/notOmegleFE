import { UserData } from "src/app/model/user-data.model";
import { UserStatus } from "src/app/model/user-status.enum";


export interface SearchStartPayload {
    data: UserData;
    status: UserStatus;
}