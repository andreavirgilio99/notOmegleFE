import { UserCache } from "../model/user-cache.model";
import { UserData } from "../model/user-data.model";

export function getUserData(): UserData | undefined {
    const sessionCachedData = sessionStorage.getItem('userData');
    const localCachedData = localStorage.getItem('userData');
    let userData: UserData | undefined = undefined;

    if (sessionCachedData) {
        const parsedData: UserCache = JSON.parse(sessionCachedData);
        userData = parsedData.data;
    }

    else if (localCachedData) {
        const parsedData: UserCache = JSON.parse(localCachedData);
        userData = parsedData.data;
    }

    return userData;
}