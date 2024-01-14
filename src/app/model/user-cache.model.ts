import { UserData } from "./user-data.model";

export interface UserCache {
    data: UserData
    rememberMe: boolean;
}