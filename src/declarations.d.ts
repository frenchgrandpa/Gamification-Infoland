import User from "./user";
import _Socket from "./socket"
import GameManager from "./games/gameManager";
import { InfolandAPI } from "./api/infoland/infolandApi";

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
    declare module NodeJS {
        interface Global {
            gameManager: GameManager;
            socket: _Socket;
            infolandAPI: InfolandAPI;
        }
    }
}