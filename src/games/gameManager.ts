import Game from "./game";
import Socket from "../sockets/socket";

export default class GameManager {

    public runningGames: Game<Socket>[] = [];

}