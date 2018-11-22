import * as http from 'http';
import * as socketio from 'socket.io';
import { question } from '../api/infoland/infolandApi';

export default abstract class Socket {

    protected io: socketio.Namespace;

    constructor(namespace: string) {
        this.io = global.masterSocket.of(namespace);
        this.io.on('connection', (socket) => {
            this.onConnection(socket);
            socket.join("lol");
            socket.on("disconnect", (reason) => {
                this.onDisconnect(socket);
            });
            socket.on("msg", function (msg) {
                console.log(msg);
            });
            socket.on('answer', (msg: any) => {
                if (this.onAnswerDelegate)
                    this.onAnswerDelegate(socket, msg);
            });
        });
    }

    private onAnswerDelegate: (socket: socketio.Socket, data: any) => void;
    public setAnswerEventHandler(delegate: (socket: socketio.Socket, data: any) => void) {
        this.onAnswerDelegate = delegate;
    }

    private onConnection(socket: socketio.Socket) {
        console.log('a user connected');
        this.emitPlayerCount();
        this.emitPlayers();
    }

    private onDisconnect(socket: socketio.Socket) {
        console.log('a user disconnected');
        this.emitPlayerCount();
        this.emitPlayers();
    }

    public emitPlayerCount() {
        this.io.clients((err: any, clients: socketio.Client[]) => {
            this.io.emit('playerCount', clients.length);
        });
    }

    public emitPlayers() {
        this.io.clients((err: any, clients: socketio.Client[]) => {
            this.io.emit('players', clients);
        });
    }

    public emitAnswerResult(isCorrect: boolean) {
        this.io.emit('answerResult', isCorrect);
    }

    public emitQuestion(question: question) {
        this.io.emit('question', question);
    }
    public emitGameStart() {
        this.io.emit('gameStart', true);
    }

    public emitGameEnd() {
        this.io.emit('gameEnd', true);
    }

    public getClients(cb: (clients: socketio.Client[]) => void) {
        this.io.clients((err: any, clients: socketio.Client[]) => {
            cb(clients);
        });
    }

}