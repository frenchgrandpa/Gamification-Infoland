import * as http from 'http';
import * as socketio from 'socket.io';
import { InfolandAPI, quizObject, question, answer } from './api/infoland/infolandApi';

export default class Socket {

    private io: socketio.Server;
    private index = 0;
    private quiz: quizObject;

    constructor(server: http.Server) {
        this.io = socketio(server);
        this.io.on('connection', (socket) => {
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
    }

    private onDisconnect(socket: socketio.Socket) {
        console.log('a user disconnected');
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
            // let clientids:any = []
            // for(let client of clients)
            // {
            //     clientids.concat(client.id);
            // }
            this.io.emit('players', clients);
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