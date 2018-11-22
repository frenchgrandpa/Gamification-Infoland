import User from "./user";
import GameManager from "./games/gameManager";
import { InfolandAPI } from "./api/infoland/infolandApi";
import _Socket from "./sockets/socket";

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
    declare module NodeJS {
        interface Global {
            gameManager: GameManager;
            infolandAPI: InfolandAPI;
            masterSocket: SocketIO.Server;
            websockets: { [path: string]: _Socket };
        }
    }
}