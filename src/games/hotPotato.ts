import Game from './game';
import HotPotatoSocket from '../sockets/hotPotatoSocket';

export default class HotPotato extends Game<HotPotatoSocket> {

    public maxPlayers = 5;

    private startTime: number;
    private detonationTime: number;
    private detonationTimeout: NodeJS.Timer;
    private nextStateTimeout: NodeJS.Timer;

    private playerWithBomb: string;

    private hasToWait = false;

    constructor(socketClient: HotPotatoSocket, quizId: string) {
        super(socketClient, quizId);

        socketClient.getClients(clients => {
            this.socketClient.players = clients as unknown[] as string[];
            this.playerWithBomb = this.socketClient.players[0];

            this.startTime = Date.now();
            this.detonationTime = this.startTime + Math.round((Math.random() * 100 + 60) * 1000);
    
            this.setDetonationTimeout();
            this.addSocketEventHandlers();
            this.socketClient.emitGameStart();        
            this.socketClient.emitPlayerWithBomb(this.playerWithBomb);
            this.socketClient.emitBombState(2);
            this.emitNextQuestion();
        });

    }

    private getDetonationInterval() {
        return this.detonationTime - Date.now();
    }

    private setDetonationTimeout() {
        clearTimeout(this.detonationTimeout);
        clearTimeout(this.nextStateTimeout);

        this.detonationTimeout = setTimeout(() => {
            this.socketClient.emitBombExplosion();
            this.socketClient.emitGameEnd();
            this.finished = true;
        }, this.getDetonationInterval());

        this.nextStateTimeout = setTimeout(() => {
            if (!this.finished)
                this.socketClient.emitBombState(3);
        }, this.getDetonationInterval() / 2);
    }

    private addSocketEventHandlers() {
        this.socketClient.setAnswerEventHandler((socket, data) => this.onAnswer(socket, data));
        this.socketClient.setEmptyGameEventHandler((socket, data) => this.onEmptyGame(socket, data));
    }

    private onEmptyGame(socket: SocketIO.Socket, data: any) {        
        this.socketClient.emitGameEnd();
        this.finished = true;
    }
    private onAnswer(socket: SocketIO.Socket, data: any) {
        if (socket.id != this.playerWithBomb || this.finished || this.hasToWait)
        {
            return;
            
        }
            
        global.infolandAPI.checkanswer(this.quizId,this.currentQuestion,data,(_iscorrect,amountcorrect)=>{

        this.socketClient.emitAnswerResult(_iscorrect);
        if (_iscorrect) {
            this.giveBombToNextPlayer();
            this.emitNextQuestion();
        } else {
            this.socketClient.emitCorrectAmount(amountcorrect);
            this.detonationTime -= 5000;
            this.setDetonationTimeout();
            this.disableAnsweringFor5Sec();
            //this.socketClient.emitPlayerWithBomb(this.playerWithBomb);
        }
        })
    }

    private disableAnsweringFor5Sec() {
        this.hasToWait = true;
        setTimeout(() => this.hasToWait = false, 5000);
    }

    private bombIndex = 0;
    private giveBombToNextPlayer() {
        if (this.finished)
            return;
            
        if (this.bombIndex < this.socketClient.players.length - 1)
            this.bombIndex++;
        else
            this.bombIndex = 0;

        this.playerWithBomb = this.socketClient.players[this.bombIndex];
        console.log(this.playerWithBomb + " has the bomb");
        this.socketClient.emitPlayerWithBomb(this.playerWithBomb);
    }

}