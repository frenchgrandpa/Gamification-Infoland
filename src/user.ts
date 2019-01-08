import { InfolandAPI } from "./api/infoland/infolandApi";

export interface UserData {
    username: string
    password: string 
    token: string
}

export default class User {

    public userData: UserData;
    public infolandAPI: InfolandAPI;

    constructor(userData: UserData, infolandAPI: InfolandAPI) {
        this.userData = userData;
        this.infolandAPI = infolandAPI;
    }

    public static login(infolandAPI: InfolandAPI, username: string, password: string, cb: (err: boolean, token: string) => void) {
        infolandAPI.cookieRetrieval(username, password,(err,token)=>{
            infolandAPI.tokenRetrieval(username, password,'c0b63433-712e-4d35-9cd8-828073e6a84c', (err, token) => {
                if (err) return cb(err, null);
                if (!token) return cb(false, null);
                cb(null, token);
            });
        });
    }

}