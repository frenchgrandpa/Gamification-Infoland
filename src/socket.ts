import * as http from 'http';
import * as socketio from 'socket.io';
import { InfolandAPI } from './api/infoland/infolandApi';

export default class Socket {

    private io: socketio.Server;
    private infolandAPI: InfolandAPI;
    private index = 0;

    constructor(server: http.Server, infolandAPI: InfolandAPI) {
        this.io = socketio(server);
        this.infolandAPI = infolandAPI;
        this.io.on('connection', (socket) => {
            this.onConnection(socket);
            socket.on("disconnect", (reason) => {
                this.onDisconnect(socket);
            });
        });
    }

    private onConnection(socket: socketio.Socket) {
        console.log('a user connected');
        this.emitPlayerCount();
        this.emitPlayerJoin(socket);
        //setTimeout(() => this.emitQuestion(), 5000);
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
        this.io.emit('explosion', true);
    }





    public emitQuestion() {
        this.infolandAPI.quizRetrieval('c0b63433-712e-4d35-9cd8-828073e6a84c', (quiz) => {
            while (quiz.questions[this.index].answers.length <= 1 && this.index < quiz.questions.length) {
                this.index++;
            }console.log(quiz);
            if (this.index == quiz.questions.length - 1) {

                this.io.emit('question', []); return;
            }

            this.io.emit('question', quiz.questions[this.index++]);
        });
    }

    public emitAnswer() {
        this.io.emit('answer', /* emit question */);
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

}