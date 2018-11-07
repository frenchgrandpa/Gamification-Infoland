import User from '../user';
import Game from './game';
import Socket from '../socket';

export default class HotPotato extends Game {

    public maxPlayers = 5;

    private startTime: number;
    private detonationTime: number;
    private socketClient: Socket;
    private detonationTimeout: NodeJS.Timer;

    constructor(socketClient: Socket) {
        super();
        this.socketClient = socketClient;
        this.startTime = Date.now();
        this.detonationTime = this.startTime + (Math.random() * 80 + 60) * 1000;

        this.setDetonationTimeout();
        this.addSocketEventHandlers();
    }

    private getDetonationInterval() {
        return this.detonationTime - Date.now();
    }

    private setDetonationTimeout() {
        clearTimeout(this.detonationTimeout);
        this.detonationTimeout = setTimeout(() => {
            this.socketClient.emitBombExplosion();
        }, this.getDetonationInterval());
    }

    private addSocketEventHandlers() {
        this.socketClient.addAnswerEventHandler(this.onAnswer);
    }

    private onAnswer(data: any) {
        global.infolandAPI.checkanswer("", data.question, data.answer);//geen callback?¿??
        let correct = true;
        if (correct) {
            addPointToPlayer();
        } else {
            this.detonationTime -= 5000;
            this.setDetonationTimeout();
        }

        this.socketClient.emitNextQuestion();
    }

}