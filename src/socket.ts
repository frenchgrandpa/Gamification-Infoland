import * as http from 'http';
import * as socketio from 'socket.io';
import { InfolandAPI, quizObject, question, answer } from './api/infoland/infolandApi';
interface Dictionary {
    [K: string]: string;
}

export default class Socket {

    private io: socketio.Server;
    private index = 0;
    private quiz: quizObject;
    private playernames: {[id: string]: string;} = {};

    constructor(server: http.Server) {
        this.io = socketio(server);
        this.io.on('connection', (socket) => {
            socket.on("setusername", (msg)=>{
                console.log(msg);
                this.playernames[socket.id] = msg;
            });
            this.onConnection(socket);
            socket.on("disconnect", (reason) => {
                this.onDisconnect(socket);
            });
            socket.on("msg",function(msg){
                console.log(msg);
            });
        });
    }

    private onConnection(socket: socketio.Socket) {
        console.log('a user connected');
        this.emitPlayerCount();
        this.emitPlayerJoin(socket);
        this.emitPlayers();
    }

    private onDisconnect(socket: socketio.Socket) {
        console.log('a user disconnected');
        delete this.playernames[socket.id];
        this.emitPlayerCount();
        this.emitPlayerLeave(socket);
    }

    public emitPlayerCount() {
        this.io.clients((err: any, clients: socketio.Client[]) => {
            this.io.emit('playerCount', clients.length);
        });
    }

    public emitPlayers() {
        this.io.clients((err: any, clients: socketio.Client[]) => {
            //let clientids:any[] =  [];
            this.io.emit('players', this.playernames);
        });
    }

    public emitBombExplosion() {
        this.io.emit('explosion', "true");
    }





    public emitQuestion(question: question) {
        this.io.emit('question', question);
    }

    public emitAnswer() {
        this.io.emit('answer');
    }

    public emitPlayerJoin(socket: socketio.Socket) {
    }

    public emitPlayerLeave(socket: socketio.Socket) {
    }

    public emitGameStart() {
        this.io.emit('gameStart', true);
    }

    public emitGameEnd() {
        this.io.emit('gameEnd', true);
    }

    public addAnswerEventHandler(delegate: (msg: any) => void) {
        this.io.on('answer', (msg: any) => {
            delegate(msg);
        });
    }

    public getClients(cb: (clients: socketio.Client[]) => void) {
        this.io.clients((err: any, clients: socketio.Client[]) => {
            cb(clients);
        });
    }

}