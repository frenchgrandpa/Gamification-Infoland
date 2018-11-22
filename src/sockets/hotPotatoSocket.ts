import Socket from "./socket";
import * as http from 'http';


export default class HotPotatoSocket extends Socket {

    public constructor(gameid: number) {
        super("game/hotpotato/" + gameid);
    }

    public emitBombExplosion() {
        this.io.emit('explosion', "true");
    }

    public emitPlayerWithBomb(id: string) {
        this.io.emit('bomb', id);
    }    

    public emitBombState(state: number) {
        this.io.emit("bombState", state);
    }

}